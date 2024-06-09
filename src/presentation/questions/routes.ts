import { Router } from "express";
import { QuestionsController } from "./controller";
import { QuestionRepositoryImpl } from "../../infrastucture/repositories";
import { QuestionMongoDatasourceImpl } from "../../infrastucture/datasources";
import { UsersEmailRepositoryImpl } from '../../infrastucture/repositories/users-email.repository.impl';
import { UserEmailMongoDatasourceImpl } from "../../infrastucture/datasources/mongo/user-email.mongo.datasource.impl";
import { ValidateJwtMiddleware } from "../middlewares";
import { JwtAdapter, MailerAdapter, envs } from "../../config";



const usersEmailsDatasource = new UserEmailMongoDatasourceImpl();
const usersEmailsRepositoryImpl = new UsersEmailRepositoryImpl( usersEmailsDatasource );

const questionDatasource = new QuestionMongoDatasourceImpl( usersEmailsRepositoryImpl );
const questionRepository = new QuestionRepositoryImpl( questionDatasource );

const jwtAdapter = new JwtAdapter();
const authMiddleware = new ValidateJwtMiddleware(usersEmailsRepositoryImpl, jwtAdapter);
const emailsAdmins = envs.MAILER_ADMINS;
const mailerAdapter = new MailerAdapter({
    mailerPass: envs.MAILER_PASS,
    mailerUser: envs.MAILER_USER
})


export class QuestionRoutes {

    static get router():Router {
        const routes = Router();
        const controller = new QuestionsController( questionRepository, emailsAdmins, mailerAdapter );

        routes.post('/add-question', authMiddleware.validateJwt, controller.addQuestion);
        routes.get('/all-questions', controller.getAllQuestions);


        return routes;
    }

}
