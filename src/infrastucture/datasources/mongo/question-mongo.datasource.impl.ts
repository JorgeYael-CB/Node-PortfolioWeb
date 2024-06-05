import { QuestionDatasource } from "../../../domain/datasources";
import { AddQuestionDto, GetQuestionBy } from "../../../domain/dtos/questions";
import { QuestionEntity } from "../../../domain/entities";



export class QuestionMongoDatasourceImpl implements QuestionDatasource {

    constructor(){};


    addQuestion(addQuestionDto: AddQuestionDto): Promise<QuestionEntity> {
        throw new Error("Method not implemented.");
    }

    getQuestionBy(getQuestionByd: GetQuestionBy): Promise<QuestionEntity> {
        throw new Error("Method not implemented.");
    }

    allQuestions(): Promise<QuestionEntity[]> {
        throw new Error("Method not implemented.");
    }
}