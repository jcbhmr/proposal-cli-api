import type * as index from "#index";

declare global {
  var CLI: typeof index.CLI;
}

if (typeof CLI === "undefined") {
  const index = await import("#index");
  globalThis.CLI = index.CLI;
}
