import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { IconSize } from "components";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor } from "utils";

import { BLOCK_BUTTON_HIERARCHY_OPTIONS } from "./blockButton.types";
import type {
  BlockButtonHierarchy,
  BlockButtonSize,
  BlockButtonStyle,
  FeedbackIntent,
} from "./blockButton.types";

export const iconSizeMap: Record<BlockButtonSize, IconSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

// Color state types
type ColorState = { backgroundColor: string; color: string };
type OnlyColor = { color: string };
type OutlinedColorState = { borderColor: string; color: string };

// Overlay colors per hierarchy
const overlayColorByHierarchy = {
  accent: vars.color.semantic.interaction.bold,
  primary: vars.color.semantic.interaction.inverse.normal,
  secondary: vars.color.semantic.interaction.inverse.normal,
  tertiary: vars.color.semantic.interaction.normal,
} satisfies Record<BlockButtonHierarchy, string>;

// Solid colors
const solidColorsByHierarchy = {
  accent: {
    enabled: {
      backgroundColor: vars.color.semantic.accent.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    disabled: {
      backgroundColor: vars.color.semantic.accent.alpha.subtlest,
      color: vars.color.semantic.accent.alpha.subtler,
    },
  },
  primary: {
    enabled: {
      backgroundColor: vars.color.semantic.fill.bolder,
      color: vars.color.semantic.object.inverse.boldest,
    },
    disabled: {
      backgroundColor: vars.color.semantic.fill.subtlest,
      color: vars.color.semantic.object.assistive,
    },
  },
  secondary: {
    enabled: {
      backgroundColor: vars.color.semantic.fill.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    disabled: {
      backgroundColor: vars.color.semantic.fill.subtlest,
      color: vars.color.semantic.object.assistive,
    },
  },
  tertiary: {
    enabled: {
      backgroundColor: vars.color.semantic.fill.subtle,
      color: vars.color.semantic.object.normal,
    },
    disabled: {
      backgroundColor: vars.color.semantic.fill.subtlest,
      color: vars.color.semantic.object.assistive,
    },
  },
} satisfies Record<BlockButtonHierarchy, { enabled: ColorState; disabled: ColorState }>;

// Outlined colors (backgroundColor / borderWidth / borderStyle은 variant 레벨에서 공유)
const outlinedColorsByHierarchy = {
  accent: {
    enabled: {
      borderColor: vars.color.semantic.accent.alpha.subtle,
      color: vars.color.semantic.accent.normal,
    },
    disabled: {
      borderColor: vars.color.semantic.accent.alpha.subtler,
      color: vars.color.semantic.accent.alpha.subtler,
    },
  },
  primary: {
    enabled: {
      borderColor: vars.color.semantic.stroke.alpha.assistive,
      color: vars.color.semantic.object.boldest,
    },
    disabled: {
      borderColor: vars.color.semantic.stroke.alpha.subtler,
      color: vars.color.semantic.object.assistive,
    },
  },
  secondary: {
    enabled: {
      borderColor: vars.color.semantic.stroke.alpha.assistive,
      color: vars.color.semantic.object.bold,
    },
    disabled: {
      borderColor: vars.color.semantic.stroke.alpha.subtler,
      color: vars.color.semantic.object.assistive,
    },
  },
  tertiary: {
    enabled: {
      borderColor: vars.color.semantic.stroke.alpha.assistive,
      color: vars.color.semantic.object.neutral,
    },
    disabled: {
      borderColor: vars.color.semantic.stroke.alpha.subtler,
      color: vars.color.semantic.object.assistive,
    },
  },
} satisfies Record<
  BlockButtonHierarchy,
  { enabled: OutlinedColorState; disabled: OutlinedColorState }
>;

// Empty colors (backgroundColor: "transparent"는 variant 레벨에서 공유)
const emptyColorsByHierarchy = {
  accent: {
    enabled: { color: vars.color.semantic.accent.normal },
    disabled: { color: vars.color.semantic.accent.alpha.subtler },
  },
  primary: {
    enabled: { color: vars.color.semantic.object.boldest },
    disabled: { color: vars.color.semantic.object.assistive },
  },
  secondary: {
    enabled: { color: vars.color.semantic.object.bold },
    disabled: { color: vars.color.semantic.object.assistive },
  },
  tertiary: {
    enabled: { color: vars.color.semantic.object.neutral },
    disabled: { color: vars.color.semantic.object.assistive },
  },
} satisfies Record<BlockButtonHierarchy, { enabled: OnlyColor; disabled: OnlyColor }>;

// Feedback colors
const feedbackColorsByIntent = {
  positive: {
    enabled: {
      backgroundColor: vars.color.semantic.feedback.positive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    disabled: {
      backgroundColor: vars.color.semantic.feedback.positive.alpha.subtler,
      color: vars.color.semantic.feedback.positive.alpha.subtle,
    },
  },
  destructive: {
    enabled: {
      backgroundColor: vars.color.semantic.feedback.destructive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    disabled: {
      backgroundColor: vars.color.semantic.feedback.destructive.alpha.subtler,
      color: vars.color.semantic.feedback.destructive.alpha.subtle,
    },
  },
} satisfies Record<FeedbackIntent, { enabled: ColorState; disabled: ColorState }>;

// Typography per size
// globalStyle 클래스를 쓰는 대신 동일한 CSS var를 직접 참조해 recipe 안에서 인라인으로 처리한다.
// recipe size variant만으로 타이포/크기가 한번에 결정되므로 className 합성이 필요하지 않다.
const typographyBySize = {
  lg: {
    fontSize: vars.typo.primitive.fontSize.label.lg,
    lineHeight: vars.typo.primitive.font.lineHeight.label.lg,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.lg,
  },
  md: {
    fontSize: vars.typo.primitive.fontSize.label.md,
    lineHeight: vars.typo.primitive.font.lineHeight.label.md,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.md,
  },
  sm: {
    fontSize: vars.typo.primitive.fontSize.label.sm,
    lineHeight: vars.typo.primitive.font.lineHeight.label.sm,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.sm,
  },
  xs: {
    fontSize: vars.typo.primitive.fontSize.label.xs,
    lineHeight: vars.typo.primitive.font.lineHeight.label.xs,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.xs,
  },
} satisfies Record<BlockButtonSize, object>;

// Size variants (padding + borderRadius + typography)
const sizeVariants = {
  lg: {
    padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["20"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
    ...typographyBySize.lg,
  },
  md: {
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["16"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
    ...typographyBySize.md,
  },
  sm: {
    padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
    ...typographyBySize.sm,
  },
  xs: {
    padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
    ...typographyBySize.xs,
  },
} satisfies Record<BlockButtonSize, object>;

// Base styles
const baseStyles = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  cursor: "pointer",
  userSelect: "none",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  gap: vars.scheme.semantic.spacing["4"],
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
    // ::before = focusRing, ::after = overlay
    // borderRadius: "inherit" → 버튼의 size variant borderRadius를 그대로 상속
    "&::before": { inset: 0, borderRadius: "inherit" },
    "&::after": { inset: 0, borderRadius: "inherit" },
  },
});

// Compound variants
const solidCompoundVariants = BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => ({
  variants: { hierarchy, variant: "solid" as const },
  style: {
    ...solidColorsByHierarchy[hierarchy].enabled,
    selectors: { "&[data-disabled]": solidColorsByHierarchy[hierarchy].disabled },
  },
}));

const outlinedCompoundVariants = BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => ({
  variants: { hierarchy, variant: "outlined" as const },
  style: {
    ...outlinedColorsByHierarchy[hierarchy].enabled,
    selectors: { "&[data-disabled]": outlinedColorsByHierarchy[hierarchy].disabled },
  },
}));

const emptyCompoundVariants = BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => ({
  variants: { hierarchy, variant: "empty" as const },
  style: {
    ...emptyColorsByHierarchy[hierarchy].enabled,
    selectors: { "&[data-disabled]": emptyColorsByHierarchy[hierarchy].disabled },
  },
}));

