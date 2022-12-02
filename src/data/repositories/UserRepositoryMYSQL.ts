import { IUserRepository } from "../../domain/contracts/repository";
import { User } from "../../domain/Entities";
import { DriverManager } from "../../DriverManager";


export class UserRepositoryMYSQL implements IUserRepository {
    constructor () {}
    async insert(data: User): Promise<void> {
        const connection = DriverManager.getConnection();
        const params = [
            data.name,
            data.email,
            data.password
        ];
        
        const sql = 'INSERT INTO user_table ( name, email, password ) VALUES ( ?, ?, ? );';
        await connection.query(sql, params);
    }
}