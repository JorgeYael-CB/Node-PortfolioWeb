export class AddQuestionDto {

  constructor(
    public readonly userId:string | number,
    public readonly title:string,
    public readonly question:string,
    public readonly stars?: number,
  ){};


  static create( body: {  [key:string]:any} ): [string?, AddQuestionDto?] {
    const { userId, title, question, stars = 4 } = body;

    if( !userId ) return ['something went wrong, please try again later.'];

    if( !title ) return ['Missing title'];
    if( !question ) return ['Missing question'];

    if( title.length <= 4 ) return ['title is too short'];
    if( title.length >= 100 ) return ['title is too long'];

    if( question.length <= 10 ) return ['question is too short'];
    if( question.length >= 500 ) return ['question is too long'];

    if( stars && (stars < 0 || stars > 5 || isNaN(+stars) || typeof +stars !== 'number') ) return ['stars is not valid!, range 1 - 5 and value number'];

    return[ undefined, new AddQuestionDto( userId, title, question, stars ) ];
  }

}