import { ObjectId, isValidObjectId } from "mongoose";
import { QuestionModel, UserEmailModel } from "../../../data";
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


    private async searchUserEmail( userId:string ){
        if( !isValidObjectId( userId ) ) throw CustomError.BadRequestException(`userId is not valid`);
        const user = await UserEmailModel.findById( userId );
        if( !user ) throw CustomError.BadRequestException(`User not exist`);

        return user;
    }


    async removeLikeQuestion(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        const { userId, questionId } = getQuestionBy;

        const [question, user] = await Promise.all([
            this.getQuestionById( questionId ),
            this.searchUserEmail( userId ),
        ]);

        question.likes = question.likes.filter(id => id.toString() !== user._id.toString());
        await question.save();

        return await this.getQuestionPopulate(question._id);
    }


    private async getQuestionById(questionId:any) {
        if( !isValidObjectId( questionId ) ) throw CustomError.BadRequestException(`questionId is not valid`);
        const question = await QuestionModel.findById( questionId );

        if( !question ) throw CustomError.BadRequestException(`Question with id: ${questionId} not found`);
        return question;
    }


    async addLikeQuestion(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        const { questionId, userId } = getQuestionBy;
        const question = await this.getQuestionById( questionId );

        if( !isValidObjectId(userId) ) throw CustomError.BadRequestException('userId is not valid');
        if( question.likes.includes(userId) ) throw CustomError.BadRequestException(`This user has already liked it`);

        question.likes.push(userId);
        await question.save();

        const populate = await this.getQuestionPopulate(question._id);
        return populate;
    };


    private async getUserEmailById( userId:string ) {
        return await this.usersEmailRpository.getUserBy( new GetUserByDto( undefined, userId ) );
    }

    private async getQuestionPopulate( questionId: any ):Promise< QuestionEntity > {
        if( !isValidObjectId( questionId )) throw CustomError.BadRequestException(`ID is not valid`);
        const userData = 'email verify isActive date roles name';


        const question = await QuestionModel.findById(questionId)
            .populate({
                path: 'user',
                select: userData
            })
            .populate({
                path: 'answers',
                select: 'answer date user likes',
                populate: [{path: 'user', select: userData}, {path: 'likes', select: userData}],
            })
            .populate({
                path: 'likes',
                select: userData,
            });

        if( !question ) throw CustomError.BadRequestException(`Question not found`);

        return QuestionMapper.getQuestionFromObj( question );
    };


    async addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        const { question, title, userId, stars } = addQuestionDto;
        const user = await this.getUserEmailById( userId.toString() );

        if( !user.verify ) throw CustomError.BadRequestException(`verify your account.`);
        if( user.questions.length >= 3  ) throw CustomError.unauthorized(`This account has already exceeded the question limit!`);

        const newQuestion = await QuestionModel.create({
            answers: [],
            date: new Date(),
            question,
            title,
            user: userId,
            stars: stars ? stars: 5,
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