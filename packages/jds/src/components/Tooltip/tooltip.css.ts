import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../tokens/vars.css";
import { pxToRem } from "../../utils/cssUnit";

const tooltipFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const tooltipFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const tooltipTransition = `${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.fluent}`;

export const contentTextStyle = "semantic-textStyle-body-sm-normal";

export const content = style({
  backgroundColor: vars.color.semantic.fill.boldest,
  color: vars.color.semantic.object.inverse.boldest,
  padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
  borderRadius: vars.scheme.semantic.radius["8"],
  maxWidth: pxToRem(320),
  overflowWrap: "break-word",
  zIndex: 9999,
  boxShadow: vars.environment.semantic.shadow.overlay,

  selectors: {
    '&[data-state="delayed-open"]': {
      animation: `${tooltipFadeIn} ${tooltipTransition}`,
    },
    '&[data-state="instant-open"]': {
      animation: `${tooltipFadeIn} ${tooltipTransition}`,
    },
    '&[data-state="closed"]': {
      animation: `${tooltipFadeOut} ${tooltipTransition}`,
    },
  },
});
