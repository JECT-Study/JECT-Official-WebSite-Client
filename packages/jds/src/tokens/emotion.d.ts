/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@emotion/react';
import type { theme } from './theme';

type DesignToken = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends DesignToken {}
}
