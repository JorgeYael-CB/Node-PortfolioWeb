import { UserEmailModel } from "../../../data";
import { UsersEmailsDatasource } from "../../../domain/datasources";
import { ValidateDataDto, GetUserBy } from "../../../domain/dtos/users";
import { UserEmailEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { UserEmailMapper } from "../../mappers";



export class UserEmailMongoDatasourceImpl implements UsersEmailsDatasource {

    constructor(){};


    async AddRegisterEmail(validateDataDto: ValidateDataDto): Promise<UserEmailEntity> {
        const { email } = validateDataDto;
        let user = await UserEmailModel.findOne( {email} );

        if( !user ){
            user = await UserEmailModel.create({
                date: new Date(),
                email,
                isActive: true,
                questions: [],
                roles: ['USER'],
                verify: false,
            });
        };

        return UserEmailMapper.getInstanceFromObj( user );
    }

    async getUserBy(getUserBy: GetUserBy): Promise<UserEmailEntity> {
        const { email, id } = getUserBy;
        const user = email
            ? await UserEmailModel.findOne({email})
            : await UserEmailModel.findById(id);

        if( !user ) throw CustomError.BadRequestException(`User not found!`);

        return UserEmailMapper.getInstanceFromObj( user );
    }

}