import type { ReactNode } from "react";

// VE CSS side-effect import
import "../tokens/globalTokens.css";
import "../tokens/textStyles.css";
import "./resetCss.css";

// ChakraProvider / MUI theme provider의 역할을 할 global theme provider
// 현재는 닫혀있는 상태로, 추후 확장 가능성 존재
export const JDSThemeProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
