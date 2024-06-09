import { MailerAdapter } from '../../../config';
import { AddAnswerDto } from '../../dtos/answer';
import { CustomError } from '../../errors';
import { AnswerRepository } from '../../repository/answer.repository';


export class AddAnswerUseCase{

  constructor(
    private readonly answerRepository:AnswerRepository,
    private readonly mailerAdapter:MailerAdapter,
  ){};


  async add( addAnswerDto:AddAnswerDto ) {
    const answer = await this.answerRepository.addAnswer( addAnswerDto );
    // if( !answer || answer.user || answer.question.user ) throw CustomError.InternalServerError(`answer not found!: ${answer}`, {error: true, message: 'Hay un error en la respuesta, no vienen todos los datos'})

    this.mailerAdapter.send({
      html: `
        <h1>Answer to your question at DevComplete Studios.</h1>
        <p>user "${answer.user.name}" answered your question: <strong> ${answer.question.question.slice(0, answer.question.question.length / 2)}...</strong> </p>
        <p>You can see the following answer on the <a href="https://devcomplete-studios.com/">DevComplete Studios</a> page.</p>
      `,
      subject: `
        Hi, ${answer.question.user.name}, answer to your question
      `,
      to: answer.question.user.email,
    });


    return {
      succes: true,
      error: false,
      messageSucces: 'The response was sent and the user has already been notified, thank you for responding.',
      answer,
    }
  };

}
