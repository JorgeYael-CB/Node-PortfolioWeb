

export class CustomError extends Error {

    constructor(
        public readonly codeError: number,
        public readonly message:string
    ){
        super( message );
    };


    static BadRequestException( error:string, data?: any ){
        // TODO: manejar errores
        console.log(`${error} / ${ data }`);

        return new CustomError(404, error);
    };

    static InternalServerError( error:string, data?:any ) {
        // TODO: manejar errores
        console.log(`${error} / ${ data }`);

        return new CustomError(500, 'Internal Server error!');
    };

}
