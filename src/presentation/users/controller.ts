import { Request, Response } from "express";
import { UsersEmailsRepository } from "../../domain/repository";
import { AddUserEmailUseCase } from "../../domain/use-cases/users";
import { ValidateDataDto } from "../../domain/dtos/users";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";


export class UsersController {

  constructor(
    private readonly userEmailRepository: UsersEmailsRepository,
  ){};


  addUserEmail = ( req:Request, res:Response ) => {
    const [errorMessage, validateDataDto] = ValidateDataDto.create(req.body);
    if( errorMessage ) return res.status(400).json({error:true, errorMessage});

    const useCase = new AddUserEmailUseCase( this.userEmailRepository );
    useCase.add( validateDataDto! )
      .then( data => res.status(201).json(data) )
      .catch( err => HandleErrorUsecase.handleError( err, res ) );
  }

}
