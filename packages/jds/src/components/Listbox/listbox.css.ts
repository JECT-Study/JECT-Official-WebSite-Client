import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { overlay } from "utils";

import { virtualFocusSelector } from "@/utils/virtualFocus";

export const selectContainer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexShrink: 0,
    gap: vars.scheme.semantic.spacing["4"],
    overflow: "hidden",
  },
  variants: {
    surface: {
      true: {
        padding: vars.scheme.semantic.spacing["10"],
        borderRadius: vars.scheme.semantic.radius["8"],
        backgroundColor: vars.color.semantic.surface.shallow,
        // 테두리가 박스 크기를 늘리지 않도록 inset box-shadow로 안쪽에 그린다.
        boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${vars.color.semantic.stroke.subtle}, ${vars.environment.semantic.shadow.floated}`,
        "@media": {
          // 고대비 모드는 box-shadow를 지우므로 테두리를 border로 되살린다.
          "(forced-colors: active)": {
            border: `${vars.scheme.semantic.strokeWeight["1"]} solid currentColor`,
          },
        },
      },
      false: {},
    },
  },
});

export const selectLabel = style({
  display: "flex",
  alignItems: "center",
  cursor: "default",
  alignSelf: "stretch",
  padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]} 0`,
  color: vars.color.semantic.object.alternative,
});

export const listbox = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignSelf: "stretch",
  minHeight: 0,
  columnGap: 0,
  rowGap: vars.scheme.semantic.spacing["4"],
  overflowY: "auto",
  overscrollBehavior: "contain",
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
      [`:is([role="listbox"]:focus-visible, [role="listbox"]${virtualFocusSelector}) &[data-active]:not([data-disabled])::before`]:
        {
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
  display: "block",
  cursor: "inherit",
  gridColumn: "2",
  gridRow: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
  color: vars.color.semantic.object.bold,
  selectors: {
    '[data-variant="label"][data-selected]:not([data-disabled]) &': {
      color: vars.color.semantic.accent.normal,
    },
    "[data-disabled] &": {
      color: vars.color.semantic.object.subtle,
    },
    '[data-variant="label"][data-selected][data-disabled] &': {
      color: vars.color.semantic.accent.alpha.subtle,
    },
  },
});

export const optionCaption = style({
  display: "flex",
  alignItems: "center",
  cursor: "inherit",
  gridColumn: "2 / -1",
  gridRow: "2",
  color: vars.color.semantic.object.assistive,
  selectors: {
    "[data-disabled] &": {
      color: vars.color.semantic.object.subtle,
    },
  },
});

export const customValueText = style({
  gridColumn: "1 / 3",
});

export const customValueCaption = style({
  gridColumn: "1 / -1",
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
