import { QuestionEntity } from "./Question.entity";



export class UserEmailEntity {

  constructor(
    public readonly email:string,
    public readonly id:string | number,
    public verify: boolean,
    public isActive: boolean,
    public readonly date: Date,
    public roles: string[],
    public questions: QuestionEntity[],
    public readonly name:string,
    public readonly img:string,
  ){};

}