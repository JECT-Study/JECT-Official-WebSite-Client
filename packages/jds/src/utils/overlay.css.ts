import { createVar, fallbackVar, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../tokens/vars.css";

export type OverlayDensity = "normal" | "bold";
export type OverlayHierarchy = "accent" | "primary" | "secondary" | "tertiary";
export type OverlayInteraction = "self" | "delegated";

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

/** overlay의 color. hierarchy에 따라 정해지고, 필요하면 직접 덮어쓴다. */
export const overlayColor = createVar();

/** hover, press일 때의 opacity. density에 따라 정해지고, 필요하면 직접 덮어쓴다. */
export const overlayHoverOpacity = createVar();
export const overlayPressedOpacity = createVar();

/**
 * `::after`에 hover/pressed 오버레이를 그린다.
 *
 * hover는 언제나 요소 자신의 `:hover`를 쓰고, press는 `interaction`으로 어느 요소에서 읽을지 정한다.
 * `self`는 자신의 `:active`를, `delegated`는 직계 자식 `[data-interaction-target]`의 `:active`를 읽는다.
 * 요소의 `position: relative`와 `::after`의 inset, borderRadius는 호출부가 지정한다. disabled 상태는 `data-disabled`로 표시한다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md
 * @example overlay({ hierarchy: "secondary", interaction: "delegated" })
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
    },
  },
  variants: {
    hierarchy: {
      accent: { vars: { [overlayColor]: overlayColorMap.accent } },
      primary: { vars: { [overlayColor]: overlayColorMap.primary } },
      secondary: { vars: { [overlayColor]: overlayColorMap.secondary } },
      tertiary: { vars: { [overlayColor]: overlayColorMap.tertiary } },
    } satisfies Record<OverlayHierarchy, StyleRule>,
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
    } satisfies Record<OverlayDensity, StyleRule>,
    // hover는 fine pointer에서만 반응한다. press가 hover에 우선하도록 같은 @media 안 hover 뒤에 다시 선언한다.
    interaction: {
      self: {
        selectors: {
          "&:active:not(:disabled):not([data-disabled])::after": {
            opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
            transition: "none",
          },
        },
        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover:not(:disabled):not([data-disabled])::after": {
                opacity: fallbackVar(overlayHoverOpacity, overlayOpacityMap.bold.hover),
              },
              "&:active:not(:disabled):not([data-disabled])::after": {
                opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
                transition: "none",
              },
            },
          },
        },
      },
      delegated: {
        selectors: {
          "&:not([data-disabled]):has(> [data-interaction-target]:active)::after": {
            opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
            transition: "none",
          },
        },
        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover:not(:disabled):not([data-disabled])::after": {
                opacity: fallbackVar(overlayHoverOpacity, overlayOpacityMap.bold.hover),
              },
              "&:not([data-disabled]):has(> [data-interaction-target]:active)::after": {
                opacity: fallbackVar(overlayPressedOpacity, overlayOpacityMap.bold.pressed),
                transition: "none",
              },
            },
          },
        },
      },
    } satisfies Record<OverlayInteraction, StyleRule>,
  },
  defaultVariants: {
    interaction: "self",
  },
});
