import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join, resolve } from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

import { srcAliases } from "../vite.aliases.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const getAbsolutePath = (value: string): string =>
  dirname(require.resolve(join(value, "package.json")));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
      ...srcAliases,
      "@storybook-assets": resolve(__dirname, "./assets"),
      "@storybook-utils": resolve(__dirname, "./utils"),
    };

    config.plugins = [...(config.plugins ?? []), vanillaExtractPlugin()];

    return config;
  },
};

export default config;
