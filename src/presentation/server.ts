import express, { Router } from "express";
import cors from 'cors';


interface Props {
    routes:Router;
    port:number;
}


export class Server {

    private routes:Router;
    private port: number;
    private readonly app = express();


    constructor( envs: Props ){
        const { port, routes } = envs;

        this.routes = routes;
        this.port = port;

        this.config();
    };


    private config() {
        this.app.use( cors() );

        this.app.use( express.urlencoded( {extended:true} ) );
        this.app.use( express.json() );

        this.app.use( this.routes );
    };


    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })
    };

}
