export class GetQuestionBy {

    constructor(
        public readonly userId?:string,
        public readonly questionId?:string,
        public readonly userEmail?:string,
    ){};


    static create( body: { [key:string]:any } ):[string?, GetQuestionBy?] {

        return[];
    };

}