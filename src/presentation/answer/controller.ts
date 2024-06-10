import { Request, Response } from "express";
import { AnswerRepository } from '../../domain/repository/answer.repository';
import { MailerAdapter } from "../../config";
import { AddAnswerDto, GetAnswerByDto } from "../../domain/dtos/answer";
import { AddAnswerUseCase, AddLikeAnswerUseCase, RemoveLikeAnswerUseCase } from "../../domain/use-cases/answer";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";


export class AnswerController{

  constructor(
    private readonly answerRepository:AnswerRepository,
    private readonly mailerService:MailerAdapter,
  ){};


  addAnswer = ( req:Request, res:Response ) => {
    const [messageError, addAnswerDto] = AddAnswerDto.create(req.body);
    if( messageError ) return res.status(400).json({error: true, messageError});

    // TODO: use-case
    new AddAnswerUseCase( this.answerRepository, this.mailerService )
      .add( addAnswerDto! )
        .then( data => res.status(201).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  }


  addLikeAnswer = ( req:Request, res:Response ) => {
    const [messageError, getAnswerByDto] = GetAnswerByDto.create(req.body);
    if( messageError ) return res.status(400).json({error: true, succes: false, messageError});

    new AddLikeAnswerUseCase(this.answerRepository)
      .like( getAnswerByDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  }


  removeLikeAnswer = ( req:Request, res:Response ) => {
    const [messageError, getAnswerByDto] = GetAnswerByDto.create(req.body);
    if( messageError ) return res.status(400).json({error: true, succes: false, messageError});

    new RemoveLikeAnswerUseCase(this.answerRepository)
      .removeLike( getAnswerByDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => HandleErrorUsecase.handleError( err, res ) );
  }


  getAnswerBy = ( req:Request, res:Response ) => {
    const [messageError, getAnswerByDto] = GetAnswerByDto.create( req.body );
    if( messageError ) return res.status(400).json({error: true, messageError});

    // TODO: use-case
  }

}
