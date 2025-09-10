import { designTokens } from 'tokens';

export type DesignTokens = typeof designTokens;
export type ColorPrimitiveTokens = typeof designTokens.colorPrimitive;
export type ColorSemanticTokens = typeof designTokens.colorSemantic;
export type LightColorSemanticTokens = typeof designTokens.colorSemantic.light;
export type DarkColorSemanticTokens = typeof designTokens.colorSemantic.dark;
export type SchemeTokens = typeof designTokens.scheme;
export type TypographyTokens = typeof designTokens.typography;
export type EnvironmentTokens = typeof designTokens.environment;
export type BreakPoint = {
  desktop: string;
  tablet: string;
  mobile: string;
};
