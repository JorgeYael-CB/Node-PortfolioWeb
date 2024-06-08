import { NextFunction, Request, Response } from 'express';
import { UsersEmailsRepository } from '../../domain/repository/users-emails.repository';
import { JwtAdapter } from '../../config';
import { GetUserByDto } from '../../domain/dtos/users';
import { JwtPayloadInterface } from '../../domain/interfaces';
import { HandleErrorUsecase } from '../../domain/use-cases/errors';


export class ValidateJwtMiddleware {

  constructor(
    private readonly usersEmailsRepository:UsersEmailsRepository,
    private readonly jwtAdapter:JwtAdapter,
  ){};


  private errorSupport(res:Response, messageError = 'contact support'){
    return res.status(401).json({error: true, messageError});
  };


  validateJwt = async( req:Request, res:Response, next:NextFunction ) => {
    const authorization = req.header('Authorization');

    if( !authorization ) return this.errorSupport(res);
    if( !authorization.startsWith('Bearer') ) return this.errorSupport(res);

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await this.jwtAdapter.decodedJwt<JwtPayloadInterface>(token);
      if( !payload ) return this.errorSupport(res);

      const user = await this.usersEmailsRepository.getUserBy( new GetUserByDto(undefined, payload.id) );
      if( !user ) return this.errorSupport(res);
      if( req.body.userId ) return this.errorSupport(res);

      req.body.userId = user.id;
      next();

    } catch (error) {
      HandleErrorUsecase.handleError(error, res);
    }
  };

}

