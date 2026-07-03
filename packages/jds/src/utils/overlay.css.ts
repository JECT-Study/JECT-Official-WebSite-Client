import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../tokens/vars.css";

export type OverlayDensity = "normal" | "bold";
export type OverlayHierarchy = "accent" | "primary" | "secondary" | "tertiary";

export const overlayColorMap = {
  accent: vars.color.semantic.accent.normal,
  primary: vars.color.semantic.fill.boldest,
  secondary: vars.color.semantic.fill.bold,
  tertiary: vars.color.semantic.fill.normal,
} satisfies Record<OverlayHierarchy, string>;

export const overlayOpacityMap = {
  normal: {
    hover: `calc(${vars.scheme.semantic.opacity["5"]} / 100)`,
    pressed: `calc(${vars.scheme.semantic.opacity["8"]} / 100)`,
  },
  bold: {
    hover: `calc(${vars.scheme.semantic.opacity["8"]} / 100)`,
    pressed: `calc(${vars.scheme.semantic.opacity["12"]} / 100)`,
  },
} satisfies Record<OverlayDensity, { hover: string; pressed: string }>;

/**
 * @description
 * overlay 색상 — 호출자가 hierarchy 등 컨텍스트에 맞게 할당
 */
export const overlayColor = createVar();

/**
 * @description
 * hover / pressed opacity — 외부 override 가능 (기본 bold: 0.08 / 0.12)
 */
export const overlayHoverOpacity = createVar();
export const overlayPressedOpacity = createVar();

// hover는 fine pointer에서만 반응한다 (터치 환경의 sticky hover를 방지)
const hoverSelector = "&:hover:not(:disabled):not([data-disabled])::after";
const pressedSelector = "&:active:not(:disabled):not([data-disabled])::after";

/**
 * @description
 * hover / pressed 상태에서 ::after에 색상 overlay를 표시한다. 상태는 순수 CSS
 * 의사클래스(`:hover` / `:active`)로 구동되며, JS 인터랙션 훅에 의존하지 않는다.
 *
 * 이 유틸은 ::after를 hover / pressed overlay 전용으로 점유한다. 인터랙티브
 * 컴포넌트의 ::after에 다른 용도(divider/arrow/shimmer 등)를 추가 점유하면
 * overlay가 가려진다. 비인터랙티브 시각 효과는 별도 element로 표현해야 한다.
 *
 * `data-disabled`(또는 native `:disabled`)가 있으면 overlay는 표시되지 않는다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md — pseudo-element 자원 할당 정책
 *
 * @requires
 * - 호출자는 element에 `position: relative`(또는 다른 positioned 값)를 부여해야 한다.
 * - 호출자는 `&::after`에 inset과 borderRadius를 직접 지정해야 한다.
 * - disabled 상태를 표시할 때는 element에 `data-disabled` 속성을 부여한다(native
 *   `<button disabled>`처럼 `:disabled`가 걸리는 경우는 자동으로 차단된다).
 *
 * @example
 *   overlay()
 *   overlay({ density: "normal", hierarchy: "secondary" })
 */
export const overlay = recipe({
  base: {
    selectors: {
      "&::after": {
        content: '""',
        position: "absolute",
        pointerEvents: "none",
        backgroundColor: fallbackVar(overlayColor, overlayColorMap.primary),
        opacity: 0,
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },
      // pressed는 즉각 반응이 자연스러워 transition을 끈다
      [pressedSelector]: {
        opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
        transition: "none",
      },
    },
    "@media": {
      "(hover: hover) and (pointer: fine)": {
        selectors: {
          [hoverSelector]: {
            opacity: fallbackVar(overlayHoverOpacity, overlayOpacityMap.bold.hover),
          },
          [pressedSelector]: {
            opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
            transition: "none",
          },
        },
      },
    },
  },
  variants: {
    hierarchy: {
      accent: { vars: { [overlayColor]: overlayColorMap.accent } },
      primary: { vars: { [overlayColor]: overlayColorMap.primary } },
      secondary: { vars: { [overlayColor]: overlayColorMap.secondary } },
      tertiary: { vars: { [overlayColor]: overlayColorMap.tertiary } },
    } satisfies Record<OverlayHierarchy, object>,
    density: {
      normal: {
        vars: {
          [overlayHoverOpacity]: overlayOpacityMap.normal.hover,
          [overlayPressedOpacity]: overlayOpacityMap.normal.pressed,
        },
      },
      bold: {
        vars: {
          [overlayHoverOpacity]: overlayOpacityMap.bold.hover,
          [overlayPressedOpacity]: overlayOpacityMap.bold.pressed,
        },
      },
    } satisfies Record<OverlayDensity, object>,
  },
});
