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
  textOverflow: "ellipsis",
  color: fallbackVar(inputTextColor, vars.color.semantic.object.bolder),
  "::placeholder": {
    color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
  },
  selectors: {
    "&:read-only:not(:disabled)": {
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

export const indicator = style({
  display: "inline-flex",
  flexShrink: 0,
  color: vars.color.semantic.object.assistive,
  transition: `transform ${vars.environment.semantic.duration["100"]} ${vars.environment.semantic.motion.fluent}`,
  selectors: {
    "[data-disabled] &": {
      color: vars.color.semantic.object.subtler,
    },
    "[data-open] &": {
      transform: "rotate(180deg)",
    },
  },
});
