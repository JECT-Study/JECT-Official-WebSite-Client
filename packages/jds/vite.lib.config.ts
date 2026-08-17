import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json" with { type: "json" };
import { srcAliases } from "./vite.aliases";

const externalPackages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];

const isExternal = (id: string) =>
  externalPackages.some(name => id === name || id.startsWith(`${name}/`));

export default defineConfig({
  resolve: {
    alias: srcAliases,
  },
  plugins: [
    vanillaExtractPlugin(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      include: ["src"],
      exclude: ["src/**/*.stories.*"],
      compilerOptions: { declarationMap: false },
    }),
  ],
  publicDir: false,
  build: {
    target: "es2022",
    sourcemap: true,
    lib: {
      entry: {
        index: "src/index.ts",
        theme: "src/theme/index.tsx",
        hooks: "src/hooks/index.ts",
        utils: "src/utils/index.ts",
        tokens: "src/tokens/index.ts",
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => (format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`),
      cssFileName: "styles",
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
