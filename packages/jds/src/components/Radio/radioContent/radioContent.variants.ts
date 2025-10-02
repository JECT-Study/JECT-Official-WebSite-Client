import { Theme } from '@emotion/react';

export const RADIO_CONTAINER_SIZE = (theme: Theme) => ({
  lg: {
    gap: theme.scheme.desktop.spacing[12],
  },
  md: {
    gap: theme.scheme.desktop.spacing[10],
  },
  sm: {
    gap: theme.scheme.desktop.spacing[8],
  },
  xs: {
    gap: theme.scheme.desktop.spacing[8],
  },
});
