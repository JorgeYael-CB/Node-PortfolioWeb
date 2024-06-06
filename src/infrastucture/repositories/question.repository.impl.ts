import { QuestionDatasource } from "../../domain/datasources";
import { AddQuestionDto, GetQuestionBy } from "../../domain/dtos/questions";
import { QuestionEntity } from "../../domain/entities";
import { QuestionRepository } from "../../domain/repository";



export class QuestionRepositoryImpl implements QuestionRepository {

    constructor(
        private readonly questionDatasource:QuestionDatasource,
    ){};


    addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        return this.questionDatasource.addQuestion( addQuestionDto );
    }

    getQuestionBy(getQuestionByd: GetQuestionBy): Promise<QuestionEntity> {
        return this.questionDatasource.getQuestionBy( getQuestionByd );
    }

    allQuestions(): Promise<QuestionEntity[]> {
        return this.questionDatasource.allQuestions();
    }

}