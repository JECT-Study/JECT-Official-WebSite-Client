import { defineConfig } from "tsdown";

import { entry, externalPackages } from "./tsdown.shared.ts";

export default defineConfig({
  entry,
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: { emitDtsOnly: true, sourcemap: true },
  outDir: "dist-types",
  target: "es2022",
  tsconfig: "./tsconfig.app.json",
  deps: { neverBundle: externalPackages },
});
