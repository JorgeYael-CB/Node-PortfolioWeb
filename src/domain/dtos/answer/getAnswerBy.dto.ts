


export class GetAnswerByDto {

  constructor(
    public readonly answerId: string,
    public readonly userId: any,
  ){};


  static create( body: { [key:string]:any } ):[string?, GetAnswerByDto?] {
    const { answerId, userId } = body;

    if( !answerId ) return ['answerId is required'];
    if( !userId ) return ['userId is required'];

    return[ undefined, new GetAnswerByDto(answerId, userId) ];
  }

}
