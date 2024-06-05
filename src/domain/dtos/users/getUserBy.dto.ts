export class GetUserBy {

    constructor(
        public readonly email?:string,
        public readonly id?:string,
    ){}


    static create( body: { [key:string]:any } ):[string?, GetUserBy?] {


        return[];
    };
}