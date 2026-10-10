import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { defineConfig } from "tsdown";

import { entry, externalPackages } from "./tsdown.shared.ts";

// 번들링하면 소스의 모듈 레벨 지시어가 제거되므로 엔트리 산출물에 직접 붙인다.
// tokens, utils, theme은 서버 컴포넌트에서도 쓸 수 있도록 제외한다.
const CLIENT_ENTRIES = new Set(["index.js", "index.cjs", "hooks.js", "hooks.cjs"]);

export default defineConfig({
  entry,
  format: ["es", "cjs"],
  fixedExtension: false,
  dts: false,
  target: "es2022",
  tsconfig: "./tsconfig.app.json",
  sourcemap: true,
  banner: ({ fileName }) => (CLIENT_ENTRIES.has(fileName) ? '"use client";' : undefined),
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
