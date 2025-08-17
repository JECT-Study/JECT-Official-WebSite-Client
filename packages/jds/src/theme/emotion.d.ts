import '@emotion/react';
import {
  EnvironmentTokens,
  SchemeTokens,
  TypographyTokens,
  LightColorSemanticTokens,
  DarkColorSemanticTokens,
} from '../tokens';

export interface EnvironmentTokensPlus extends EnvironmentTokens {}

declare module '@emotion/react' {
  export interface Theme {
    color: LightColorSemanticTokens | DarkColorSemanticTokens;
    scheme: SchemeTokens;
    environment: EnvironmentTokensPlus;
    typo: TypographyTokens;
  }
}
