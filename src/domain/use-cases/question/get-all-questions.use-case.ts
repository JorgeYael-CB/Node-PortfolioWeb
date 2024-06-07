import { PaginationDto } from '../../dtos';
import { QuestionRepository } from '../../repository/question.repository';
export class GetAllQuestionsUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
  ){};

  async getAll( params: { [key:string]:any } ) {
    const questions = await this.questionRepository.allQuestions();
    const questionsPagination = PaginationDto.create( {array: questions, limit: params.limit, page: params.page} );


    return {
      succes: true,
      error: false,
      questionsPagination,
      messageSucces: 'All questions send',
    }
  };

}