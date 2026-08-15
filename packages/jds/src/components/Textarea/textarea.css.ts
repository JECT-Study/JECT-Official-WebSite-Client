import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";

const textColor = createVar();
const placeholderTextColor = createVar();

export const control = style({
  display: "block",
  width: "100%",
  minWidth: 0,
  minHeight: "3rem",
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  resize: "vertical",
  position: "relative",
  zIndex: 1,
  color: fallbackVar(textColor, vars.color.semantic.object.bolder),
  "::placeholder": {
    color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
  },
  selectors: {
    "&[data-readonly]:not(:disabled)": {
      resize: "none",
      cursor: "default",
    },
    "&:disabled": {
      resize: "none",
      cursor: "not-allowed",
      vars: {
        [textColor]: vars.color.semantic.object.assistive,
        [placeholderTextColor]: vars.color.semantic.object.subtler,
      },
    },
  },
});

export const counter = style({
  whiteSpace: "nowrap",
  flexShrink: 0,
  marginInlineStart: "auto",
});
