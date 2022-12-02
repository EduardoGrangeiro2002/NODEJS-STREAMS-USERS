import { Transform } from 'node:stream';
const ONE_SECOND = 1000;

type throttleConstructor = {
    objectMode: boolean,
    requestPerSecond: number
}

export default class ThrottleRequest extends Transform {
    private requestPerSecond: number;
    private internalCounter = 0;
    constructor({
        objectMode,
        requestPerSecond
    }: throttleConstructor) {
        super({
            objectMode
        })

        this.requestPerSecond = requestPerSecond
    }
    _transform(chunk: any, enc: any, callback: any) {
        this.internalCounter ++;
        if(!(this.internalCounter >= this.requestPerSecond)) {
            this.push(chunk);
            return callback();
        }

        setTimeout(() => {
            this.internalCounter = 0;
            this.push(chunk);
            return callback();
        }, ONE_SECOND)
    }


}