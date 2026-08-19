import { defineConfig } from "tsdown";

import { entry, externalPackages } from "./tsdown.shared.ts";

const DTS_PATTERN = /\.d\.[cm]?ts(\.map)?$/;

export default defineConfig({
  entry,
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: { emitDtsOnly: true, sourcemap: true },
  clean: false,
  target: "es2022",
  deps: { neverBundle: externalPackages },
  plugins: [
    {
      name: "dts-only",
      generateBundle(_options, bundle) {
        for (const fileName of Object.keys(bundle)) {
          if (!DTS_PATTERN.test(fileName)) delete bundle[fileName];
        }
      },
    },
  ],
});
