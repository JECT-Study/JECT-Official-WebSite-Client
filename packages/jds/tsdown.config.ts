import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { defineConfig } from "tsdown";

import { entry, externalPackages } from "./tsdown.shared.ts";

export default defineConfig({
  entry,
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: false,
  target: "es2022",
  tsconfig: "./tsconfig.app.json",
  sourcemap: true,
  plugins: [
    vanillaExtractPlugin({
      identifiers: "debug",
      extract: { name: "styles.css" },
      esbuildOptions: { tsconfig: "./tsconfig.app.json" },
    }),
  ],
  deps: { neverBundle: externalPackages },
  outputOptions: { assetFileNames: "[name][extname]" },
});
