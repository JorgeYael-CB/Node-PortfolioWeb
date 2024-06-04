import { Response } from "express";
import { CustomError } from "../../errors";



export class HandleErrorUsecase {

    static handleError( err:any, res:Response ) {
        if( err instanceof CustomError ){
            return res.status( err.codeError ).json( {error: true, messageError: err.message} );
        };

        // TODO: manejar los errores
        console.log(`${err}`);
        return res.status(500).json('Oops! Internal server error, contact support hehe...');
    };

}