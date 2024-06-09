

const manageError = ( error?:string, data?:any ) => {
    console.log(`${error} / ${ JSON.stringify(data) }`);
};


export class CustomError extends Error {

    constructor(
        public readonly codeError: number,
        public readonly message:string
    ){
        super( message );
    };


    static BadRequestException( error:string, data?: any ){
        manageError(error, data);
        return new CustomError(404, error);
    };

    static InternalServerError( error:string, data?:any ) {
        manageError(error, data);
        return new CustomError(500, 'Internal Server error!');
    };

    static unauthorized( error:string, data?:any ) {
        manageError(error, data);
        return new CustomError(401, error);
    }

}
