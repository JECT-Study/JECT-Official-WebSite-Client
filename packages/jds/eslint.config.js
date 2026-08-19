import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: ["**/.storybook/**", "tsdown.config.ts"],
  },
  ...designConfig,
];
