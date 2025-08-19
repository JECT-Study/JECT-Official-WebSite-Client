import type { Preview } from '@storybook/react';
import { lightTheme, ThemeProvider } from '../src/theme';
import { GlobalStyles } from '../src/style';

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
  decorators: [
    Story => (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
