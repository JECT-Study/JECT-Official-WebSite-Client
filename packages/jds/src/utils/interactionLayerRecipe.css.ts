import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../tokens/vars.css";

export type InteractionLayerDensity = "normal" | "bold";
export type InteractionLayerHierarchy = "accent" | "primary" | "secondary" | "tertiary";

const interactionLayerColorMap = {
  accent: vars.color.semantic.accent.normal,
  primary: vars.color.semantic.fill.boldest,
  secondary: vars.color.semantic.fill.bold,
  tertiary: vars.color.semantic.fill.normal,
} satisfies Record<InteractionLayerHierarchy, string>;

const interactionLayerOpacityMap = {
  normal: {
    hover: `calc(${vars.scheme.semantic.opacity["5"]} / 100)`,
    active: `calc(${vars.scheme.semantic.opacity["8"]} / 100)`,
  },
  bold: {
    hover: `calc(${vars.scheme.semantic.opacity["8"]} / 100)`,
    active: `calc(${vars.scheme.semantic.opacity["12"]} / 100)`,
  },
} satisfies Record<InteractionLayerDensity, { hover: string; active: string }>;

const hoverSelector =
  "&[data-hovered]:not([data-disabled])::after, &:hover:not(:disabled):not([data-disabled])::after";
const activeSelector =
  "&[data-pressed]:not([data-disabled])::after, &:active:not(:disabled):not([data-disabled])::after";

/**
 * @description
 * hover / pressed 상태에서 ::after에 interaction layer를 표시한다.
 *
 * 이 유틸은 ::after를 interaction layer 전용으로 점유한다. 호출자는 element에
 * `position: relative`를 부여하고, `&::after`의 inset / borderRadius를
 * 컴포넌트 컨텍스트에 맞게 지정해야 한다.
 *
 * 기본값은 `density="normal"`, `hierarchy="primary"`이다.
 *
 * @example
 *   interactionLayer()
 *   interactionLayer({ density: "bold", hierarchy: "secondary" })
 *
 * @example
 *   base: [
 *     interactionLayer({ hierarchy: "secondary" }),
 *     {
 *       position: "relative",
 *       selectors: {
 *         "&::after": { inset: 0, borderRadius: "inherit" },
 *       },
 *     },
 *   ]
 */
export const interactionLayer = recipe({
  base: {
    selectors: {
      "&::after": {
        content: '""',
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },
      [activeSelector]: {
        transition: "none",
      },
    },
  },
  variants: {
    hierarchy: {
      accent: {
        selectors: { "&::after": { backgroundColor: interactionLayerColorMap.accent } },
      },
      primary: {
        selectors: { "&::after": { backgroundColor: interactionLayerColorMap.primary } },
      },
      secondary: {
        selectors: { "&::after": { backgroundColor: interactionLayerColorMap.secondary } },
      },
      tertiary: {
        selectors: { "&::after": { backgroundColor: interactionLayerColorMap.tertiary } },
      },
    } satisfies Record<InteractionLayerHierarchy, object>,
    density: {
      normal: {
        selectors: {
          [hoverSelector]: {
            opacity: interactionLayerOpacityMap.normal.hover,
          },
          [activeSelector]: {
            opacity: interactionLayerOpacityMap.normal.active,
          },
        },
      },
      bold: {
        selectors: {
          [hoverSelector]: {
            opacity: interactionLayerOpacityMap.bold.hover,
          },
          [activeSelector]: {
            opacity: interactionLayerOpacityMap.bold.active,
          },
        },
      },
    } satisfies Record<InteractionLayerDensity, object>,
  },
  defaultVariants: {
    density: "normal",
    hierarchy: "primary",
  },
});
