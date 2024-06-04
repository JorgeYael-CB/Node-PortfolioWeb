import { Request, Response } from "express";
import { ContactByEmailDto } from "../../domain/dtos/contact";
import { MailerAdapter } from "../../config";
import { ContactByEmailUseCase } from "../../domain/use-cases/contact";
import { HandleErrorUsecase } from "../../domain/use-cases/errors";


export class ContactController {

    //DI
    constructor(
        private readonly mailerAdapter: MailerAdapter,
        private readonly mailerUserAdmin: string[] | string,

        private readonly handleError = HandleErrorUsecase.handleError,
    ){};


    contactByEmail = (req:Request, res:Response) => {
        const [ error, contactByEmailDto ] = ContactByEmailDto.create( req.body );
        if( error ) return res.status(400).json({ error: true, messageError: error });

        const useCase = new ContactByEmailUseCase(this.mailerAdapter, this.mailerUserAdmin);
        useCase.send(contactByEmailDto!)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };

}
