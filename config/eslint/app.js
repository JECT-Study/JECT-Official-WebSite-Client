import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactConfig from "./react.js";

export default tseslint.config(...reactConfig, ...pluginQuery.configs["flat/recommended"]);
