import { Theme } from '@emotion/react';
import { ToastStyle } from './toast.types';

export const toastStylesMap = (
  theme: Theme,
): Record<ToastStyle, { color: string; borderColor: string; backgroundColor: string }> => ({
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
