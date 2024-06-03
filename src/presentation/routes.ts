import { Router } from 'express';
import { ContactRoutes } from './contact/routes.contact';


export class Routes {
    static get routes():Router {
        const routes = Router();


        // Manejamos las rutas principales
        routes.use('/api/contact', ContactRoutes.router);


        return routes;
    }
};

