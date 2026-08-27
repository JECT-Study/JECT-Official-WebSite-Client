import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: ["**/.storybook/**"],
  },
  ...designConfig,
];
