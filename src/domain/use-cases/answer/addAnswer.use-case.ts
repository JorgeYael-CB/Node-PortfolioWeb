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
    if( !answer ) throw CustomError.InternalServerError(`No viene la respuesta al querer agregarla`, {file: __dirname});


    this.mailerAdapter.send({
      html: `
        <h1>Answer to your question at DevComplete Studios.</h1>
        <p>Hi, "${answer.question.user.name}", The ${ answer.user.roles.includes('ADMIN')? 'Admin': 'User' } "${answer.user.name}" answered your question</p>

        <p>${answer.question.user.name}: <strong>${answer.question.question}</strong> </p>
        <p>${answer.user.name}: <strong>${answer.answer}</strong> </p>
        <p> Date: ${ answer.date.getTime() } </p>

        <p>You can see the following answer on the <a href="https://devcompletestudios.com/">DevComplete Studios page.</a></p>
      `,
      subject: `
        Answer to your question in DevComplete Studios
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
