import { GetAnswerByDto } from '../../dtos/answer/getAnswerBy.dto';
import { CustomError } from '../../errors';
import { AnswerRepository } from '../../repository/answer.repository';


export class RemoveLikeAnswerUseCase{

  constructor(
    private readonly answerRepository:AnswerRepository,
  ){};

  async removeLike( getAnswerByDto: GetAnswerByDto ) {
    const answer = await this.answerRepository.removeLikeAnswer( getAnswerByDto );
    if( !answer ) throw CustomError.InternalServerError(`No viene la respuesta al quitarle el like`, {file: __dirname});

    return {
      error:false,
      succes:true,
      answer,
      likes: answer.likes.length,
    }
  }

}
