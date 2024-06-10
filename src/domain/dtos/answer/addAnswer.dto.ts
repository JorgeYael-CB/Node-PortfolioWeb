

export class AddAnswerDto {

  constructor(
    public readonly answer:string,
    public readonly userId: string | number,
    public readonly questionId: string | number,
  ){};


  static create( body: { [key:string]:any } ):[string?, AddAnswerDto?] {
    const { answer, userId, questionId} = body;

    if( !answer || !userId || !questionId ) return['Answer, token and questionId is required'];

    if( typeof answer !== 'string' ) return [`type ${typeof answer} is not valid.`];

    if( answer.length <= 5 ) return ['answer is too length'];
    if( answer.length >= 500 ) return ['answer is too long'];

    return[ undefined, new AddAnswerDto(answer.trim(), userId, questionId) ];
  }

}
