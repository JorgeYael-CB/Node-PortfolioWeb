import { ValidateUserData } from "../../../config";


export class ContactByEmailDto {

    constructor(
        public readonly fullName:string,
        public readonly message:string,
        public readonly subject:string,
        public readonly email:string,
        public readonly phoneNumber?:number,
    ){};


    static create( body: {[key:string]: any} ):[string?, ContactByEmailDto?] {
        const { fullName, message, phoneNumber, subject = 'Portfolio - Contact', email } = body;

        if( !fullName ) return ['Missing fullName'];
        if( !message ) return ['Missing message'];

        if( fullName.trim().length <= 4 ) return ['fullName is too short'];
        if( fullName.trim().length > 120 ) return ['fullName is too large'];

        const [errorNumber, numberMapper] = phoneNumber? ValidateUserData.phoneNumber( phoneNumber ): [undefined, undefined];
        const [errorEmail, emailMapper] = ValidateUserData.email( email );

        if( errorNumber || errorEmail )
            return [errorNumber ?? errorEmail];

        return[ undefined, new ContactByEmailDto(fullName.trim(), message.trim(), subject.trim(), emailMapper!, numberMapper)];
    };

}
