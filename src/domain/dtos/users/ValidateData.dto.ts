import { ValidateUserData } from "../../../config";


export class ValidateDataDto {

    constructor(
        public readonly email:string,
    ){};


    static create( body: { [key:string]:any } ):[string?, ValidateDataDto?] {
        const { email } = body;

        const [emailError, emailMapper] = ValidateUserData.email( email );
        if( emailError ) return [emailError];

        return[ undefined, new ValidateDataDto( emailMapper! ) ];
    }

}