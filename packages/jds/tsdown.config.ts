import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

const externalPackages = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  "csstype",
];

export default defineConfig({
  entry: {
    index: "src/index.ts",
    theme: "src/theme/index.tsx",
    hooks: "src/hooks/index.ts",
    utils: "src/utils/index.ts",
    tokens: "src/tokens/index.ts",
  },
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: true,
  target: "es2022",
  sourcemap: true,
  plugins: [vanillaExtractPlugin({ identifiers: "debug", extract: { name: "styles.css" } })],
  deps: { neverBundle: externalPackages },
  outputOptions: { assetFileNames: "[name][extname]" },
});
