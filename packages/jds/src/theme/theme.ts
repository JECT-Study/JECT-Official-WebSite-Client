import { Theme } from '@emotion/react';
import { designTokens } from '../tokens/tokens';

export const lightTheme: Theme = {
  colorPrimitive: designTokens.colorPrimitive,
  color: designTokens.colorSemantic.light,
  scheme: designTokens.scheme,
  environment: designTokens.environment,
  typo: designTokens.typography,
};

export const darkTheme: Theme = {
  colorPrimitive: designTokens.colorPrimitive,
  color: designTokens.colorSemantic.dark,
  scheme: designTokens.scheme,
  environment: designTokens.environment,
  typo: designTokens.typography,
};
