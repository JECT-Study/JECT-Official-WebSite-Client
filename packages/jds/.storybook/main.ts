import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join, resolve } from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const getAbsolutePath = (value: string): string =>
  dirname(require.resolve(join(value, "package.json")));

const config: StorybookConfig = {
  // src/tokens의 Token Usage / Usage Guide는 Emotion 기준으로 작성되어 있어 재작성 전까지 제외한다.
  stories: ["../src/components/**/*.mdx", "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      components: resolve(__dirname, "../src/components"),
      hooks: resolve(__dirname, "../src/hooks"),
      theme: resolve(__dirname, "../src/theme"),
      tokens: resolve(__dirname, "../src/tokens"),
      types: resolve(__dirname, "../src/types"),
      utils: resolve(__dirname, "../src/utils"),
      "@": resolve(__dirname, "../src"),
      "@storybook-assets": resolve(__dirname, "./assets"),
      "@storybook-utils": resolve(__dirname, "./utils"),
    };

    config.plugins = [...(config.plugins ?? []), vanillaExtractPlugin()];

    return config;
  },
};

export default config;
