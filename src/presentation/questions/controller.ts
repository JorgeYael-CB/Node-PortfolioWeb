import { Request, Response } from "express";
import { ValidateDataDto } from "../../domain/dtos/questions";


export class QuestionsController {

    constructor(){};


    validateData = ( req:Request, res:Response ) => {
        const [ messageError, validateDataDto ] = ValidateDataDto.create( req.body );
        if( messageError ) return res.status(400).json({ error: true, messageError });

        return res.json( validateDataDto );
    };


    addQuestion = ( res:Response, req:Request ) => {

    };
};
