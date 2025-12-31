import test from "node:test";
import assert from "node:assert/strict";
import * as process from "node:process"
import { CLI } from "#index";

test("args", () => {
    
})

test("env", () => {
    process.env.HELLO_WORLD = "123";
    assert(CLI.env.getItem("HELLO_WORLD") === "123")
    assert(CLI.env.HELLO_WORLD === "123")
})