import { MailerAdapter } from "../../../config";
import { AddQuestionDto } from "../../dtos/questions";
import { CustomError } from "../../errors";
import { QuestionRepository } from "../../repository";



export class AddQuestionUseCase {

  constructor(
    private readonly questionRepository:QuestionRepository,
    private readonly adminUsers:string[],
    private readonly mailerAdaper:MailerAdapter,
  ){};


  async add( addQUestionDto: AddQuestionDto ) {
    const newQuestion = await this.questionRepository.addQuestion( addQUestionDto );
    if( !newQuestion )
      throw CustomError.InternalServerError(`Oops! try again later`);

    this.mailerAdaper.send({
      subject: `Nueva pregunta en DevComplete Studios`,
      html: `
        <h1>Nueva pregunta en <a href="https://devcomplete-studios.com/">DevComplete Studios</a> </h1>
        <p>Nombre del usuario: <strong>${newQuestion.user.name}</strong></p>
        <p>Título de la pregunta: <strong>${newQuestion.title}</strong></p>
        <p>Pregunta realizada: <strong>${newQuestion.question}</strong></p>
        <p>Si quieres ver las preguntas puedes verlas en el siguiente enlace: <a href="https://devcomplete-studios.com/">DevComplete Studios</a> </p>
      `,
      to: this.adminUsers,
    })

    return {
      succes: true,
      error:false,
      messageSucces: 'Question added correctly!',
      newQuestion,
    }
  };

}