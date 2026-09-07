import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

const tooltipFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const tooltipFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const tooltipTransition = `${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.fluent}`;

export const content = style({
  display: "flex",
  alignItems: "center",
  cursor: "default",
  color: vars.color.semantic.object.inverse.boldest,
  backgroundColor: vars.color.semantic.fill.boldest,
  padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
  borderRadius: vars.scheme.semantic.radius["8"],
  maxWidth: pxToRem(280),
  overflowWrap: "break-word",
  textAlign: "center",
  zIndex: vars.environment.semantic.zIndex.floated,
  boxShadow: vars.environment.semantic.shadow.overlay,

  selectors: {
    '&[data-state="delayed-open"], &[data-state="instant-open"]': {
      animation: `${tooltipFadeIn} ${tooltipTransition}`,
    },
    '&[data-state="closed"]': {
      animation: `${tooltipFadeOut} ${tooltipTransition}`,
    },
  },
});
