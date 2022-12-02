import { ICrypto } from "../../domain/contracts/crypto";
import { IUserRepository } from "../../domain/contracts/repository";
import { ICreateUser } from "../../domain/useCases";

export class CreateUser implements ICreateUser {
    constructor(
        private userRepository: IUserRepository,
        private crypto: ICrypto
    ) {}
    async create(name: string, email: string, password: string): Promise<void> {

        const passwordHash = await this.crypto.crypto(password);
        
        await this.userRepository.insert({name, email, password: passwordHash});
    }
}