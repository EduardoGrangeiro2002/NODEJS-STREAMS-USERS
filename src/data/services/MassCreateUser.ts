import { createReadStream } from 'node:fs';
import csvtojson from 'csvtojson';
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { IMassCreateUser } from "../../domain/useCases";
import { ThrottleRequest } from '../../domain/Entities';
import { Env } from '../../domain/enviroments';
import { Worker } from 'node:worker_threads';
import { log, makeRequest } from '../../domain/utils';

export class MassCreateUser implements IMassCreateUser {
    constructor() {}

    async massCreate(): Promise<void> {
        const throttle = new ThrottleRequest({
            objectMode: true,
            requestPerSecond: Env.REQUESTS_PER_SECOND
        })

        const dataProcessor = new Transform({
            objectMode: true,
            transform(chunk, enc, callback) {
                const jsonData = chunk.toString();
                const data = JSON.parse(jsonData);
                data.password = randomPassword();
                return callback(null, JSON.stringify(data));
            }
        });
        await pipeline(
            createReadStream('big.csv'),
            csvtojson(),
            dataProcessor,
            throttle,
            async function * (source: any) {
                let counter = 0;
                for await (const data of source) {
                    const status = await makeRequest(data);
                    log(`processed ${++counter} data...`);
                    if(status !== 201) {
                        throw new Error(`oops! reached rate limit, stupid! - status ${status}`);                
                    }
                }
            }
        )
    }
}

function randomPassword(): string {
    return Math.random().toString(36).slice(-10);
}