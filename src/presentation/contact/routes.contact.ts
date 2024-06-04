import { Router } from "express";
import { ContactController } from "./controller.contact";
import { MailerAdapter, envs } from "../../config";


const mailerAdapter = new MailerAdapter({
    mailerPass: envs.MAILER_PASS,
    mailerUser: envs.MAILER_USER,
});

const mailerAdmins = envs.MAILER_ADMINS;


export class ContactRoutes {

    static get router():Router {
        const routes = Router();
        const controller = new ContactController(
            mailerAdapter,
            mailerAdmins,
        );


        // Manejamos las rutas
        routes.get('/by-email', controller.contactByEmail);


        return routes;
    }

}
