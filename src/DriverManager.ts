import { Connection } from "mysql2/promise";
import mysql from "mysql2/promise";
import { Env } from "./domain/enviroments";

export class DriverManager {
    private static connection: Connection;
    
    static async createConnection() {
        if(this.connection) {
            return this.getConnection();
        }
        const connection = await mysql.createConnection(`mysql://${Env.USER}:${Env.PASSWORD}@${Env.HOST}:${Env.PORT_DB}/${Env.DATABASE}`);

        console.log('Conectado no MYSQL');

        this.connection = connection;
        this.connection.query(Env.SCRIPT_TABLE);
        return this.getConnection();
    }

    static getConnection() {
        return this.connection;
    }
}