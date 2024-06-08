import { Request, Response } from "express";
import { UsersEmailsRepository } from "../../domain/repository";
import { AddUserEmailUseCase, VerifyEmailUseCase, GetUserByUseCase, VerifyTokenPayloadUseCase } from "../../domain/use-cases/users";
import { GetUserByDto, ValidateDataDto } from "../../domain/dtos/users";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";
import { JwtAdapter, MailerAdapter } from "../../config";


export class UsersController {

  constructor(
    private readonly userEmailRepository: UsersEmailsRepository,
    private readonly jwtAdapter: JwtAdapter,
    private readonly mailerAdapter:MailerAdapter,
  ){};


  addUserEmail = ( req:Request, res:Response ) => {
    const [messageError, validateDataDto] = ValidateDataDto.create(req.body);
    if( messageError ) return res.status(400).json({error:true, messageError, succes: false});

    const useCase = new AddUserEmailUseCase( this.userEmailRepository, this.mailerAdapter, this.jwtAdapter );
    useCase.add( validateDataDto! )
      .then( data => res.status(201).json(data) )
      .catch( err => HandleErrorUsecase.handleError( err, res ) );
  };

  getUserBy = ( req:Request, res:Response ) => {
    const [messageError, getUserByDto] = GetUserByDto.create( req.query );

    if( messageError ) return res.status(400).json({error:true, messageError, succes:false});

    new GetUserByUseCase(this.userEmailRepository, this.jwtAdapter)
      .get( getUserByDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  };

  verifyEmail = ( req:Request, res:Response ) => {
    const [messageError, getUserByDto] = GetUserByDto.create( req.body );
    if( messageError ) return res.status(400).json({messageError, error: true, succes: false});

    new VerifyEmailUseCase( this.userEmailRepository, this.jwtAdapter )
      .verify( getUserByDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  };

  verifyJwtPayload = ( req:Request, res:Response ) => {
    const { userId } = req.body;

    new VerifyTokenPayloadUseCase(this.userEmailRepository)
      .check( userId )
        .then( data => res.status(200).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  };

}
