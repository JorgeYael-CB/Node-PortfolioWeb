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
    ){}



    addLikeQuestion(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        throw new Error("Method not implemented.");
    };

    private async getUserEmailById( userId:string ) {
        return await this.usersEmailRpository.getUserBy( new GetUserByDto( undefined, userId ) );
    }

    private async getQuestionPopulate( questionId: any ):Promise< QuestionEntity > {
        if( !isValidObjectId( questionId )) throw CustomError.BadRequestException(`ID is not valid`);

        const question = await QuestionModel.findById(questionId)
            .populate({
                path: 'user',
                select: 'email verify isActive date roles name'
            })
            .populate({
                path: 'answers',
                select: 'answer date user',
                populate: {path: 'user', select: 'email verify isActive date roles name'},
            })

        if( !question ) throw CustomError.BadRequestException(`Question not found`);

        return QuestionMapper.getQuestionFromObj( question );
    };

    async addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        const { question, title, userId } = addQuestionDto;
        const user = await this.getUserEmailById( userId.toString() );

        if( !user.verify ) throw CustomError.BadRequestException(`verify your account.`);
        if( user.questions.length >= 3  ) throw CustomError.unauthorized(`This account has already exceeded the question limit!`);

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
            const populate = this.getQuestionPopulate(question._id);
            questionsAsync.push(populate);
        });
        const populatedQuestions = await Promise.all(questionsAsync);

        // Mandamos todos las preguntas que tengan un usuario
        return populatedQuestions.filter( question => question.user);
    }
}