import { test, assert } from "vitest";
import * as process from "node:process";



const { CLI } = await import("#index");

test("args", () => {
  console.log(CLI.args);
});

test("env", () => {
  process.env.HELLO_WORLD = "123";
  assert(CLI.env.getItem("HELLO_WORLD") === "123");
  assert(CLI.env.HELLO_WORLD === "123");
});
