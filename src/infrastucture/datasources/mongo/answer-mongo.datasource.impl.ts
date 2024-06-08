import { isValidObjectId } from "mongoose";
import { AnswerModel } from "../../../data";
import { AnswerDatasource } from "../../../domain/datasources";
import { AddAnswerDto, GetAnswerByDto, EditAnswerDto } from "../../../domain/dtos/answer";
import { AnswerEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { AnswerMapper } from "../../mappers/answer.mapper";


export class AnswerDatasourceMongoImpl implements AnswerDatasource {

  constructor(){}


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


    const newAnswer = await AnswerModel.create({
      answer,
      date: new Date(),
      question: questionId,
      user: userId
    });

    const populateAnswer = await this.answerPopulate( newAnswer._id );
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
