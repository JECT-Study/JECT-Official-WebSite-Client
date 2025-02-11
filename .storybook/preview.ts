import type { Preview } from '@storybook/react';
import '../src/styles/tokens/index';
import '../src/styles/global.css';
import '@/styles/storyStyles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
};

export default preview;
