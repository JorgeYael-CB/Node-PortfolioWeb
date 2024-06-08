import { AnswerEntity } from "./Answer.entity";

export class QuestionEntity {

  constructor(
    public title:string,
    public id:string | number,
    public question:string,
    public date: Date,
    public user:any,
    public answers: AnswerEntity[],
  ){};

}