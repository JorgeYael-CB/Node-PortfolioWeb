import { isValidObjectId } from "mongoose";
import { AnswerModel, QuestionModel, UserEmailModel } from "../../../data";
import { AnswerDatasource } from "../../../domain/datasources";
import { AddAnswerDto, GetAnswerByDto, EditAnswerDto } from "../../../domain/dtos/answer";
import { AnswerEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { AnswerMapper } from "../../mappers/answer.mapper";


export class AnswerDatasourceMongoImpl implements AnswerDatasource {

  constructor(){}


  private async getAnswerById( id:any ) {
    if( !isValidObjectId(id) ) throw CustomError.BadRequestException(`id is not valid`);
    const answer = await AnswerModel.findById(id);

    if( !answer ) throw CustomError.BadRequestException(`answer with id: ${id} not found`);

    return answer;
  };

  private async getUserEmailById( id:any ) {
    if( !isValidObjectId(id) ) throw CustomError.BadRequestException(`id is not valid`);
    const user = await UserEmailModel.findById(id);
    if( !user ) throw CustomError.BadRequestException(`User with id: ${id} not found`);

    return user;
  }


  async removeLikeAnswer(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    const { answerId, userId } = getAnswerByDto;

    const [answer, user] = await Promise.all([
      await this.getAnswerById(answerId),
      await this.getUserEmailById(userId),
    ])

    answer.likes = answer.likes.filter( id => id.toString().toLowerCase() !== user._id.toString().toLowerCase() );
    await answer.save();

    return await this.answerPopulate(answer._id);
  }


  async addLikeAnswer(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    const { answerId, userId } = getAnswerByDto;

    const [answer, user] = await Promise.all([
      await this.getAnswerById(answerId),
      await this.getUserEmailById(userId),
    ])

    if( answer.likes.includes(user._id) ) throw CustomError.unauthorized(`User already liked`);

    answer.likes.push( userId );
    await answer.save();

    return await this.answerPopulate(answer._id);
  };


  private async answerPopulate( id: any ) {
    if( !isValidObjectId( id ) ) throw CustomError.BadRequestException(`id: "${id}" is not valid`)

    const answer = await AnswerModel.findById(id)
    .populate({
      path: 'question',
      select: 'title question date user',
      populate: { path: 'user', select: 'email name verify isActive date roles' },
    }).populate('user', {
      email: 1,
      name: 1,
      verify: 1,
      isActive: 1,
      date: 1,
      roles: 1,
    });

    if( !answer ) throw CustomError.BadRequestException(`answer with id: "${id}" not found`);

    return AnswerMapper.getAnswerFromObj(answer);
  };


  async addAnswer(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
    const { answer, userId, questionId } = addAnswerDto;
    if( !isValidObjectId( userId || !isValidObjectId(questionId) ) ) throw CustomError.BadRequestException(`Id is not valid`);

    const user = await UserEmailModel.findById(userId);

    if( !user ){
      throw CustomError.BadRequestException(`Oops! error - contact support`);
    }

    const newAnswer = await AnswerModel.create({
      answer,
      date: new Date(),
      question: questionId,
      user: userId
    });

    const [populateAnswer, questionSelected] = await Promise.all([
      this.answerPopulate( newAnswer._id ),
      QuestionModel.findById( questionId ),
    ]);

    if( !questionSelected ){
      await newAnswer.deleteOne();
      throw CustomError.InternalServerError(`La pregunta a la cual tratas de responder no viene`, {file: __dirname});
    }

    questionSelected?.answers.push(newAnswer._id);
    await questionSelected!.save();

    return populateAnswer
  }


  getAnswerBy(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    throw new Error("Method not implemented.");
  }


  deleteAnswer(getAnswerByDto: GetAnswerByDto): Promise<void> {
    throw new Error("Method not implemented.");
  }


  editAnswer(editAnswerDto: EditAnswerDto): Promise<void> {
    throw new Error("Method not implemented.");
  }


  getAllAnswer(): Promise<AnswerEntity[]> {
    throw new Error("Method not implemented.");
  };


}
