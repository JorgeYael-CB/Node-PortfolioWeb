import { Router } from "express";
import { QuestionsController } from "./controller";
import { QuestionRepositoryImpl } from "../../infrastucture/repositories";
import { QuestionMongoDatasourceImpl } from "../../infrastucture/datasources";
import { UsersEmailRepositoryImpl } from '../../infrastucture/repositories/users-email.repository.impl';
import { UserEmailMongoDatasourceImpl } from "../../infrastucture/datasources/mongo/user-email.mongo.datasource.impl";
import { ValidateJwtMiddleware } from "../middlewares";
import { JwtAdapter } from "../../config";



const usersEmailsDatasource = new UserEmailMongoDatasourceImpl();
const usersEmailsRepositoryImpl = new UsersEmailRepositoryImpl( usersEmailsDatasource );

const questionDatasource = new QuestionMongoDatasourceImpl( usersEmailsRepositoryImpl );
const questionRepository = new QuestionRepositoryImpl( questionDatasource );

const jwtAdapter = new JwtAdapter();

const authMiddleware = new ValidateJwtMiddleware(usersEmailsRepositoryImpl, jwtAdapter);


export class QuestionRoutes {

    static get router():Router {
        const routes = Router();
        const controller = new QuestionsController( questionRepository );


        routes.post('/validate-data', controller.validateData);
        routes.post('/add-question', authMiddleware.validateJwt, controller.addQuestion);
        routes.get('/all-questions', controller.getAllQuestions);


        return routes;
    }

}
