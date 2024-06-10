import { GetAnswerByDto } from '../../dtos/answer';
import { CustomError } from '../../errors';
import { AnswerRepository } from '../../repository/answer.repository';

export class AddLikeAnswerUseCase {

  constructor(
    private readonly answerRepository:AnswerRepository,
  ){};


  async like( getAnswerByDto: GetAnswerByDto ) {
    const answer = await this.answerRepository.addLikeAnswer( getAnswerByDto );
    if( !answer ) throw CustomError.InternalServerError(`No viene la respuesta al darle like`, {file: __dirname});

    return {
      succes: true,
      error: false,
      answer,
      likes: answer.likes.length,
    }
  }

}
