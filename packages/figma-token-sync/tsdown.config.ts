import { defineConfig } from "tsdown";

const shared = {
  format: "iife",
  platform: "browser",
  target: "es2020",
  outDir: "dist",
  clean: false,
  dts: false,
} as const;

export default defineConfig([
  { ...shared, entry: { code: "src/plugin/code.ts" } },
  { ...shared, entry: { ui: "src/ui/ui.ts" }, onSuccess: "node scripts/inline-ui.mjs" },
]);
