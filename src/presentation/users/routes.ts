import { Router } from "express";
import { UsersController } from "./controller";
import { UsersEmailRepositoryImpl } from "../../infrastucture/repositories";
import { UserEmailMongoDatasourceImpl } from '../../infrastucture/datasources/mongo/user-email.mongo.datasource.impl';
import { JwtAdapter, MailerAdapter, envs } from "../../config";
import { ValidateJwtMiddleware } from "../middlewares";



const usersDatasource = new UserEmailMongoDatasourceImpl();
const usersRepository = new UsersEmailRepositoryImpl( usersDatasource );

const jwtAdapter = new JwtAdapter( envs.JWT_SEED );
const mailerAdapter = new MailerAdapter({
  mailerPass: envs.MAILER_PASS,
  mailerUser: envs.MAILER_USER,
});

const authMiddleware = new ValidateJwtMiddleware(usersRepository, jwtAdapter);


export class UsersRoutes{

  static get routes():Router {
    const routes = Router();
    const controller = new UsersController( usersRepository, jwtAdapter, mailerAdapter );


    routes.get('/get-user', controller.getUserBy);

    routes.post('/add-email', controller.addUserEmail);
    routes.patch('/verify-email', authMiddleware.validateJwt, controller.verifyEmail);


    return routes;
  }

}
