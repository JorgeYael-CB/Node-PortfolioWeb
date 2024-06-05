import { envs } from "./config";
import { MongoDb } from "./data/mongoDB/db";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";



(() => {
    main();
})();


async function main() {
    // Connection a la base de datos
    try {
        await new MongoDb( envs.DB_URL_PORTFOLIO )
            .connect();

        console.log('DB Connected');
    } catch (error) {
        console.log(`Mongo connection error: ${error}`);
    }


    //Iniciamos el servidor
    const routes = Routes.routes;
    const server = new Server({
        port: envs.PORT,
        routes,
    })

    server.start();
};
