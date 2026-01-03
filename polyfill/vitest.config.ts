import { defineConfig } from "vitest/config";
import { defaultServerConditions } from "vite";

export default defineConfig({
    resolve: {
        conditions: defaultServerConditions
            .filter(c => c !== "module") // https://github.com/vitest-dev/vitest/blob/e6a3f8cc73e1675812b9588fbbc8a234f04dbc06/packages/vitest/src/node/plugins/utils.ts#L132
            .concat("@jcbhmr/cli-api/development"),
    },
});
