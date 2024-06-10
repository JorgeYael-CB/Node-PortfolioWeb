import { GetQuestionBy } from '../../dtos/questions';
import { CustomError } from '../../errors';
import { QuestionRepository } from '../../repository/question.repository';


export class RemoveLikeQuestionUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
  ){}

  async removeLike( getQuestionByDto: GetQuestionBy ) {
    const question = await this.questionRepository.removeLikeQuestion(getQuestionByDto);
    if( !question ) throw CustomError.InternalServerError(`question no existe en removeLike`, {file: __dirname});

    return {
      succes: true,
      messageSucces: 'Like deleted',
      error: false,
      question,
      likes: question.likes.length,
    }
  }
}
