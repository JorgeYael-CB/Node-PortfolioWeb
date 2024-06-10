import { QuestionDatasource } from "../../domain/datasources";
import { AddQuestionDto, GetQuestionBy } from "../../domain/dtos/questions";
import { QuestionEntity } from "../../domain/entities";
import { QuestionRepository } from "../../domain/repository";



export class QuestionRepositoryImpl implements QuestionRepository {

    constructor(
        private readonly questionDatasource:QuestionDatasource,
    ){}


    removeLikeQuestion(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        return this.questionDatasource.removeLikeQuestion( getQuestionBy );
    }

    addLikeQuestion(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        return this.questionDatasource.addLikeQuestion( getQuestionBy );
    };

    addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        return this.questionDatasource.addQuestion( addQuestionDto );
    }

    getQuestionBy(getQuestionBy: GetQuestionBy): Promise<QuestionEntity> {
        return this.questionDatasource.getQuestionBy( getQuestionBy );
    }

    allQuestions(): Promise<QuestionEntity[]> {
        return this.questionDatasource.allQuestions();
    }

}