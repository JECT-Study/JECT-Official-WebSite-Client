import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../tokens/vars.css";

export type FocusRingBorder = "outside" | "inside";
export type FocusRingFeedback = "none" | "destructive" | "positive";

const FOCUS_RING_WIDTH = vars.scheme.semantic.strokeWeight["2"];
const focusVisibleSelector = "&[data-focus-visible]::before, &:focus-visible::before";
const focusRingColor = createVar();

const focusRingColorMap = {
  none: vars.color.semantic.accent.alpha.alternative,
  destructive: vars.color.semantic.feedback.destructive.alpha.alternative,
  positive: vars.color.semantic.feedback.positive.alpha.alternative,
} satisfies Record<FocusRingFeedback, string>;

/**
 * @description
 * focus-visible 상태에서 ::before에 box-shadow ring을 그린다.
 * 브라우저 기본 outline은 비활성화되어 box-shadow가 단일 focus 시각화 책임을 진다.
 *
 * 이 유틸은 ::before를 focus ring 전용으로 점유한다. 인터랙티브 컴포넌트의
 * ::before에 다른 용도(divider/arrow/shimmer 등)를 추가 점유하면 focus ring이
 * 가려진다. 비인터랙티브 시각 효과는 별도 element로 표현해야 한다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md — pseudo-element 자원 할당 정책
 *
 * @requires
 * - 호출자는 element에 `position: relative`(또는 다른 positioned 값)를 부여해야 한다.
 *   ::before가 position: absolute이므로 positioned ancestor가 없으면 viewport 기준으로 잡힌다.
 * - 호출자는 `&::before`에 inset과 borderRadius를 직접 지정해야 한다.
 *   focus ring이 둘러쌀 영역(element 외경 vs 확장된 탭 영역)은 컴포넌트 컨텍스트에 따라
 *   다르므로 이 유틸이 가정하지 않는다.
 *
 * @example
 *   focusRing()
 *   focusRing({ border: "inside", feedback: "destructive" })
 */
export const focusRing = recipe({
  base: {
    outline: "none",
    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        pointerEvents: "none",
      },
      [focusVisibleSelector]: {
        // overlay(::after)는 ::before 다음에 그려지므로 기본 stacking에서 위에 온다.
        // condensed 모드에서 ::before/::after가 같은 영역을 점유할 때 hover+focus 동시 발생 시
        // overlay가 focus ring 가장자리를 덮는 시각 버그를 방지하기 위해 ::before를 위로 올린다.
        zIndex: 1,
      },
    },
  },
  variants: {
    border: {
      outside: {
        selectors: {
          [focusVisibleSelector]: {
            boxShadow: `0 0 0 ${FOCUS_RING_WIDTH} ${focusRingColor}`,
          },
        },
      },
      inside: {
        selectors: {
          [focusVisibleSelector]: {
            boxShadow: `inset 0 0 0 ${FOCUS_RING_WIDTH} ${focusRingColor}`,
          },
        },
      },
    } satisfies Record<FocusRingBorder, object>,
    feedback: {
      none: {
        vars: { [focusRingColor]: focusRingColorMap.none },
      },
      destructive: {
        vars: { [focusRingColor]: focusRingColorMap.destructive },
      },
      positive: {
        vars: { [focusRingColor]: focusRingColorMap.positive },
      },
    } satisfies Record<FocusRingFeedback, object>,
  },
  defaultVariants: {
    border: "outside",
    feedback: "none",
  },
});
