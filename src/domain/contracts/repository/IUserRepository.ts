import { User } from "../../Entities";



export interface IUserRepository {
    insert(data: User): Promise<void>;
}