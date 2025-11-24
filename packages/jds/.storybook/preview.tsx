import "./index.css";
import type { Preview } from "@storybook/react-vite";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "../src/tokens/theme";
import { globalStyles } from "../src/tokens/globalStyles";
import { GlobalStyles } from "../src/style/globalStyle";
import React from "react";

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
      name: "ThemeMode",
      description: "Change theme mode",
      defaultValue: "light",
      toolbar: {
        icon: "sun",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const backgroundColor = context.globals.theme === "light" ? "#ffffff" : "#191B24";
      document.body.style.background = backgroundColor;

      const docsStories = document.querySelectorAll(".docs-story");
      docsStories.forEach(el => {
        (el as HTMLElement).style.background = backgroundColor;
      });

      return (
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <GlobalStyles />
          <div data-theme={context.globals.theme}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
