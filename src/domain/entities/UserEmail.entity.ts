export class UserEmailEntity {

  constructor(
    public readonly email:string,
    public readonly id:string | number,
    public verify: boolean,
    public isActive: boolean,
    public readonly date: Date,
    public roles: string[],
    public questions: any[],
    public readonly name:string
  ){};

}