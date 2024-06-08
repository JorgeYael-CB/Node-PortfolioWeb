


export class GetAnswerByDto {

  constructor(
    public readonly questionId:string,
    public readonly answerId: string,
  ){};


  static create( body: { [key:string]:any } ):[string?, GetAnswerByDto?] {
    const { questionId, answerId } = body;

    if( !questionId || ! answerId ) return ['questionId or anwerId is required'];

    return[ undefined, new GetAnswerByDto(questionId, answerId) ];
  }

}
