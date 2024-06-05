import { UsersEmailsDatasource } from "../../domain/datasources";
import { ValidateDataDto, GetUserByDto } from "../../domain/dtos/users";
import { UserEmailEntity } from "../../domain/entities";
import { UsersEmailsRepository } from "../../domain/repository";


export class UsersEmailRepositoryImpl implements UsersEmailsRepository {

    constructor(
        private readonly usersEmailDatasource:UsersEmailsDatasource,
    ){}


    VerifyEmail(getUserByDto: GetUserByDto): Promise<UserEmailEntity> {
        return this.usersEmailDatasource.VerifyEmail( getUserByDto );
    };

    AddRegisterEmail(validateDataDto: ValidateDataDto): Promise<UserEmailEntity> {
        return this.usersEmailDatasource.AddRegisterEmail( validateDataDto );
    }

    getUserBy(getUserByDto: GetUserByDto): Promise<UserEmailEntity> {
        return this.usersEmailDatasource.getUserBy( getUserByDto );
    }

};