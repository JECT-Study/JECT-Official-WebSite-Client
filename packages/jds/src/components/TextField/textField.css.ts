import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";

const inputTextColor = createVar();

export const input = style({
  flex: "1 0 0",
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  color: fallbackVar(inputTextColor, vars.color.semantic.object.boldest),
  "::placeholder": {
    color: vars.color.semantic.object.assistive,
  },
  selectors: {
    "&[data-readonly]:not(:disabled)": {
      vars: { [inputTextColor]: vars.color.semantic.object.subtle },
    },
    "&:disabled": {
      vars: { [inputTextColor]: vars.color.semantic.object.assistive },
    },
  },
});
