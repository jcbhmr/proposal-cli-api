import * as Bun from "bun";
import * as process from "node:process";
import createStorageLike from "./createStorageLike.ts";

const args = Bun.argv.slice(2);

const env = createStorageLike({
  get length() {
    return Object.getOwnPropertyNames(Bun.env).length;
  },
  key(index) {
    return Object.getOwnPropertyNames(Bun.env)[index] ?? null;
  },
  getItem(key) {
    return Bun.env[key] ?? null;
  },
  setItem(key, value) {
    Bun.env[key] = value;
  },
  removeItem(key) {
    delete Bun.env[key];
  },
  clear() {
    for (const key of Object.getOwnPropertyNames(Bun.env)) {
      delete Bun.env[key];
    }
  },
});

const exit = process.exit.bind(process);

function bunFileToWritableStream(file: Bun.BunFile): WritableStream<Uint8Array> {
  const fileSink = file.writer();
  return new WritableStream({
    start(_controller) {
      fileSink.start();
    },
    write(chunk, _controller) {
      fileSink.write(chunk);
    },
    close() {
      fileSink.end();
    },
    abort(reason) {
      fileSink.end(reason);
    },
  });
}

const stdin = Object.assign(Bun.stdin.stream(), { isTTY: process.stdin.isTTY });
const stdout = Object.assign(bunFileToWritableStream(Bun.stdout), { isTTY: process.stdout.isTTY });
const stderr = Object.assign(bunFileToWritableStream(Bun.stderr), { isTTY: process.stderr.isTTY });

export const CLI = {
  args,
  env,
  exit,
  stdin,
  stdout,
  stderr,
};
