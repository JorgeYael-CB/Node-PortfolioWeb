import { Request, Response } from "express"
import { ValidateDataDto } from "../../domain/dtos/users";
import { QuestionRepository } from "../../domain/repository";
import { AddQuestionDto } from "../../domain/dtos/questions";
import { AddQuestionUseCase, GetAllQuestionsUseCase } from "../../domain/use-cases/question";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";



export class QuestionsController {

    constructor(
        private readonly questionRepository: QuestionRepository,
    ){};


    validateData = ( req:Request, res:Response ) => {
        const [ messageError, validateDataDto ] = ValidateDataDto.create( req.body );
        if( messageError ) return res.status(400).json({ error: true, messageError });

        return res.json( validateDataDto );
    };

    addQuestion = ( req:Request, res:Response ) => {
        const [ messageError, addQuestionDto ] = AddQuestionDto.create( req.body );
        if( messageError ) return res.status(400).json({error: true, succes: false, messageError});

        new AddQuestionUseCase( this.questionRepository )
            .add( addQuestionDto! )
                .then( data => res.status(201).json(data) )
                .catch( err => HandleErrorUsecase.handleError( err, res ) );
    };

    getAllQuestions = ( req:Request, res:Response ) => {

        new GetAllQuestionsUseCase( this.questionRepository )
            .getAll( req.query )
                .then( data => res.status(200).json(data) )
                .catch( err => HandleErrorUsecase.handleError( err, res ) );
    }
};
