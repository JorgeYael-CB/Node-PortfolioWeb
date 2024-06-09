import { JwtAdapter, MailerAdapter, RandomNumberAdapter } from "../../../config";
import { ValidateDataDto } from "../../dtos/users";
import { CustomError } from "../../errors";
import { UsersEmailsRepository } from '../../repository/users-emails.repository';


export class AddUserEmailUseCase {

  constructor(
    private readonly usersEmailsRepository: UsersEmailsRepository,
    private readonly mailerAdapter:MailerAdapter,
    private readonly jwtAdapter:JwtAdapter,
    private readonly randomNumber = RandomNumberAdapter.getNumber,
  ){};


  async add( validateDataDto: ValidateDataDto ) {
    const user = await this.usersEmailsRepository.AddRegisterEmail( validateDataDto );
    const codeVerify = this.randomNumber({numberLength: 6});

    if( !user || !codeVerify ){
      CustomError.InternalServerError(`Oops! an error has occurred, please try again later.`);
    };

    const token = await this.jwtAdapter.getJwt({id: user.id});

    // TODO: el envio de emails puede no ser asyncrono
    this.mailerAdapter.send({
      to: user.email,
      subject: 'Verify your account',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">DevComplete Studios</h1>
            <p>Hi, <strong>${user.name}</strong>,</p>
            <p>Your verification code is:</p>
            <div style="text-align: center; background-color: #ff5722; color: #fff; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px; margin-bottom: 20px;">${codeVerify}</div>
            <p>If you are not logged in, you can ignore this message.</p>
          </div>
        </div>
      `
    });

    return {
      user,
      codeVerify,
      codeRange: codeVerify.length,
      error: false,
      token,
      messageSucces: 'Already register email!',
    }

  }

}
