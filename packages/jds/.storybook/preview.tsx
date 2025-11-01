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

      // TODO: 모드 전환 시 깜박임 현상 해결하기 (Global 요소 활용, 설정 조작 등 방법 이용)
      const docsStories = document.querySelectorAll('.docs-story');
      docsStories.forEach(el => {
        (el as HTMLElement).style.background = backgroundColor;
      });

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
