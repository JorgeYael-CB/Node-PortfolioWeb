import { GetUserByDto, ValidateDataDto } from "../dtos/users";
import { UserEmailEntity } from "../entities";


export abstract class UsersEmailsDatasource {

  abstract AddRegisterEmail( validateDataDto:ValidateDataDto ): Promise< UserEmailEntity >;
  abstract getUserBy( GetUserByDto:GetUserByDto ):Promise< UserEmailEntity >;
  abstract VerifyEmail( GetUserByDto:GetUserByDto ):Promise< UserEmailEntity >;
  abstract addQuestionId( questionId: any, userId:any ): Promise< UserEmailEntity >;

};
