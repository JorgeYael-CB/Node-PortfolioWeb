import { MailerAdapter, RandomNumberAdapter } from "../../../config";
import { ValidateDataDto } from "../../dtos/users";
import { CustomError } from "../../errors";
import { UsersEmailsRepository } from '../../repository/users-emails.repository';


export class AddUserEmailUseCase {

  constructor(
    private readonly usersEmailsRepository: UsersEmailsRepository,
    private readonly mailerAdapter:MailerAdapter,
    private readonly randomNumber = RandomNumberAdapter.getNumber,
  ){};


  async add( validateDataDto: ValidateDataDto ) {
    const user = await this.usersEmailsRepository.AddRegisterEmail( validateDataDto );
    const codeVerify = this.randomNumber({numberLength: 6});

    if( !user || !codeVerify ){
      CustomError.InternalServerError(`Oops! an error has occurred, please try again later.`);
    };

    // TODO: el envio de emails puede no ser asyncrono
    this.mailerAdapter.send({
      to: user.email,
      subject: 'Verify your account',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h1 style="color: #4CAF50; text-align: center;">DevComplete Studios</h1>
          <p>Hi, <strong>${user.name}</strong>,</p>
          <p>Your verification code is:</p>
          <p style="font-size: 20px; font-weight: bold; color: #ff5722;">${codeVerify}</p>
          <p>If you are not logged in, you can ignore this message.</p>
        </div>
      `
    });

    return {
      user,
      codeVerify,
      codeRange: codeVerify.length,
      error: false,
      messageSucces: 'Already register email!',
    }

  }

}
