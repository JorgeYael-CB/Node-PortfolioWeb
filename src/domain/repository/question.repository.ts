import { AddQuestionDto, GetQuestionBy } from "../dtos/questions";
import { QuestionEntity } from "../entities";



export abstract class QuestionRepository {
  abstract addQuestion( addQuestionDto: AddQuestionDto ): Promise< QuestionEntity >;
  abstract getQuestionBy( getQuestionBy: GetQuestionBy ): Promise< QuestionEntity >;
  abstract allQuestions(): Promise< QuestionEntity[] >;
  abstract addLikeQuestion( getQuestionBy:GetQuestionBy ): Promise< QuestionEntity >;
  abstract removeLikeQuestion( getQuestionBy:GetQuestionBy ): Promise< QuestionEntity >;
}