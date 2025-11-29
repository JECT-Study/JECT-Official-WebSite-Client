import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: ["**/.storybook/**", "tsup.config.ts"],
  },
  ...designConfig,
];
