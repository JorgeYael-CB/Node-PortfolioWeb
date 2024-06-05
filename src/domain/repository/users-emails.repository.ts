import { GetUserBy, ValidateDataDto } from "../dtos/users";
import { UserEmailEntity } from "../entities";


export abstract class UsersEmailsRepository {

  abstract AddRegisterEmail( validateDataDto:ValidateDataDto ): Promise< UserEmailEntity >;
  abstract getUserBy( getUserBy:GetUserBy ):Promise< UserEmailEntity >;

};
