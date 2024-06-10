


export class GetAnswerByDto {

  constructor(
    public readonly answerId: string,
  ){};


  static create( body: { [key:string]:any } ):[string?, GetAnswerByDto?] {
    const { answerId } = body;

    if( ! answerId ) return ['anwerId is required'];

    return[ undefined, new GetAnswerByDto(answerId) ];
  }

}
