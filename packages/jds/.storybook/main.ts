import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      components: resolve(__dirname, '../src/components'),
      style: resolve(__dirname, '../src/style'),
      theme: resolve(__dirname, '../src/theme'),
      tokens: resolve(__dirname, '../src/tokens'),
      types: resolve(__dirname, '../src/types'),
      utils: resolve(__dirname, '../src/utils'),
      '@': resolve(__dirname, '../src'),
    };

    return config;
  },
};
export default config;
