export class GetQuestionBy {

    constructor(
        public readonly userId:any,
        public readonly questionId?:string,
    ){};


    static create( body: { [key:string]:any } ):[string?, GetQuestionBy?] {
        const { questionId, userId } = body;

        if( !questionId ) return ['Missing questionId'];
        if( !userId ) throw ['Missing userId'];

        return[undefined, new GetQuestionBy(userId, questionId)];
    };

}