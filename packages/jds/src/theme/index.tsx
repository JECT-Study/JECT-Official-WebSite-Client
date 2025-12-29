import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import type { ReactNode } from "react";
import { globalStyles as globalTokenStyles, theme } from "tokens";

import { resetCss } from "./resetCss";
// ChakraProvider / MUI theme provider의 역할을 할 global theme provider
// 현재는 닫혀있는 상태로, 추후 확장 가능성 존재
export const JDSThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={[resetCss, globalTokenStyles]} />
      {children}
    </EmotionThemeProvider>
  );
};
