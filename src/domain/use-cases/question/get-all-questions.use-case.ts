import { QuestionRepository } from '../../repository/question.repository';
export class GetAllQuestionsUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
  ){};

  async getAll() {
    const questions = await this.questionRepository.allQuestions();

    return {
      succes: true,
      error: false,
      questions,
      messageSucces: 'All questions send',
    }
  };

}