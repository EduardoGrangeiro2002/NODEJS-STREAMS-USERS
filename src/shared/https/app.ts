import bodyParser from "body-parser";
import Express from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { Server } from "http";
import { Env } from "../../domain/enviroments";
import  router  from "./router";


export class App  {
    private server?: Server;

    constructor(private port?: number, public app = Express()) {}

    public init(): void {
        this.setupExpress();
        this.setRoutes();
    }
    
    private setRoutes(): void {
        this.app.use(router);
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(this.rateLimiter())
    }

    private rateLimiter(): RateLimitRequestHandler {
        const limiter = rateLimit({
            windowMs: 1000,
            max: Env.REQUESTS_PER_SECOND,
            standardHeaders: true,
            legacyHeaders: false
        });

        return limiter;
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => console.log(`Server is runnning at port: ${this.port}`));
    }
}