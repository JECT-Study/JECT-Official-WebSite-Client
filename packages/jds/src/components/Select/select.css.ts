import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { overlay } from "utils";

import { labelColorVar } from "@/utils/typography.css";

export const selectContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  flexShrink: 0,
  padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["4"]}`,
  gap: vars.scheme.semantic.spacing["4"],
  borderRadius: vars.scheme.semantic.radius["8"],
  border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  backgroundColor: vars.color.semantic.surface.shallow,
  boxShadow: `0 0 ${vars.scheme.semantic.radius["2"]} 0 ${vars.colorPrimitive.primitive.shade["4"]}, 0 ${vars.scheme.semantic.spacing["3"]} ${vars.scheme.semantic.radius["4"]} 0 ${vars.colorPrimitive.primitive.shade["8"]}, 0 ${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.radius["8"]} 0 ${vars.colorPrimitive.primitive.shade["12"]}`,
  overflow: "hidden",
});

export const selectLabel = style({
  display: "flex",
  alignItems: "center",
  alignSelf: "stretch",
  padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]} 0`,
  vars: { [labelColorVar]: vars.color.semantic.object.alternative },
});

export const listbox = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignSelf: "stretch",
  minHeight: 0,
  columnGap: 0,
  rowGap: vars.scheme.semantic.spacing["4"],
  overflowY: "auto",
  outline: "none",
});

export const option = style([
  overlay(),
  {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "subgrid",
    alignItems: "center",
    rowGap: vars.scheme.semantic.spacing["2"],
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
    position: "relative",
    cursor: "pointer",
    userSelect: "none",
    selectors: {
      "&::after": { inset: 0, borderRadius: "inherit" },
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
      },
      '[role="listbox"]:focus-visible &[data-active]:not([data-disabled])::before': {
        boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
        zIndex: 1,
      },
      "&[data-disabled]": { cursor: "not-allowed" },
    },
  },
]);

export const optionControlSlot = style({
  gridColumn: "1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginInlineEnd: vars.scheme.semantic.spacing["10"],
});

export const optionTrailing = style({
  gridColumn: "3",
  gridRow: "1",
  marginInlineStart: vars.scheme.semantic.spacing["12"],
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: vars.scheme.semantic.spacing["8"],
  flexShrink: 0,
});

export const optionText = style({
  gridColumn: "2",
  gridRow: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
  vars: { [labelColorVar]: vars.color.semantic.object.bold },
  selectors: {
    "&&": {
      display: "block",
    },
    '[data-variant="label"][data-selected]:not([data-disabled]) &': {
      vars: { [labelColorVar]: vars.color.semantic.accent.normal },
    },
    "[data-disabled] &": {
      vars: { [labelColorVar]: vars.color.semantic.object.subtle },
    },
    '[data-variant="label"][data-selected][data-disabled] &': {
      vars: { [labelColorVar]: vars.color.semantic.accent.alpha.subtle },
    },
  },
});

export const optionCaption = style({
  gridColumn: "2 / -1",
  gridRow: "2",
  vars: { [labelColorVar]: vars.color.semantic.object.assistive },
  selectors: {
    "[data-disabled] &": {
      vars: { [labelColorVar]: vars.color.semantic.object.subtle },
    },
  },
});

export const optionCheck = style({
  display: "inline-flex",
  flexShrink: 0,
  color: vars.color.semantic.accent.normal,
  selectors: {
    "[data-disabled] &": {
      color: vars.color.semantic.accent.alpha.subtle,
    },
  },
});
