import { AnswerDatasource } from "../../../domain/datasources";
import { AddAnswerDto, GetAnswerByDto, EditAnswerDto } from "../../../domain/dtos/answer";
import { AnswerEntity } from "../../../domain/entities";


export class AnswerDatasourceMongoImpl implements AnswerDatasource {

  constructor(){}


  addAnswer(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
    throw new Error("Method not implemented.");
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
