import { AnswerDatasource } from "../../domain/datasources";
import { AddAnswerDto, GetAnswerByDto, EditAnswerDto } from "../../domain/dtos/answer";
import { AnswerEntity } from "../../domain/entities";
import { AnswerRepository } from "../../domain/repository";




export class AnswerRepositoryImpl implements AnswerRepository {

  constructor(
    private readonly answerDatasource:AnswerDatasource,
  ){}


  removeLikeAnswer(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    return this.answerDatasource.removeLikeAnswer(getAnswerByDto);
  }

  addLikeAnswer(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    return this.answerDatasource.addLikeAnswer(getAnswerByDto);
  }

  addAnswer(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
    return this.answerDatasource.addAnswer( addAnswerDto );
  }
  getAnswerBy(getAnswerByDto: GetAnswerByDto): Promise<AnswerEntity> {
    return this.answerDatasource.getAnswerBy( getAnswerByDto );
  }
  deleteAnswer(getAnswerByDto: GetAnswerByDto): Promise<void> {
    return this.answerDatasource.deleteAnswer( getAnswerByDto );
  }
  editAnswer(editAnswerDto: EditAnswerDto): Promise<void> {
    return this.answerDatasource.editAnswer( editAnswerDto );
  }
  getAllAnswer(): Promise<AnswerEntity[]> {
    return this.answerDatasource.getAllAnswer();
  }

}

