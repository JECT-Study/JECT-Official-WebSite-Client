import { style } from "@vanilla-extract/css";

import { vars } from "../tokens/vars.css";

export const focusRing = style({
  outline: "none",
  selectors: {
    "&[data-focus-visible]": {
      outline: `3px solid ${vars.color.semantic.interaction.focus}`,
      outlineOffset: "2px",
    },
  },
});
