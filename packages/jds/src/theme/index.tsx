// TODO(Emotion 제거) line:2, line:4~6
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import type { ReactNode } from "react";
import { globalStyles as globalTokenStyles, theme } from "tokens";

import { resetCss } from "./resetCss";

// VE CSS side-effect import
import "../tokens/globalTokens.css";
import "../tokens/textStyles.css";
import "./resetCss.css";

// ChakraProvider / MUI theme provider의 역할을 할 global theme provider
// 현재는 닫혀있는 상태로, 추후 확장 가능성 존재
export const JDSThemeProvider = ({ children }: { children: ReactNode }) => {
  // TODO(Emotion 제거): EmotionThemeProvider와 Global 제거 후 아래처럼 단순화
  // return <>{children}</>;
  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={[resetCss, globalTokenStyles]} />
      {children}
    </EmotionThemeProvider>
  );
};
