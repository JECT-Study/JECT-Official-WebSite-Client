import "./index.css";
import type { Preview } from "@storybook/react-vite";
import React from "react";
import { JDSThemeProvider } from "../src/theme";

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
      const backgroundColor = context.globals.theme === "light" ? "#ffffff" : "#21232c";
      document.body.style.background = backgroundColor;

      const docsStories = document.querySelectorAll(".docs-story");
      docsStories.forEach(el => {
        (el as HTMLElement).style.background = backgroundColor;
      });

      return (
        <JDSThemeProvider>
          <div data-theme={context.globals.theme}>
            <Story />
          </div>
        </JDSThemeProvider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
