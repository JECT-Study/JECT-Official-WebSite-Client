import { createVar, style } from "@vanilla-extract/css";

import { vars } from "../tokens/vars.css";

export const overlayColor = createVar();

export const overlay = style({
  position: "relative",
  outline: "none",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundColor: overlayColor,
      opacity: 0,
      pointerEvents: "none",
      transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
    },
    "&[data-hovered]::after": { opacity: 0.08 },
    "&[data-pressed]::after": { opacity: 0.12 },
    "&[data-disabled]::after": { opacity: 0.05, transition: "none" },
  },
});
