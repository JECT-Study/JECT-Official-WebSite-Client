import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: [
      "**/.storybook/**",
      "src/components/Icon/generated/**",
      "src/tokens/tokens.ts",
      "src/tokens/theme.ts",
      "src/tokens/globalStyles.ts",
      "src/tokens/globalTokens.css.ts",
      "src/tokens/textStyles.ts",
      "src/tokens/vars.css.ts",
      "src/tokens/breakpoints.ts",
    ],
  },
  ...designConfig,
];
