import * as process from "node:process";

const hasFileArg = (() => {
    if (Array.isArray(process.execArgv)) {
        const inlineArgs = ["-e", "--eval", "-p", "--print"];
        const hasInlineArg = process.execArgv.some((arg) => inlineArgs.includes(arg));
        if (hasInlineArg) {
        return false;
        }
    }
    return true;
})();
const args = process.argv.slice(hasFileArg ? 2 : 1);

const env = createStorageLike({
    get length() {
        return Object.getOwnPropertyNames(process.env).length;
    },
    key(index) {
        return Object.getOwnPropertyNames(process.env)[index] ?? null;
    },
    getItem(key) {
        return process.env[key] ?? null;
    },
    setItem(key, value) {
        process.env[key] = value;
    },
    removeItem(key) {
        delete process.env[key];
    },
    clear() {
        for (const key of Object.getOwnPropertyNames(process.env)) {
        delete process.env[key];
        }
    },
      
})

const exit = process.exit.bind(process);

import { Readable, Writable } from "node:stream";
import createStorageLike from "./createStorageLike.ts";

const stdin = Object.assign(Readable.toWeb(process.stdin), {isTTY: process.stdin.isTTY});
const stdout = Object.assign(Writable.toWeb(process.stdout), { isTTY: process.stdout.isTTY});
const stderr = Object.assign(Writable.toWeb(process.stderr), { isTTY: process.stderr.isTTY });

export const CLI = {
    args,
    env,
    exit,
    stdin,
    stdout,
    stderr,
};