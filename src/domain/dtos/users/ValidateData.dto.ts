import { ValidateUserData } from "../../../config";


export class ValidateDataDto {

    constructor(
        public readonly email:string,
        public readonly name:string,
    ){};


    static create( body: { [key:string]:any } ):[string?, ValidateDataDto?] {
        const { email, name } = body;

        const [emailError, emailMapper] = ValidateUserData.email( email );
        if( emailError ) return [emailError];

        if( !name ) return ['Missing name'];
        if( typeof name !== 'string' || name.length < 3 ) return ['Name is not valid'];

        return[ undefined, new ValidateDataDto( emailMapper!, name ) ];
    }

}