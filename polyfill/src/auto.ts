import type { CLI } from "#index"

declare global {
    var CLI: CLI;
}

if (typeof CLI === "undefined") {
    const CLI = await import("#index");
    (globalThis as any).CLI = CLI;
}