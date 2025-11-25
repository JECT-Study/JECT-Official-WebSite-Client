import pluginQuery from "@tanstack/eslint-plugin-query";
import storybookPlugin from "eslint-plugin-storybook";
import reactConfig from "./react.js";

export default [
  ...reactConfig,
  ...pluginQuery.configs["flat/recommended"],
  ...storybookPlugin.configs["flat/recommended"],
];
