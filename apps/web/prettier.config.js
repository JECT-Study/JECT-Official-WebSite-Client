import config from "../../prettier.config.mjs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default {
  ...config,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindStylesheet: "./src/styles/global.css",
};
