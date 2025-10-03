import '@emotion/react';
import {
  BreakPoint,
  ColorPrimitiveTokens,
  EnvironmentTokens,
  LightColorSemanticTokens,
  SchemeTokens,
  TypographyTokens,
} from 'types';

declare module '@emotion/react' {
  export interface Theme {
    colorPrimitive: ColorPrimitiveTokens;
    color: LightColorSemanticTokens;
    scheme: SchemeTokens;
    environment: EnvironmentTokens;
    typo: TypographyTokens;
    breakPoint: BreakPoint;
  }
}
