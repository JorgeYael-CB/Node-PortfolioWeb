import { Router } from 'express';
import { ContactRoutes } from './contact/routes.contact';
import { QuestionRoutes } from './questions/routes';
import { UsersRoutes } from './users/routes';
import { AnswerRoutes } from './answer/routes';


export class Routes {
    static get routes():Router {
        const routes = Router();


        // Manejamos las rutas principales
        routes.use('/api/contact', ContactRoutes.router);
        routes.use('/api/users', UsersRoutes.routes );
        routes.use('/api/questions', QuestionRoutes.router );
        routes.use('/api/answers', AnswerRoutes.routes);


        return routes;
    }
};

