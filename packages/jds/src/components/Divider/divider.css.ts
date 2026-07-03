import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../tokens/vars.css";

const thickness = createVar();
const lineStyle = createVar();

/**
 * Divider 색상을 소비처에서 오버라이드하기 위한 CSS 변수.
 *
 * 값을 주입하지 않으면 Divider의 기본 stroke 색상으로 fallback된다.
 */
export const dividerColor = createVar();

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
        height: 0,
        borderTop: `${thickness} ${lineStyle} ${fallbackVar(dividerColor, vars.color.semantic.stroke.alpha.assistive)}`,
      },
      vertical: {
        width: 0,
        height: "100%",
        alignSelf: "stretch",
        borderLeft: `${thickness} ${lineStyle} ${fallbackVar(dividerColor, vars.color.semantic.stroke.alpha.assistive)}`,
      },
    },
    thickness: {
      normal: { vars: { [thickness]: "1px" } },
      bold: { vars: { [thickness]: "2px" } },
      bolder: { vars: { [thickness]: "4px" } },
      boldest: { vars: { [thickness]: "8px" } },
    },
    variant: {
      solid: { vars: { [lineStyle]: "solid" } },
      dashed: { vars: { [lineStyle]: "dashed" } },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    thickness: "normal",
    variant: "solid",
  },
});
