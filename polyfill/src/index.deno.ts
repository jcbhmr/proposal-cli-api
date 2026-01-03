import createStorageLike from "./createStorageLike.ts";

if (typeof Deno === "undefined") {
  throw new ReferenceError("Global 'Deno' is not defined");
}

const args = Deno.args;

const env = createStorageLike({
  get length() {
    const env = Deno.env.toObject();
    return Object.getOwnPropertyNames(env).length;
  },
  key(index) {
    const env = Deno.env.toObject();
    return Object.getOwnPropertyNames(env)[index] ?? null;
  },
  getItem(key) {
    return Deno.env.get(key) ?? null;
  },
  setItem(key, value) {
    Deno.env.set(key, value);
  },
  removeItem(key) {
    Deno.env.delete(key);
  },
  clear() {
    const env = Deno.env.toObject();
    for (const key of Object.getOwnPropertyNames(env)) {
      Deno.env.delete(key);
    }
  },
});

const exit = Deno.exit.bind(Deno);

const stdin = Object.assign(Deno.stdin.readable, { isTTY: Deno.stdin.isTerminal() });
const stdout = Object.assign(Deno.stdout.writable, { isTTY: Deno.stdout.isTerminal() });
const stderr = Object.assign(Deno.stderr.writable, { isTTY: Deno.stderr.isTerminal() });

export const CLI = {
  args,
  env,
  exit,
  stdin,
  stdout,
  stderr,
};
