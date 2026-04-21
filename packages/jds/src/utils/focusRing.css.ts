import { style } from "@vanilla-extract/css";

import { vars } from "../tokens/vars.css";

export const focusRing = style({
  position: "relative",
  outline: "none",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: "none",
      pointerEvents: "none",
    },
    "&[data-focus-visible]::before": {
      boxShadow: `0 0 0 3px ${vars.color.semantic.interaction.focus}`,
    },
  },
});
