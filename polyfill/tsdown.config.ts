import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: [
        "./src/auto.ts",
        './src/index.ts',
        "./src/index.*.ts", // "#index" subpath imports
    ],
    external: [
        /^#/, // subpath imports
        /^bun(?:$|:)/, // Bun runtime https://bun.com/docs
    ],
    fixedExtension: false, // use `.js` instead of `.mjs`
})
