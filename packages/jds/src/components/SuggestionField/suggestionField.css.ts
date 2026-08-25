import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

const inputTextColor = createVar();
const placeholderTextColor = createVar();

const INPUT_WRAP_THRESHOLD = pxToRem(100);

export const content = style({
  flexWrap: "wrap",
});

export const input = style({
  flex: `1 1 ${INPUT_WRAP_THRESHOLD}`,
  minWidth: INPUT_WRAP_THRESHOLD,
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  textOverflow: "ellipsis",
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

export const tag = style({
  flexShrink: 0,
  maxWidth: "100%",
});

export const suffix = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
});

export const popup = style({
  minWidth: "var(--radix-popover-trigger-width)",
  maxHeight: "var(--radix-popover-content-available-height)",
  zIndex: vars.environment.semantic.zIndex.floated,
});

export const counter = style({
  whiteSpace: "nowrap",
  flexShrink: 0,
  marginInlineStart: "auto",
});
