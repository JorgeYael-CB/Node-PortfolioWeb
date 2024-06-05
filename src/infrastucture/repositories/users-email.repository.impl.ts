import { UsersEmailsDatasource } from "../../domain/datasources";
import { ValidateDataDto, GetUserBy } from "../../domain/dtos/users";
import { UserEmailEntity } from "../../domain/entities";
import { UsersEmailsRepository } from "../../domain/repository";


export class UsersEmailRepositoryImpl implements UsersEmailsRepository {

    constructor(
        private readonly usersEmailDatasource:UsersEmailsDatasource,
    ){};


    AddRegisterEmail(validateDataDto: ValidateDataDto): Promise<UserEmailEntity> {
        return this.usersEmailDatasource.AddRegisterEmail( validateDataDto );
    }

    getUserBy(getUserBy: GetUserBy): Promise<UserEmailEntity> {
        return this.usersEmailDatasource.getUserBy( getUserBy );
    }

}