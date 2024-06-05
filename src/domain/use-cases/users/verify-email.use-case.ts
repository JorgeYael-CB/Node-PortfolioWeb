import { GetUserByDto } from '../../dtos/users';
import { CustomError } from '../../errors';
import { UsersEmailsRepository } from '../../repository/users-emails.repository';


export class VerifyEmailUseCase {

  constructor(
    private readonly usersEmailsRepository:UsersEmailsRepository,
  ){};

  async verify( getUserByDto:GetUserByDto ) {
    const user = await this.usersEmailsRepository.VerifyEmail( getUserByDto );

    if( !user ){
      console.log('No existe');
      throw CustomError.InternalServerError(`Oops! an error has occurred, please try again later.`);
    }

    return {
      user,
      error: false,
      messageSucces: 'Account already verify',
    }
  }

}