import { envs } from "./config";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";



(() => {
    main();
})();


async function main() {
    //Iniciamos el servidor
    const routes = Routes.routes;
    const server = new Server({
        port: envs.PORT,
        routes,
    })

    server.start();
};