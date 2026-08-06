import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";

const triggerTextColor = createVar();
const placeholderTextColor = createVar();
const indicatorIconColor = createVar();

export const trigger = style({
  display: "flex",
  alignItems: "center",
  flex: "1 0 0",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["8"],
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  cursor: "pointer",
  textAlign: "left",
  color: fallbackVar(triggerTextColor, vars.color.semantic.object.bolder),
  selectors: {
    "&[data-readonly]:not(:disabled)": {
      cursor: "default",
      vars: {
        [indicatorIconColor]: vars.color.semantic.object.subtler,
      },
    },
    "&:disabled": {
      cursor: "not-allowed",
      vars: {
        [triggerTextColor]: vars.color.semantic.object.assistive,
        [placeholderTextColor]: vars.color.semantic.object.subtler,
        [indicatorIconColor]: vars.color.semantic.object.subtler,
      },
    },
  },
});

export const value = style({
  flex: "1 0 0",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "inherit",
  selectors: {
    "&&": {
      display: "block",
      cursor: "inherit",
    },
    "&[data-placeholder]": {
      color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
    },
  },
});

export const popup = style({
  minWidth: "var(--radix-popover-trigger-width)",
  maxHeight: "var(--radix-popover-content-available-height)",
  zIndex: vars.environment.semantic.zIndex.floated,
});

export const indicator = style({
  display: "inline-flex",
  flexShrink: 0,
  color: fallbackVar(indicatorIconColor, vars.color.semantic.object.assistive),
  transition: `transform ${vars.environment.semantic.duration["100"]} ${vars.environment.semantic.motion.fluent}`,
  selectors: {
    "[data-open] &": {
      transform: "rotate(180deg)",
    },
  },
});
