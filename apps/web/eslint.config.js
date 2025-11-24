// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import appConfig from "@ject/eslint-config/app";

export default [
  {
    ignores: ["**/.storybook/**"],
  },
  ...appConfig,
  ...storybook.configs["flat/recommended"],
];
