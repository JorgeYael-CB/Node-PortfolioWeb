import { Router } from "express";
import { QuestionsController } from "./controller";


export class QuestionRoutes {

    static get router():Router {
        const routes = Router();
        const controller = new QuestionsController();


        routes.post('/validate-data', controller.validateData);
        routes.post('/add-question/:jwt', controller.addQuestion);


        return routes;
    }

}
