import { AddQuestionDto } from "../../dtos/questions";
import { CustomError } from "../../errors";
import { QuestionRepository } from "../../repository";



export class AddQuestionUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
  ){};


  async add( addQUestionDto: AddQuestionDto ) {
    const newQuestion = await this.questionRepository.addQuestion( addQUestionDto );
    if( !newQuestion )
      throw CustomError.InternalServerError(`Oops! try again later`);


    return {
      succes: true,
      error:false,
      messageSucces: 'Question added correctly!',
      newQuestion,
    }
  };

}