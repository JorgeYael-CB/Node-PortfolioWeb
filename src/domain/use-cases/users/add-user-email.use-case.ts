import { JwtAdapter, MailerAdapter, RandomNumberAdapter } from "../../../config";
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
        <h1>Welcome <strong>${ user.name }</strong> to DevComplete Studios</h1>
        <p> Verification code: <strong>${ codeVerify }</strong> </p>
        <p> If you are not logged in, you can ignore this message. </p>
      `
    })

    return {
      user,
      codeVerify,
      codeRange: codeVerify.length,
      error: false,
      messageSucces: 'Already register email!',
    }

  }

}
