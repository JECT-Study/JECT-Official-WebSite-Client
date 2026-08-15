import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";

const inputTextColor = createVar();
const placeholderTextColor = createVar();

export const input = style({
  flex: "1 0 0",
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  color: fallbackVar(inputTextColor, vars.color.semantic.object.bolder),
  "::placeholder": {
    color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
  },
  selectors: {
    "&[data-readonly]:not(:disabled)": {
      cursor: "default",
    },
    "&:disabled": {
      cursor: "not-allowed",
      vars: {
        [inputTextColor]: vars.color.semantic.object.assistive,
        [placeholderTextColor]: vars.color.semantic.object.subtler,
      },
    },
  },
});
