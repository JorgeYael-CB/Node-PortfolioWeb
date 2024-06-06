import { GetUserByDto, ValidateDataDto } from "../dtos/users";
import { UserEmailEntity } from "../entities";


export abstract class UsersEmailsRepository {

  abstract AddRegisterEmail( validateDataDto:ValidateDataDto ): Promise< UserEmailEntity >;
  abstract getUserBy( getUserByDto:GetUserByDto ):Promise< UserEmailEntity >;
  abstract VerifyEmail( getUserByDto:GetUserByDto ):Promise< UserEmailEntity >;
  abstract addQuestionId( questionId: any ): Promise< UserEmailEntity >;

};
