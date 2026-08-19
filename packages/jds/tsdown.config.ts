import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { defineConfig } from "tsdown";

import { entry, externalPackages } from "./tsdown.shared.ts";

export default defineConfig({
  entry,
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: false,
  clean: false,
  target: "es2022",
  sourcemap: true,
  plugins: [vanillaExtractPlugin({ identifiers: "debug", extract: { name: "styles.css" } })],
  deps: { neverBundle: externalPackages },
  outputOptions: { assetFileNames: "[name][extname]" },
});
