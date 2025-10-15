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
  },
  globalTypes: {
    theme: {
      name: 'ThemeMode',
      description: 'Change theme mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'light' ? lightTheme : darkTheme;
      const backgroundColor = context.globals.theme === 'light' ? '#ffffff' : '#191B24';
      document.body.style.background = backgroundColor;

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
