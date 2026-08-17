import designConfig from "@ject/eslint-config/design";

export default [
  {
    ignores: ["**/.storybook/**", "vite.lib.config.ts", "vite.aliases.js", "vite.aliases.d.ts"],
  },
  ...designConfig,
];
