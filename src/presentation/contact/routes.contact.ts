import { Router } from "express";
import { ContactController } from "./controller.contact";


export class ContactRoutes {

    static get router():Router {
        const routes = Router();
        const controller = new ContactController();


        // Manejamos las rutas
        routes.get('/by-email', controller.contactByEmail);


        return routes;
    }

}
