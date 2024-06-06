import { JwtAdapter } from "../../../config";
import { GetUserByDto } from "../../dtos/users";
import { CustomError } from "../../errors";
import { UsersEmailsRepository } from "../../repository";



export class GetUserByUseCase {

  constructor(
    private readonly usersEmailsRepository: UsersEmailsRepository,
    private readonly jwtAdapter:JwtAdapter,
  ){};


  async get( getUserByDto: GetUserByDto ) {
    const user = await this.usersEmailsRepository.getUserBy( getUserByDto );
    if( !user )
      throw CustomError.InternalServerError(`ERROR! try again later`);

    //TODO: jwt
    const token = await this.jwtAdapter.getJwt( { id: user.id } );

    return {
      user,
      succes: true,
      error: false,
      messageSucces: `The user was successfully found`,
      token,
    }
  }
}