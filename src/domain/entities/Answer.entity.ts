import { QuestionEntity } from "./Question.entity";
import { UserEmailEntity } from "./UserEmail.entity";



export class AnswerEntity{

  constructor(
    public readonly id:string | number,
    public readonly answer:string,
    public readonly date:Date,
    public readonly user:UserEmailEntity,
    public readonly question:QuestionEntity,
    public readonly edited:boolean,
    public readonly likes:UserEmailEntity[],
  ){}

}
