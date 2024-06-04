import { Request, Response } from "express";
import { ContactByEmailDto } from "../../domain/dtos/contact";


export class ContactController {

    //DI
    constructor(){};


    contactByEmail = (req:Request, res:Response) => {
        const [ errors, contactByEmailDto ] = ContactByEmailDto.create( req.body );
        if( errors ) return res.status(400).json({ error: true, messageError: errors });


        res.status(200).json({succes:true, messageSucces: 'Already send email', contactByEmailDto});
    };

}
