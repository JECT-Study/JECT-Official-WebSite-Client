import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { CalloutFeedback, CalloutSize } from "./Callout.types";

const feedbackStyles = {
  none: {
    backgroundColor: vars.color.semantic.fill.subtlest,
    borderColor: vars.color.semantic.stroke.alpha.subtler,
    color: vars.color.semantic.object.bold,
  },
  positive: {
    backgroundColor: vars.color.semantic.feedback.positive.alpha.subtlest,
    borderColor: vars.color.semantic.feedback.positive.alpha.subtler,
    color: vars.color.semantic.object.bolder,
  },
  destructive: {
    backgroundColor: vars.color.semantic.feedback.destructive.alpha.subtlest,
    borderColor: vars.color.semantic.feedback.destructive.alpha.subtler,
    color: vars.color.semantic.object.bolder,
  },
  notifying: {
    backgroundColor: vars.color.semantic.feedback.notifying.alpha.subtlest,
    borderColor: vars.color.semantic.feedback.notifying.alpha.subtler,
    color: vars.color.semantic.object.bolder,
  },
} satisfies Record<CalloutFeedback, object>;

export const root = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: vars.scheme.semantic.spacing["16"],
    width: "100%",
    overflow: "hidden",
    borderWidth: vars.scheme.semantic.strokeWeight["1"],
    borderStyle: "solid",
    borderRadius: vars.scheme.semantic.radius["8"],
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
    feedback: feedbackStyles,
  },
  defaultVariants: {
    size: "md",
    feedback: "none",
  },
});

export const adjustmentLayer = recipe({
  base: {
    position: "absolute",
    inset: "-1px",
    pointerEvents: "none",
    opacity: `calc(${vars.scheme.semantic.opacity["5"]} / 100)`,
  },
  variants: {
    feedback: {
      none: { backgroundColor: vars.color.semantic.fill.subtlest },
      positive: { backgroundColor: vars.color.semantic.feedback.positive.neutral },
      destructive: { backgroundColor: vars.color.semantic.feedback.destructive.neutral },
      notifying: { backgroundColor: vars.color.semantic.feedback.notifying.static.inverse.bolder },
    } satisfies Record<CalloutFeedback, object>,
  },
  defaultVariants: {
    feedback: "none",
  },
});

export const content = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  variants: {
    size: {
      lg: { gap: vars.scheme.semantic.spacing["10"] },
      md: { gap: vars.scheme.semantic.spacing["10"] },
      sm: { gap: vars.scheme.semantic.spacing["6"] },
      xs: { gap: vars.scheme.semantic.spacing["6"] },
    } satisfies Record<CalloutSize, object>,
  },
  defaultVariants: {
    size: "md",
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
  defaultVariants: {
    size: "md",
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
      none: { color: vars.color.semantic.object.bold },
      positive: { color: vars.color.semantic.feedback.positive.bold },
      destructive: { color: vars.color.semantic.feedback.destructive.bold },
      notifying: { color: vars.color.semantic.feedback.notifying.static.inverse.bold },
    } satisfies Record<CalloutFeedback, object>,
  },
  defaultVariants: {
    feedback: "none",
  },
});

const text = style({
  width: "100%",
  margin: 0,
  color: "inherit",
  wordBreak: "break-word",
});

const titleText = style([
  text,
  {
    flex: 1,
    minWidth: 0,
  },
]);

export const title = recipe({
  base: titleText,
  variants: {
    size: {
      lg: "semantic-textStyle-title-1",
      md: "semantic-textStyle-label-lg-bold",
      sm: "semantic-textStyle-label-md-bold",
      xs: "semantic-textStyle-label-sm-bold",
    } satisfies Record<CalloutSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

export const body = recipe({
  base: text,
  variants: {
    size: {
      lg: "semantic-textStyle-body-lg-normal",
      md: "semantic-textStyle-body-md-normal",
      sm: "semantic-textStyle-body-sm-normal",
      xs: "semantic-textStyle-body-2xs-normal",
    } satisfies Record<CalloutSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
