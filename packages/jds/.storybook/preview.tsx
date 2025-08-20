import type { Preview } from '@storybook/react';
import { darkTheme, lightTheme, ThemeProvider } from '../src/theme';
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
  globalTypes: {
    theme: {
      name: 'Theme',
      description: '전역 테마 스위처',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehellow',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'light' ? lightTheme : darkTheme;
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
