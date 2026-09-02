import config from "../../prettier.config.mjs";
export default {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/global.css",
};
