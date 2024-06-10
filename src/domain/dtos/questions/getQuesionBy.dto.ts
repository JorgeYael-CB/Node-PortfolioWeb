export class GetQuestionBy {

    constructor(
        public readonly questionId?:string,
    ){};


    static create( body: { [key:string]:any } ):[string?, GetQuestionBy?] {
        const { questionId } = body;

        if( !questionId ) return ['Missing questionId'];

        return[];
    };

}