import { Theme } from '@emotion/react';
import { SnackbarStyle } from './snackbar.types';

export const snackbarStylesMap = (
  theme: Theme,
): Record<SnackbarStyle, { color: string; borderColor: string; backgroundColor: string }> => ({
  basic: {
    color: theme.color.object.bold,
    borderColor: theme.color.stroke.subtler,
    backgroundColor: theme.color.surface.shallower,
  },
  positive: {
    color: theme.color.feedback.positive.normal,
    borderColor: theme.color.feedback.positive.alpha.subtle,
    backgroundColor: theme.color.feedback.positive.alpha.subtlest,
  },
  destructive: {
    color: theme.color.feedback.destructive.normal,
    borderColor: theme.color.feedback.destructive.alpha.subtle,
    backgroundColor: theme.color.feedback.destructive.alpha.subtlest,
  },
});
