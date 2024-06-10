import { GetQuestionBy } from "../../dtos/questions";
import { CustomError } from "../../errors";
import { QuestionRepository } from '../../repository/question.repository';


export class AddLikeQuestionUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
  ){}


  async like( getQuestionByDto: GetQuestionBy ) {
    const question = await this.questionRepository.addLikeQuestion(getQuestionByDto);
    if( !question ) throw CustomError.InternalServerError('No viene la pregunta en addlike', {file: __dirname});


    return {
      error:false,
      succes: true,
      messageSucces: 'Like added',
      question,
      likes: question.likes.length,
    }
  };

}
