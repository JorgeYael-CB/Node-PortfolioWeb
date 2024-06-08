

export class AddAnswerDto {

  constructor(
    public readonly answer:string,
    public readonly userId: string | number,
  ){};


  static create( body: { [key:string]:any } ):[string?, AddAnswerDto?] {


    return[]
  }

}
