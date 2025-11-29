import tseslint from "typescript-eslint";
import storybookPlugin from "eslint-plugin-storybook";
import reactConfig from "./react.js";

export default tseslint.config(...reactConfig, ...storybookPlugin.configs["flat/recommended"]);
