import { GetUserByDto } from '../../dtos/users';
import { CustomError } from '../../errors';
import { UsersEmailsRepository } from '../../repository/users-emails.repository';


export class VerifyTokenPayloadUseCase {

  constructor(
    private readonly usersEmailsRepository:UsersEmailsRepository,
  ){};


  async check( userId:any ){
    const user = await this.usersEmailsRepository.getUserBy( new GetUserByDto(undefined, userId) );
    if( !user ) throw CustomError.InternalServerError(`El usuario no existe en la validacion del JWT`, {file: __dirname});

    return {
      user,
      isValidToken: true,
      error: false,
      succes: true,
      message: 'Token is valid!',
    }
  }

}
