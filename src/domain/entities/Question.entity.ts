import { AnswerEntity } from "./Answer.entity";
import { UserEmailEntity } from "./UserEmail.entity";



export class QuestionEntity {

  constructor(
    public title:string,
    public id:string | number,
    public question:string,
    public date: Date,
    public user:UserEmailEntity,
    public answers: AnswerEntity[],
    public likes: UserEmailEntity[],
    public stars: number,
    public edited: boolean,
  ){};

}