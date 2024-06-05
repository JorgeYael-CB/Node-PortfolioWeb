import { AddQuestionDto, GetQuestionBy } from "../dtos/questions";
import { QuestionEntity } from "../entities";



export abstract class QuestionDatasource {
  abstract addQuestion( addQuestionDto: AddQuestionDto ): Promise< QuestionEntity >;
  abstract getQuestionBy( getQuestionByd: GetQuestionBy ): Promise< QuestionEntity >;
  abstract allQuestions(): Promise< QuestionEntity[] >;
}