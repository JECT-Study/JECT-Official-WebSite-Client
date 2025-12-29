import type { Theme } from "@emotion/react";

import type { SnackbarStyle } from "./snackbar.types";

export const snackbarStylesMap = (
  theme: Theme,
): Record<SnackbarStyle, { color: string; borderColor: string; backgroundColor: string }> => ({
  basic: {
    color: theme.color.semantic.object.bold,
    borderColor: theme.color.semantic.stroke.subtler,
    backgroundColor: theme.color.semantic.surface.shallower,
  },
  positive: {
    color: theme.color.semantic.feedback.positive.normal,
    borderColor: theme.color.semantic.feedback.positive.alpha.subtle,
    backgroundColor: theme.color.semantic.feedback.positive.alpha.subtlest,
  },
  destructive: {
    color: theme.color.semantic.feedback.destructive.normal,
    borderColor: theme.color.semantic.feedback.destructive.alpha.subtle,
    backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
  },
});
