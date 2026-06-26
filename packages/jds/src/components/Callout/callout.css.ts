import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { CalloutFeedback, CalloutSize } from "./callout.types";
import { labelColorVar, titleColorVar } from "../../utils/typography.css";

interface SurfaceStyle {
  backgroundColor: string;
  borderColor: string;
  color: string;
}

interface FeedbackStyle {
  surface: SurfaceStyle;
  layer: Pick<SurfaceStyle, "backgroundColor">;
  icon: Pick<SurfaceStyle, "color">;
}

const feedbackStyles = {
  none: {
    surface: {
      backgroundColor: vars.color.semantic.fill.subtlest,
      borderColor: vars.color.semantic.stroke.alpha.subtler,
      color: vars.color.semantic.object.bold,
    },
    layer: { backgroundColor: vars.color.semantic.fill.subtlest },
    icon: { color: vars.color.semantic.object.bold },
  },
  positive: {
    surface: {
      backgroundColor: vars.color.semantic.feedback.positive.alpha.subtlest,
      borderColor: vars.color.semantic.feedback.positive.alpha.subtler,
      color: vars.color.semantic.object.bolder,
    },
    layer: { backgroundColor: vars.color.semantic.feedback.positive.neutral },
    icon: { color: vars.color.semantic.feedback.positive.bold },
  },
  destructive: {
    surface: {
      backgroundColor: vars.color.semantic.feedback.destructive.alpha.subtlest,
      borderColor: vars.color.semantic.feedback.destructive.alpha.subtler,
      color: vars.color.semantic.object.bolder,
    },
    layer: { backgroundColor: vars.color.semantic.feedback.destructive.neutral },
    icon: { color: vars.color.semantic.feedback.destructive.bold },
  },
  notifying: {
    surface: {
      backgroundColor: vars.color.semantic.feedback.notifying.alpha.subtlest,
      borderColor: vars.color.semantic.feedback.notifying.alpha.subtler,
      color: vars.color.semantic.object.bolder,
    },
    layer: { backgroundColor: vars.color.semantic.feedback.notifying.static.inverse.bolder },
    icon: { color: vars.color.semantic.feedback.notifying.static.inverse.bold },
  },
} satisfies Record<CalloutFeedback, FeedbackStyle>;

const layerColorVar = createVar();

const feedbackVars = (feedback: CalloutFeedback) => {
  const { surface, layer } = feedbackStyles[feedback];
  return {
    ...surface,
    vars: {
      [titleColorVar]: surface.color,
      [labelColorVar]: surface.color,
      [layerColorVar]: layer.backgroundColor,
    },
  };
};

export const root = recipe({
  base: {
    position: "relative",
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    borderWidth: vars.scheme.semantic.strokeWeight["1"],
    borderStyle: "solid",
    borderRadius: vars.scheme.semantic.radius["8"],
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundColor: layerColorVar,
      opacity: `calc(${vars.scheme.semantic.opacity["5"]} / 100)`,
      pointerEvents: "none",
      zIndex: -10,
    },
  },
  variants: {
    size: {
      lg: {
        padding: `${vars.scheme.semantic.spacing["16"]} ${vars.scheme.semantic.spacing["20"]}`,
      },
      md: {
        padding: `${vars.scheme.semantic.spacing["16"]} ${vars.scheme.semantic.spacing["20"]}`,
      },
      sm: {
        padding: `${vars.scheme.semantic.spacing["16"]} ${vars.scheme.semantic.spacing["20"]}`,
      },
      xs: {
        padding: `${vars.scheme.semantic.spacing["12"]} ${vars.scheme.semantic.spacing["16"]}`,
      },
    } satisfies Record<CalloutSize, object>,
    feedback: {
      none: feedbackVars("none"),
      positive: feedbackVars("positive"),
      destructive: feedbackVars("destructive"),
      notifying: feedbackVars("notifying"),
    },
  },
});

export const content = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  variants: {
    size: {
      lg: { gap: vars.scheme.semantic.spacing["10"] },
      md: { gap: vars.scheme.semantic.spacing["10"] },
      sm: { gap: vars.scheme.semantic.spacing["8"] },
      xs: { gap: vars.scheme.semantic.spacing["8"] },
    } satisfies Record<CalloutSize, object>,
  },
});

export const titleWrap = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  variants: {
    size: {
      lg: { gap: vars.scheme.semantic.spacing["8"] },
      md: { gap: vars.scheme.semantic.spacing["8"] },
      sm: { gap: vars.scheme.semantic.spacing["6"] },
      xs: { gap: vars.scheme.semantic.spacing["6"] },
    } satisfies Record<CalloutSize, object>,
  },
});

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${vars.scheme.semantic.spacing["1"]} ${vars.scheme.semantic.spacing["0"]}`,
});

export const icon = recipe({
  variants: {
    feedback: {
      none: feedbackStyles.none.icon,
      positive: feedbackStyles.positive.icon,
      destructive: feedbackStyles.destructive.icon,
      notifying: feedbackStyles.notifying.icon,
    } satisfies Record<CalloutFeedback, FeedbackStyle["icon"]>,
  },
});

export const body = style({
  width: "100%",
  margin: 0,
  color: "inherit",
  overflowWrap: "break-word",
});

export const title = style({
  margin: 0,
  flex: 1,
  minWidth: 0,
  overflowWrap: "break-word",
});
