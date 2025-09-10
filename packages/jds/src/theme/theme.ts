import { Theme } from '@emotion/react';
import { designTokens } from '../tokens/tokens';

const breakPoint = {
  desktop: `@media (min-width: ${designTokens.scheme.desktop.breakpoint.min}px)`,
  tablet: `@media (min-width: ${designTokens.scheme.tablet.breakpoint.min}px) and (max-width: ${designTokens.scheme.tablet.breakpoint.max}px)`,
  mobile: `@media (min-width: ${designTokens.scheme.mobile.breakpoint.min}px) and (max-width: ${designTokens.scheme.mobile.breakpoint.max}px)`,
};

export const lightTheme: Theme = {
  colorPrimitive: designTokens.colorPrimitive,
  color: designTokens.colorSemantic.light,
  scheme: designTokens.scheme,
  environment: designTokens.environment,
  typo: designTokens.typography,
  breakPoint,
};

export const darkTheme: Theme = {
  colorPrimitive: designTokens.colorPrimitive,
  color: designTokens.colorSemantic.dark,
  scheme: designTokens.scheme,
  environment: designTokens.environment,
  typo: designTokens.typography,
  breakPoint,
};
