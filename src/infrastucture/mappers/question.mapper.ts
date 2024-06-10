import { QuestionEntity } from "../../domain/entities";



export class QuestionMapper {

  static getQuestionFromObj( obj:{ [key:string]:any } ): QuestionEntity {
    const { title, question, id, _id, date, user, answers, likes, stars, edited } = obj;


    return new QuestionEntity(title, id || _id, question, date, user, answers, likes, stars, edited);
  }

}