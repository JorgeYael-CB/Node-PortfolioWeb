export class ValidateUserData {

    static email( email:string ):[string?, string?] {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;

        if( !email ) return ['Missing Email'];

        const emailMapper = email.trim().toLowerCase();

        if( !emailRegex.test( emailMapper ) ) return ['The email must be valid'];

        return [undefined, emailMapper];
    }

    static phoneNumber( phoneNumber:string ):[string?, number?] {
        if( !phoneNumber ) return ['Missing phoneNumber'];

        const phoneNumberMapper = +phoneNumber.trim();
        const phoneLength = phoneNumber.trim().length;

        if( isNaN( phoneNumberMapper ) ) return ['phoneNumber is not valid'];
        if( (phoneLength < 10 || phoneLength > 10)  ) return [`phoneNumber expected 10 digits and receive ${phoneLength}`];

        return[undefined, phoneNumberMapper];
    };

    static password( password:string ):[string?, string?] {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

        if( !password ) return ['Missing password'];
        const passMapper = password.trim();

        if( !passwordRegex.test( passMapper ) ) return ['The password must have 1 number and a capital letter'];

        return [undefined, passMapper];
    };

};