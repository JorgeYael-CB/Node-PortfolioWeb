import { ValidateUserData } from "../../../config";

export class GetUserByDto {

    constructor(
        public readonly email?:string,
        public readonly id?:string | number,
    ){}


    static create( body: { [key:string]:any } ):[string?, GetUserByDto?] {
        const { userId, email } = body;

        if( !userId && !email )
            return ['expected userId or email in params'];

        const [errEmail, emailMapper] = (email)
            ? ValidateUserData.email( email )
            : [undefined, undefined];

        if( errEmail ) return [errEmail];

        if( userId && typeof userId !== 'string' && typeof userId !== 'number' ){
            return ['Id is not valid!'];
        };

        return[ undefined, new GetUserByDto(emailMapper, userId) ];
    };
}