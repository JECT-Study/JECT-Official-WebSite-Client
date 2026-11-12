import { createVar, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { textStyles, vars } from "tokens";

import type { SegmentedControlsSize } from "./segmentedControls.types";
import { focusRing } from "../../utils/focusRing.css";
import { overlay } from "../../utils/overlay.css";

export const root = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.scheme.semantic.spacing["2"],
    minWidth: 0,
    width: "100%",
    background: vars.color.semantic.fill.subtlest,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
    borderRadius: vars.scheme.semantic.radius["8"],
    padding: vars.scheme.semantic.spacing["2"],
  },
});

const itemBorderColor = createVar();

export const item = recipe({
  base: [
    overlay({ density: "normal", hierarchy: "secondary" }),
    focusRing(),
    {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      minWidth: 0,
      gap: vars.scheme.semantic.spacing["4"],
      border: "none",
      borderRadius: vars.scheme.semantic.radius["6"],
      background: "transparent",
      color: vars.color.semantic.object.alternative,
      cursor: "pointer",
      fontFamily: "inherit",
      userSelect: "none",
      vars: { [itemBorderColor]: vars.color.semantic.stroke.alpha.subtle },
      selectors: {
        "&::before, &::after": {
          inset: 0,
          borderRadius: "inherit",
        },
        // 선택된 항목의 테두리가 박스 크기를 늘리지 않도록 inset box-shadow로 안쪽에 그린다.
        '&[data-state="checked"]': {
          background: vars.color.semantic.surface.shallowest,
          boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${itemBorderColor}, ${vars.environment.semantic.shadow.embossed}`,
          color: vars.color.semantic.object.bolder,
        },
        "&:disabled, &[data-disabled]": {
          color: vars.color.semantic.object.subtle,
          cursor: "not-allowed",
        },
        '&[data-state="checked"]:disabled, &[data-state="checked"][data-disabled]': {
          background: vars.color.semantic.surface.shallower,
          vars: { [itemBorderColor]: vars.color.semantic.stroke.alpha.subtler },
        },
      },
      "@media": {
        // 고대비 모드는 box-shadow를 지우므로 선택된 항목의 테두리를 되살린다.
        // 선택이 바뀔 때 항목 크기가 달라지지 않도록 border 대신 안쪽으로 당긴 outline을 쓴다.
        "(forced-colors: active)": {
          selectors: {
            '&[data-state="checked"]': {
              outline: `${vars.scheme.semantic.strokeWeight["1"]} solid currentColor`,
              outlineOffset: `calc(${vars.scheme.semantic.strokeWeight["1"]} * -1)`,
            },
          },
        },
      },
    },
  ],
  variants: {
    size: {
      lg: {
        padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["16"]}`,
      },
      md: {
        padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
      },
      sm: {
        padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
      },
      xs: {
        padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
      },
    } satisfies Record<SegmentedControlsSize, object>,
  },
});

export const itemLabel = recipe({
  base: {
    flex: "1 0 0",
    minWidth: 0,
    overflow: "hidden",
    color: "inherit",
    cursor: "inherit",
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      lg: textStyles.label.lg.normal,
      md: textStyles.label.md.normal,
      sm: textStyles.label.sm.normal,
      xs: textStyles.label.xs.normal,
    } satisfies Record<SegmentedControlsSize, StyleRule>,
  },
});
