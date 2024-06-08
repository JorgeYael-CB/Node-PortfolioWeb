import { AddAnswerDto, EditAnswerDto, GetAnswerByDto } from "../dtos/answer";
import { AnswerEntity } from "../entities";



export abstract class AnswerRepository {

  abstract addAnswer( addAnswerDto: AddAnswerDto ): Promise<AnswerEntity>;
  abstract getAnswerBy( getAnswerByDto: GetAnswerByDto ): Promise<AnswerEntity>;
  abstract deleteAnswer( getAnswerByDto: GetAnswerByDto ): Promise<void>;
  abstract editAnswer( editAnswerDto: EditAnswerDto ): Promise<void>;
  abstract getAllAnswer():Promise<AnswerEntity[]>;

}
