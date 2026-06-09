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
 *
 * destructive에서 hover만 진하게, light/dark에서 opacity 차이 등의
 * 사용처별 변형이 필요할 때 사용처에서 assignInlineVars로 덮는다.
 */
export const overlayHoverOpacity = createVar();
export const overlayPressedOpacity = createVar();

const hoverSelector =
  "&[data-hovered]:not([data-disabled])::after, &:hover:not(:disabled):not([data-disabled])::after";
const pressedSelector =
  "&[data-pressed]:not([data-disabled])::after, &:active:not(:disabled):not([data-disabled])::after";

/**
 * @description
 * hover / pressed 상태에서 ::after에 색상 overlay를 표시한다.
 *
 * 이 유틸은 ::after를 hover / pressed overlay 전용으로 점유한다. 인터랙티브
 * 컴포넌트의 ::after에 다른 용도(divider/arrow/shimmer 등)를 추가 점유하면
 * overlay가 가려진다. 비인터랙티브 시각 효과는 별도 element로 표현해야 한다.
 *
 * `data-disabled`가 있으면 overlay는 표시되지 않는다. 정책의 구현체로서 utility가
 * 직접 강제 — 호출자가 `usePressable`을 안 쓰는 경로에서도 disabled element에
 * overlay가 새지 않는다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md — pseudo-element 자원 할당 정책
 *
 * @requires
 * - 호출자는 element에 `position: relative`(또는 다른 positioned 값)를 부여해야 한다.
 *   ::after가 position: absolute이므로 positioned ancestor가 없으면 viewport 기준으로 잡힌다.
 * - 호출자는 `&::after`에 inset과 borderRadius를 직접 지정해야 한다.
 *   shape는 컴포넌트 컨텍스트에 따라 다르므로 이 유틸이 가정하지 않는다.
 * - disabled 상태를 표시할 때는 element에 `data-disabled` 속성을 부여한다 — utility가
 *   이 속성을 보고 overlay를 차단한다 (`usePressable`은 자동으로 부여).
 *
 * @example
 *   overlay()
 *   overlay({ density: "normal", hierarchy: "secondary" })
 *
 * @example
 *   // 케이스 1: 시각 영역 = 탭 영역인 일반 컴포넌트
 *   selectors: {
 *     "&::after": { inset: 0, borderRadius: "inherit" },
 *   }
 *
 * @example
 *   // 케이스 2: 탭 영역이 시각 영역보다 큰 컴포넌트 (IconButton condensed 등)
 *   selectors: {
 *     "&::after": { inset: pxToRem(-4), borderRadius: "4px" },
 *   }
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
      [hoverSelector]: {
        opacity: fallbackVar(overlayHoverOpacity, overlayOpacityMap.bold.hover),
      },
      // hover + pressed 동시 상태(마우스 클릭 holding)는 specificity 동등 →
      // 후행 선언인 pressed 스타일이 적용된다. 의도된 동작 — pressed가 hover 위에
      [pressedSelector]: {
        opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
        // pressed는 즉각 반응이 자연스러워 transition을 끈다
        transition: "none",
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
