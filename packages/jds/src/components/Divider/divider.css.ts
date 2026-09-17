import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../tokens/vars.css";

const thickness = createVar();

/**
 * Divider 색상을 소비처에서 오버라이드하기 위한 CSS 변수.
 *
 * 값을 주입하지 않으면 Divider의 기본 stroke 색상으로 fallback된다.
 */
export const dividerColorVar = createVar();
export const dividerDashLengthVar = createVar();
export const dividerDashGapVar = createVar();

export const DEFAULT_DASH_LENGTH = 6;

const lineColor = fallbackVar(dividerColorVar, vars.color.semantic.stroke.alpha.assistive);
const dashLengthInput = fallbackVar(dividerDashLengthVar, `${DEFAULT_DASH_LENGTH}px`);
const dashLength = `max(1px, ${dashLengthInput})`;
const dashGap = `max(0px, ${fallbackVar(dividerDashGapVar, dashLengthInput)})`;

const dashedLine = (direction: "to right" | "to bottom") =>
  `repeating-linear-gradient(${direction}, ${lineColor} 0 ${dashLength}, transparent ${dashLength} calc(${dashLength} + ${dashGap}))`;

export const divider = recipe({
  base: {
    border: "none",
    margin: 0,
    padding: 0,
  },
  variants: {
    orientation: {
      horizontal: {
        width: "100%",
        height: thickness,
      },
      vertical: {
        width: thickness,
        height: "100%",
        alignSelf: "stretch",
      },
    },
    thickness: {
      normal: { vars: { [thickness]: "1px" } },
      bold: { vars: { [thickness]: "2px" } },
      bolder: { vars: { [thickness]: "4px" } },
      boldest: { vars: { [thickness]: "8px" } },
    },
    variant: {
      solid: { backgroundColor: lineColor },
      dashed: {},
    },
  },
  compoundVariants: [
    {
      variants: { orientation: "horizontal", variant: "dashed" },
      style: { backgroundImage: dashedLine("to right") },
    },
    {
      variants: { orientation: "vertical", variant: "dashed" },
      style: { backgroundImage: dashedLine("to bottom") },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    thickness: "normal",
    variant: "solid",
  },
});
