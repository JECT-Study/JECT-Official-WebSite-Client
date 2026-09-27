import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { cellAppearances } from "./cell.variants";
import { vars } from "../../../../tokens/vars.css";
import { focusRing } from "../../../../utils/focusRing.css";
import { overlay, overlayColor } from "../../../../utils/overlay.css";

const cellLabelColor = createVar();

const cellOutlineWidth = vars.scheme.semantic.strokeWeight["1"];

const CELL_SIZE = 32;
const CELL_LABEL_WIDTH = 20;

export const cellSize = pxToRem(CELL_SIZE);

const baseStyles = style({
  position: "relative",
  boxSizing: "border-box",
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: cellSize,
  height: cellSize,
  padding: vars.scheme.semantic.spacing["6"],
  border: "none",
  borderRadius: vars.scheme.semantic.radius["6"],
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    "&::before, &::after": { inset: 0, borderRadius: "inherit" },
    "&[data-disabled]": { cursor: "not-allowed" },
  },
});

const appearanceCompoundVariants = cellAppearances.map(appearance => ({
  variants: {
    status: appearance.status,
    outsideMonth: appearance.outsideMonth,
    disabled: appearance.disabled,
  },
  style: {
    backgroundColor: appearance.background,
    outline: appearance.outline ? `${cellOutlineWidth} solid ${appearance.outline}` : "none",
    vars: {
      [cellLabelColor]: appearance.label,
      [overlayColor]: appearance.overlay,
    },
    ...(appearance.outline
      ? { selectors: { "&::before, &::after": { inset: `calc(${cellOutlineWidth} * -1)` } } }
      : {}),
  },
}));

export const root = recipe({
  base: [overlay({ density: "bold" }), focusRing({ border: "inside" }), baseStyles],
  variants: {
    status: { normal: {}, current: {}, selected: {} },
    outsideMonth: { true: {}, false: {} },
    disabled: { true: {}, false: {} },
  },
  compoundVariants: appearanceCompoundVariants,
});

export const label = style({
  width: pxToRem(CELL_LABEL_WIDTH),
  textAlign: "center",
  color: cellLabelColor,
});
