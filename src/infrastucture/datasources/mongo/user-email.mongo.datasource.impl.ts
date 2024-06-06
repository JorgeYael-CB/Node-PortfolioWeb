import { isValidObjectId } from "mongoose";
import { UserEmailModel } from "../../../data";
import { UsersEmailsDatasource } from "../../../domain/datasources";
import { ValidateDataDto, GetUserByDto } from "../../../domain/dtos/users";
import { UserEmailEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { UserEmailMapper } from "../../mappers";



export class UserEmailMongoDatasourceImpl implements UsersEmailsDatasource {

    constructor(){}


    private async getQuestionFromUser( userId:any ) {
        const user = await (await this.getUser( new GetUserByDto( undefined, userId ) )).populate('questions');

        return UserEmailMapper.getInstanceFromObj( user );
    };

    async addQuestionId(questionId: any, userId:any): Promise<UserEmailEntity> {
        if( !isValidObjectId( questionId ) ) throw CustomError.BadRequestException(`Id is not valid`);

        const user = await this.getUser( new GetUserByDto(undefined, userId) );

        user.questions.push(questionId);
        await user.save();

        return this.getQuestionFromUser( user._id );
    };

    private async getUser( getUserByDto:GetUserByDto ) {
        const { email, id } = getUserByDto;

        if( id && !isValidObjectId( id ) ){
            throw CustomError.BadRequestException(`id is not valid`);
        }

        const user = (email)
            ? await UserEmailModel.findOne({email})
            : await UserEmailModel.findById(id);

        if( !user ) throw CustomError.BadRequestException(`User not found!`);

        return user;
    };

    async VerifyEmail(getUserByDto: GetUserByDto): Promise<UserEmailEntity> {
        const user = await this.getUser( getUserByDto );

        if( !user.verify ){
            user.verify = true;
            await user.save();
        };

        return this.getQuestionFromUser( user._id );
    };

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

        return this.getQuestionFromUser( user._id );
    }

    async getUserBy(getUserByDto: GetUserByDto): Promise<UserEmailEntity> {
        const user = await this.getUser( getUserByDto );

        return this.getQuestionFromUser( user._id );
    }

}