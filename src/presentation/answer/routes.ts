import { Router } from "express";
import { AnswerController } from "./controller";
import { AnswerRepositoryImpl } from "../../infrastucture/repositories/answer.repository.impl";
import { AnswerDatasourceMongoImpl, UserEmailMongoDatasourceImpl } from "../../infrastucture/datasources";
import { JwtAdapter, MailerAdapter, envs } from "../../config";
import { ValidateJwtMiddleware } from "../middlewares";
import { UsersEmailRepositoryImpl } from "../../infrastucture/repositories";



const answerDatasource = new AnswerDatasourceMongoImpl();
const answerRepository = new AnswerRepositoryImpl( answerDatasource );
const mailerAdapter = new MailerAdapter({
  mailerPass: envs.MAILER_PASS,
  mailerUser: envs.MAILER_USER,
})

const usersEmailsDatasource = new UserEmailMongoDatasourceImpl();
const usersEmailRepository = new UsersEmailRepositoryImpl( usersEmailsDatasource );
const jwtAdapter = new JwtAdapter();

const authMiddleware = new ValidateJwtMiddleware( usersEmailRepository, jwtAdapter);


export class AnswerRoutes{

  static get routes():Router {
    const routes = Router();
    const controller = new AnswerController( answerRepository, mailerAdapter );


    routes.get('/get-answer-by', controller.getAnswerBy);
    routes.post('/add-answer', [authMiddleware.validateJwt], controller.addAnswer);

    return routes;
  }

}
