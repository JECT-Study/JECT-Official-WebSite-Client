import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import type { MenuItemSize, MenuItemTone } from "./menuItem.types";

// 탭 영역이 시각 영역보다 상하 4px / 좌우 8px 큰 컴포넌트 — overlay/focusRing 케이스 2
const LAYER_INSET = `${pxToRem(-4)} ${pxToRem(-8)}`;
const LAYER_RADIUS = vars.scheme.semantic.radius["6"];

const contentColorByTone = {
  normal: vars.color.semantic.object.bold,
  accent: vars.color.semantic.accent.normal,
  destructive: vars.color.semantic.feedback.destructive.normal,
} satisfies Record<MenuItemTone, string>;

const overlayColorByTone = {
  normal: vars.color.semantic.object.assistive,
  accent: vars.color.semantic.accent.neutral,
  destructive: vars.color.semantic.feedback.destructive.neutral,
} satisfies Record<MenuItemTone, string>;

const baseStyles = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: vars.scheme.semantic.spacing["6"],
  width: "100%",
  cursor: "pointer",
  borderRadius: LAYER_RADIUS,
  selectors: {
    "&:disabled, &[data-disabled]": {
      cursor: "default",
      color: vars.color.semantic.object.subtle,
    },
    // ::before = focusRing, ::after = overlay
    "&::before": { inset: LAYER_INSET, borderRadius: LAYER_RADIUS },
    "&::after": { inset: LAYER_INSET, borderRadius: LAYER_RADIUS },
  },
});

/**
 * @remarks
 * Radix DropdownMenu 내부(usePressable 미경유)에서도 쓰이므로 native hover로 opt-in한다.
 * anchor는 `:disabled`가 없으므로 disabled 상태를 `data-disabled` 속성으로 부여해야 한다.
 */
export const menuItemRoot = recipe({
  base: [overlay({ nativeHover: true }), focusRing(), baseStyles],
  variants: {
    tone: {
      normal: {
        color: contentColorByTone.normal,
        vars: { [overlayColor]: overlayColorByTone.normal },
      },
      accent: {
        color: contentColorByTone.accent,
        vars: { [overlayColor]: overlayColorByTone.accent },
      },
      destructive: {
        color: contentColorByTone.destructive,
        vars: { [overlayColor]: overlayColorByTone.destructive },
      },
    } satisfies Record<MenuItemTone, unknown>,
  },
  defaultVariants: {
    tone: "normal",
  },
});

export const menuItemLabel = style({
  cursor: "inherit",
  color: "inherit",
});

export const menuItemImage = recipe({
  variants: {
    size: {
      lg: {
        width: pxToRem(20),
      },
      md: {
        width: pxToRem(18),
      },
      sm: {
        width: pxToRem(16),
      },
    } satisfies Record<MenuItemSize, unknown>,
  },
});
