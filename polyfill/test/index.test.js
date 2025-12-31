import test from "node:test";
import assert from "node:assert/strict";
import { CLI } from "#index";
test("args", () => {
});
test("env", () => {
    // @ts-ignore This will be coerced to a string by `process.env` setter.
    process.env.HELLO_WORLD = 123;
    assert(process.env.HELLO_WORLD === "123");
});
