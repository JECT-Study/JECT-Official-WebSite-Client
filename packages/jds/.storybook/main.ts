import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import { resolve, dirname, join } from "path";

const require = createRequire(import.meta.url);

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
      components: resolve(__dirname, "../src/components"),
      style: resolve(__dirname, "../src/style"),
      theme: resolve(__dirname, "../src/theme"),
      tokens: resolve(__dirname, "../src/tokens"),
      types: resolve(__dirname, "../src/types"),
      utils: resolve(__dirname, "../src/utils"),
      "@": resolve(__dirname, "../src"),
      "@storybook-utils": resolve(__dirname, "./utils"),
    };

    return config;
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
