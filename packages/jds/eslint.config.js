import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: ["**/.storybook/**", "tsdown.config.ts", "tsdown.dts.config.ts", "tsdown.shared.ts"],
  },
  ...designConfig,
];
