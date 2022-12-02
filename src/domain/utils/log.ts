import readLine from "readline";

export function log(message: string) {
    readLine.cursorTo(process.stdout, 0)
    process.stdout.write(message)
  }