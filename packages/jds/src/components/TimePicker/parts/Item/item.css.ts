import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { vars } from "../../../../tokens/vars.css";
import { overlay, overlayHoverOpacity } from "../../../../utils/overlay.css";
import { virtualFocusSelector } from "../../../../utils/virtualFocus";
import { COLUMN_SCROLLING_ATTRIBUTE } from "../../timePicker.constants";

const itemLabelColor = createVar();

const statusTransitionTiming = `${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`;

const ITEM_MIN_WIDTH = 42;

const itemPaddingBlock = vars.scheme.semantic.spacing["6"];

/** 항목 한 칸의 높이. Column 끝 여백 계산에도 사용합니다. */
export const itemHeight = `calc(${vars.typo.primitive.font.lineHeight.label.md} + 2 * ${itemPaddingBlock})`;

const baseStyles = style({
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  minWidth: pxToRem(ITEM_MIN_WIDTH),
  padding: `${itemPaddingBlock} ${vars.scheme.semantic.spacing["12"]}`,
  borderRadius: vars.scheme.semantic.radius["6"],
  color: itemLabelColor,
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  transition: `background-color ${statusTransitionTiming}, color ${statusTransitionTiming}`,
  selectors: {
    "&::after": { inset: 0, borderRadius: "inherit" },
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      pointerEvents: "none",
    },
    [`:is([role="listbox"]:focus-visible, [role="listbox"]${virtualFocusSelector}) &[data-active]::before`]:
      {
        boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
        zIndex: 1,
      },
    "&[data-disabled]": { cursor: "not-allowed" },
    [`[${COLUMN_SCROLLING_ATTRIBUTE}] &`]: { vars: { [overlayHoverOpacity]: "0" } },
  },
});

export const root = recipe({
  base: baseStyles,
  variants: {
    selected: {
      true: [
        overlay({ hierarchy: "secondary", density: "normal" }),
        {
          backgroundColor: vars.color.semantic.accent.alpha.subtlest,
          vars: { [itemLabelColor]: vars.color.semantic.accent.normal },
        },
      ],
      false: [
        overlay({ hierarchy: "secondary", density: "bold" }),
        { vars: { [itemLabelColor]: vars.color.semantic.object.bolder } },
      ],
    },
    disabled: { true: {}, false: {} },
  },
  compoundVariants: [
    {
      variants: { selected: false, disabled: true },
      style: { vars: { [itemLabelColor]: vars.color.semantic.object.subtle } },
    },
    {
      variants: { selected: true, disabled: true },
      style: { vars: { [itemLabelColor]: vars.color.semantic.accent.alpha.subtle } },
    },
  ],
});
