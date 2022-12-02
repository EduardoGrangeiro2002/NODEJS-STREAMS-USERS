import { ICrypto } from "../../domain/contracts/crypto";
import { hash } from "bcrypt"
import { Env } from "../../domain/enviroments";


export class Bcrypt implements ICrypto{
    async crypto(string: string): Promise<string> {
        const stringHash = await hash(string, Env.SALT_ROUNDS);

        return stringHash;
    }
}