import { ValidateUserData } from "../../../config";

export class GetUserByDto {

    constructor(
        public readonly email?:string,
        public readonly id?:string | number,
    ){}


    static create( body: { [key:string]:any } ):[string?, GetUserByDto?] {
        const { id, email } = body;

        if( !id && !email )
            return ['expected id or email'];

        const [errEmail, emailMapper] = (email)
            ? ValidateUserData.email( email )
            : [undefined, undefined];

        if( errEmail ) return [errEmail];

        if( id && typeof id !== 'string' && typeof id !== 'number' ){
            return ['Id is not valid!'];
        };

        return[ undefined, new GetUserByDto(emailMapper, id) ];
    };
}