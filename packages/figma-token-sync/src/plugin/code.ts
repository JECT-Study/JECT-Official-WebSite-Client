import type { UiMessage } from "../shared/messages";

figma.showUI(__html__, { width: 360, height: 480, themeColors: true });

figma.ui.onmessage = (message: UiMessage) => {
  if (message.type === "close") {
    figma.closePlugin();
  }
};
