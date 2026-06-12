import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import type { MenuItemSize, MenuItemTone } from "./menuItem.types";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";
import { labelColorVar } from "@/utils/typography.css";

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
 * `MenuItem.Button` / `MenuItem.Anchor` 공용 VE recipe.
 *
 * @remarks
 * Radix DropdownMenu 내부(usePressable 미경유)에서도 쓰이므로 native hover로 opt-in한다.
 * - hover / active → `::after` overlay
 * - `:focus-visible` → `::before` focus ring
 * - `:disabled` / `data-disabled` → overlay 차단 + 색상/커서 전환
 *   (anchor는 `:disabled`가 없으므로 `data-disabled` 속성으로 표현한다)
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
  vars: {
    [labelColorVar]: "inherit",
  },
});

export const menuItemImage = recipe({
  variants: {
    size: {
      lg: {
        vars: {
          [thumbnailVars.width]: "20px",
        },
      },
      md: {
        vars: {
          [thumbnailVars.width]: "18px",
        },
      },
      sm: {
        vars: {
          [thumbnailVars.width]: "16px",
        },
      },
    } satisfies Record<MenuItemSize, unknown>,
  },
});
