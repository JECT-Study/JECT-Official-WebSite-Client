import { Theme } from '@emotion/react';

export const mediaQuery = (theme: Theme) => ({
  desktop: `@media (min-width: ${theme.scheme.desktop.breakpoint.min}px)`,
  tablet: `@media (min-width: ${theme.scheme.tablet.breakpoint.min}px) and (max-width: ${theme.scheme.tablet.breakpoint.max}px)`,
  mobile: `@media (min-width: ${theme.scheme.mobile.breakpoint.min}px) and (max-width: ${theme.scheme.mobile.breakpoint.max}px)`,
});
