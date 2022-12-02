import { Env } from "./domain/enviroments"
import { DriverManager } from "./DriverManager";
import { App } from "./shared/https/app"



class Server {
    public static async start(): Promise<void> {
        const app = new App(Env.PORT);
        await DriverManager.createConnection()
        app.init();
        app.start();
    }
}


Server.start();