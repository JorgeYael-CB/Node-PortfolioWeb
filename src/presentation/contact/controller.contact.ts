import { Request, Response } from "express";


export class ContactController {

    //DI
    constructor(){};


    contactByEmail = (req:Request, res:Response) => {
        res.json('Succes');
    };

}
