import { Router } from 'express';
import { ContactRoutes } from './contact/routes.contact';
import { QuestionRoutes } from './questions/routes';


export class Routes {
    static get routes():Router {
        const routes = Router();


        // Manejamos las rutas principales
        routes.use('/api/contact', ContactRoutes.router);
        routes.use( '/api/questions', QuestionRoutes.router );


        return routes;
    }
};

