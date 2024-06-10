import { AnswerEntity } from "../../domain/entities";




export class AnswerMapper{

  static getAnswerFromObj = ( data: { [key:string]:any } ):AnswerEntity  => {
    const { answer, date, user, question, id, _id, edited, likes } = data;

    return new AnswerEntity( id || _id, answer, date, user, question, edited, likes );
  }

}
