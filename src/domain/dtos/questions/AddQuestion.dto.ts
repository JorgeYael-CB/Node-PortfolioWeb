export class AddQuestionDto {

  constructor(
    public readonly userId:string | number,
    public readonly title:string,
    public readonly question:string,
  ){};


  static create( body: {  [key:string]:any} ): [string?, AddQuestionDto?] {
    const { userId, title, question } = body;

    if( !userId ) return ['something went wrong, please try again later.'];

    if( !title ) return ['Missing title'];
    if( !question ) return ['Missing question'];

    if( title.length <= 4 ) return ['title is too short'];
    if( title.length >= 100 ) return ['title is too long'];

    if( question.length <= 10 ) return ['question is too short'];
    if( question.length >= 500 ) return ['question is too long'];


    return[ undefined, new AddQuestionDto( userId, title, question ) ];
  }

}