/**
 * `BlockButton.Basic`용 VE recipe.
 *
 * @remarks
 * 인터랙션 상태는 `usePressable`이 부여하는 data attribute를 소비한다.
 * - `data-hovered` / `data-pressed` → `::after` overlay opacity (0.08 / 0.12)
 * - `data-focus-visible`            → `::before` focus ring box-shadow
 * - `data-disabled`                 → overlay 차단 + `cursor: not-allowed`
 *
 * `usePressable` 없이 단독으로 사용하면 hover·focus·disabled 스타일이 동작하지 않는다.
 *
 * @see {@link overlay} — hover/pressed overlay 유틸
 * @see {@link focusRing} — focus ring 유틸
 */
export const basicRoot = recipe({
  base: [overlay, focusRing, baseStyles],
  variants: {
    // hierarchy: overlayColor만 설정. 실제 색상은 compoundVariants에서 variant와 교차하여 결정
    hierarchy: {
      accent: { vars: { [overlayColor]: overlayColorByHierarchy.accent } },
      primary: { vars: { [overlayColor]: overlayColorByHierarchy.primary } },
      secondary: { vars: { [overlayColor]: overlayColorByHierarchy.secondary } },
      tertiary: { vars: { [overlayColor]: overlayColorByHierarchy.tertiary } },
    } satisfies Record<BlockButtonHierarchy, unknown>,
    // variant: hierarchy와 무관하게 공유되는 base 속성만 설정
    variant: {
      solid: {},
      outlined: {
        backgroundColor: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      empty: { backgroundColor: "transparent" },
    } satisfies Record<BlockButtonStyle, unknown>,
    size: sizeVariants satisfies Record<BlockButtonSize, unknown>,
  },
  compoundVariants: [
    ...solidCompoundVariants,
    ...outlinedCompoundVariants,
    ...emptyCompoundVariants,
  ],
});

/**
 * `BlockButton.Feedback`용 VE recipe.
 *
 * @remarks
 * 항상 solid variant로 렌더링되며, `hierarchy` 없이 `intent`만으로 색상이 결정된다.
 * overlay color는 positive / destructive 모두 `interaction.bold`로 동일하다.
 *
 * 인터랙션 상태 처리는 {@link basicRoot}와 동일하게 `usePressable` data attribute에 의존한다.
 */
export const feedbackRoot = recipe({
  base: [overlay, focusRing, baseStyles],
  variants: {
    // feedback은 항상 solid이므로 intent variant에서 색상을 직접 결정
    intent: {
      positive: {
        vars: { [overlayColor]: vars.color.semantic.interaction.bold },
        ...feedbackColorsByIntent.positive.enabled,
        selectors: { "&[data-disabled]": feedbackColorsByIntent.positive.disabled },
      },
      destructive: {
        vars: { [overlayColor]: vars.color.semantic.interaction.bold },
        ...feedbackColorsByIntent.destructive.enabled,
        selectors: { "&[data-disabled]": feedbackColorsByIntent.destructive.disabled },
      },
    } satisfies Record<FeedbackIntent, unknown>,
    size: sizeVariants satisfies Record<BlockButtonSize, unknown>,
  },
});
