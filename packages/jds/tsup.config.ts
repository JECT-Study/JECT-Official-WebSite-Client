import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts", //컴포넌트 파일
    theme: "src/theme/index.tsx", //테마 파일
    hooks: "src/hooks/index.ts", //hooks 파일
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  minify: process.env.NODE_ENV === "production",
});
