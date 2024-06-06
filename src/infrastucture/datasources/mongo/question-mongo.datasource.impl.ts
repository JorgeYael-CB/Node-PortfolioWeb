import { isValidObjectId } from "mongoose";
import { QuestionModel } from "../../../data";
import { QuestionDatasource } from "../../../domain/datasources";
import { AddQuestionDto, GetQuestionBy } from "../../../domain/dtos/questions";
import { QuestionEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { QuestionMapper } from "../../mappers";
import { UsersEmailsRepository } from "../../../domain/repository";
import { GetUserByDto } from "../../../domain/dtos/users";



export class QuestionMongoDatasourceImpl implements QuestionDatasource {

    constructor(
        private readonly usersEmailRpository: UsersEmailsRepository,
    ){};


    private async getUserEmailById( userId:string ) {
        return await this.usersEmailRpository.getUserBy( new GetUserByDto( undefined, userId ) );
    }

    private async getQuestionPopulate( questionId: any ):Promise< QuestionEntity > {
        if( !isValidObjectId( questionId )) throw CustomError.BadRequestException(`ID is not valid`);

        const question = await QuestionModel.findById( questionId ).populate('user', {
            email: 1,
            verify: 1,
            isActive: 1,
            date: 1,
            roles: 1,
        });
        if( !question ) throw CustomError.BadRequestException(`Question not found`);

        return QuestionMapper.getQuestionFromObj( question );
    };

    async addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        const { question, title, userId } = addQuestionDto;

        const user = await this.getUserEmailById( userId.toString() );

        const newQuestion = await QuestionModel.create({
            answers: [],
            date: new Date(),
            question,
            title,
            user: userId,
        });

        await this.usersEmailRpository.addQuestionId( newQuestion._id, user.id );
        return QuestionMapper.getQuestionFromObj( await this.getQuestionPopulate( newQuestion._id ) );
    }

    getQuestionBy(getQuestionByd: GetQuestionBy): Promise<QuestionEntity> {
        throw new Error("Method not implemented.");
    }

    async allQuestions(): Promise<QuestionEntity[]> {
        const questions = await QuestionModel.find({});
        const questionsAsync: Promise<QuestionEntity>[] = [];

        questions.forEach(question => {
            questionsAsync.push(this.getQuestionPopulate(question._id));
        });

        const populatedQuestions = await Promise.all(questionsAsync);
        return populatedQuestions;
    }
}