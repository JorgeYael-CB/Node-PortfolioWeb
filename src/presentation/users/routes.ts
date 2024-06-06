import { Router } from "express";
import { UsersController } from "./controller";
import { UsersEmailRepositoryImpl } from "../../infrastucture/repositories";
import { UserEmailMongoDatasourceImpl } from '../../infrastucture/datasources/mongo/user-email.mongo.datasource.impl';



const usersDatasource = new UserEmailMongoDatasourceImpl();
const usersRepository = new UsersEmailRepositoryImpl( usersDatasource );


export class UsersRoutes{

  static get routes():Router {
    const routes = Router();
    const controller = new UsersController( usersRepository );


    routes.post('/add-email', controller.addUserEmail);
    routes.get('/get-user', controller.getUserBy);
    routes.patch('/verify-email', controller.verifyEmail);


    return routes;
  }

}
