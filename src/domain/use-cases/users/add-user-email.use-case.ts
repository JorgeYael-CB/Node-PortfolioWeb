import { JwtAdapter, RandomNumberAdapter } from "../../../config";
import { ValidateDataDto } from "../../dtos/users";
import { CustomError } from "../../errors";
import { UsersEmailsRepository } from '../../repository/users-emails.repository';


export class AddUserEmailUseCase {

  constructor(
    private readonly usersEmailsRepository: UsersEmailsRepository,
    private readonly randomNumber = RandomNumberAdapter.getNumber,
  ){};


  async add( validateDataDto: ValidateDataDto ) {
    const user = await this.usersEmailsRepository.AddRegisterEmail( validateDataDto );
    const codeVerify = this.randomNumber({numberLength: 6});

    if( !user || !codeVerify ){
      CustomError.InternalServerError(`Oops! an error has occurred, please try again later.`);
    }

    return {
      user,
      codeVerify,
      codeRange: codeVerify.length,
      error: false,
      messageSucces: 'Already register email!',
    }

  }

}
