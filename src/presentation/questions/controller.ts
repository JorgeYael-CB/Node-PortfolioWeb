import { Request, Response } from "express"
import { ValidateDataDto } from "../../domain/dtos/users";
import { QuestionRepository } from "../../domain/repository";
import { AddQuestionDto, GetQuestionBy } from "../../domain/dtos/questions";
import { AddLikeQuestionUseCase, AddQuestionUseCase, GetAllQuestionsUseCase, RemoveLikeQuestionUseCase } from "../../domain/use-cases/question";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";
import { MailerAdapter } from "../../config";



export class QuestionsController {

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly mailerAdmins:string[],
        private readonly mailerAdaper:MailerAdapter,
    ){};

    addQuestion = ( req:Request, res:Response ) => {
        const [ messageError, addQuestionDto ] = AddQuestionDto.create( req.body );
        if( messageError ) return res.status(400).json({error: true, succes: false, messageError});

        new AddQuestionUseCase( this.questionRepository, this.mailerAdmins, this.mailerAdaper )
            .add( addQuestionDto! )
                .then( data => res.status(201).json(data) )
                .catch( err => HandleErrorUsecase.handleError( err, res ) );
    };

    getAllQuestions = ( req:Request, res:Response ) => {
        new GetAllQuestionsUseCase( this.questionRepository )
            .getAll( req.query )
                .then( data => res.status(200).json(data) )
                .catch( err => HandleErrorUsecase.handleError( err, res ) );
    };


    addLikeQuestion = ( req:Request, res:Response ) => {
        const [error, getQuestionByDto] = GetQuestionBy.create(req.body);
        if( error ) return res.status(400).json({error: true, messageError: error, succes:false});

        new AddLikeQuestionUseCase(this.questionRepository)
            .like( getQuestionByDto! )
                .then( data => res.status(200).json(data) )
                .catch( err => HandleErrorUsecase.handleError(err, res) );
    };


    removeLikeQuesion = async( req:Request, res:Response ) => {
        const [error, getQuestionByDto] = GetQuestionBy.create( req.body );
        if( error ) return res.status(400).json({error: true, messageError: error, succes:false});

        new RemoveLikeQuestionUseCase(this.questionRepository)
            .removeLike( getQuestionByDto! )
                .then( data => res.status(200).json(data) )
                .catch( err => HandleErrorUsecase.handleError(err, res) );
    }
};
