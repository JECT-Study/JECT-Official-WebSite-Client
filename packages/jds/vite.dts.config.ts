import { dts } from "rolldown-plugin-dts";
import { defineConfig } from "vite";

import pkg from "./package.json" with { type: "json" };
import { srcAliases } from "./vite.aliases";

const externalPackages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies), "csstype"];

const isExternal = (id: string) =>
  externalPackages.some(name => id === name || id.startsWith(`${name}/`)) ||
  id.startsWith("@radix-ui/");

export default defineConfig({
  oxc: {
    exclude: [/\.js$/, /\.d\.[cm]?ts$/],
  },
  resolve: {
    alias: srcAliases,
  },
  plugins: [dts({ tsconfig: "./tsconfig.app.json", emitDtsOnly: true, sourcemap: false })],
  publicDir: false,
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
        theme: "src/theme/index.tsx",
        hooks: "src/hooks/index.ts",
        utils: "src/utils/index.ts",
        tokens: "src/tokens/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
