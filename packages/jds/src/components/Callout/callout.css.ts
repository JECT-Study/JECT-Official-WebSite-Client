import { createVar, style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { CalloutFeedback, CalloutSize } from "./callout.types";

const layerColorVar = createVar();
const iconColorVar = createVar();

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
    } satisfies Record<CalloutSize, StyleRule>,
    feedback: {
      none: {
        backgroundColor: vars.color.semantic.fill.subtlest,
        borderColor: vars.color.semantic.stroke.alpha.subtler,
        color: vars.color.semantic.object.bold,
        vars: {
          [layerColorVar]: vars.color.semantic.fill.subtlest,
          [iconColorVar]: vars.color.semantic.object.bold,
        },
      },
      positive: {
        backgroundColor: vars.color.semantic.feedback.positive.alpha.subtlest,
        borderColor: vars.color.semantic.feedback.positive.alpha.subtler,
        color: vars.color.semantic.object.bolder,
        vars: {
          [layerColorVar]: vars.color.semantic.feedback.positive.neutral,
          [iconColorVar]: vars.color.semantic.feedback.positive.bold,
        },
      },
      destructive: {
        backgroundColor: vars.color.semantic.feedback.destructive.alpha.subtlest,
        borderColor: vars.color.semantic.feedback.destructive.alpha.subtler,
        color: vars.color.semantic.object.bolder,
        vars: {
          [layerColorVar]: vars.color.semantic.feedback.destructive.neutral,
          [iconColorVar]: vars.color.semantic.feedback.destructive.bold,
        },
      },
      notifying: {
        backgroundColor: vars.color.semantic.feedback.notifying.alpha.subtlest,
        borderColor: vars.color.semantic.feedback.notifying.alpha.subtler,
        color: vars.color.semantic.object.bolder,
        vars: {
          [layerColorVar]: vars.color.semantic.feedback.notifying.static.inverse.bolder,
          [iconColorVar]: vars.color.semantic.feedback.notifying.static.inverse.bold,
        },
      },
    } satisfies Record<CalloutFeedback, StyleRule>,
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
    } satisfies Record<CalloutSize, StyleRule>,
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
    } satisfies Record<CalloutSize, StyleRule>,
  },
});

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${vars.scheme.semantic.spacing["1"]} ${vars.scheme.semantic.spacing["0"]}`,
});

export const icon = style({
  color: iconColorVar,
});

export const body = style({
  width: "100%",
  margin: 0,
  color: "inherit",
  overflowWrap: "break-word",
});

export const title = style({
  display: "flex",
  alignItems: "center",
  color: "inherit",
  cursor: "default",
  margin: 0,
  flex: 1,
  minWidth: 0,
  overflowWrap: "break-word",
});
