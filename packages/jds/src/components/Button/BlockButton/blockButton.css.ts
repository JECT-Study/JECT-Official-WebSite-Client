import { style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { IconSize } from "components";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor } from "utils";

import { BLOCK_BUTTON_HIERARCHY_OPTIONS } from "./blockButton.types";
import type {
  BlockButtonFeedback,
  BlockButtonHierarchy,
  BlockButtonSize,
  BlockButtonVariant,
} from "./blockButton.types";

export const iconSizeMap: Record<BlockButtonSize, IconSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

type ColorState = { backgroundColor: string; color: string };
type OnlyColor = { color: string };
type OutlinedColorState = { borderColor: string; color: string };

const overlayColorByHierarchy = {
  accent: vars.color.semantic.accent.neutral,
  primary: vars.color.semantic.fill.boldest,
  secondary: vars.color.semantic.fill.boldest,
  tertiary: vars.color.semantic.fill.boldest,
} satisfies Record<BlockButtonHierarchy, string>;

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
} satisfies Record<BlockButtonFeedback, { enabled: ColorState; disabled: ColorState }>;

const sizeVariants = {
  lg: {
    padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["20"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  md: {
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["16"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  sm: {
    padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  xs: {
    padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
  },
} satisfies Record<BlockButtonSize, StyleRule>;

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
    "&::before": { inset: 0, borderRadius: "inherit" },
    "&::after": { inset: 0, borderRadius: "inherit" },
  },
});

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

const rootBase = [overlay(), focusRing(), baseStyles];

// hierarchy는 overlayColor만 지정하고, 실제 색상은 variant와 조합해서 결정된다.
export const basicRoot = recipe({
  base: rootBase,
  variants: {
    hierarchy: {
      accent: { vars: { [overlayColor]: overlayColorByHierarchy.accent } },
      primary: { vars: { [overlayColor]: overlayColorByHierarchy.primary } },
      secondary: { vars: { [overlayColor]: overlayColorByHierarchy.secondary } },
      tertiary: { vars: { [overlayColor]: overlayColorByHierarchy.tertiary } },
    } satisfies Record<BlockButtonHierarchy, StyleRule>,
    variant: {
      solid: {},
      outlined: {
        backgroundColor: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      empty: { backgroundColor: "transparent" },
    } satisfies Record<BlockButtonVariant, StyleRule>,
    size: sizeVariants satisfies Record<BlockButtonSize, StyleRule>,
  },
  compoundVariants: [
    ...solidCompoundVariants,
    ...outlinedCompoundVariants,
    ...emptyCompoundVariants,
  ],
});

export const feedbackRoot = recipe({
  base: rootBase,
  variants: {
    feedback: {
      positive: {
        vars: { [overlayColor]: vars.color.semantic.fill.boldest },
        ...feedbackColorsByIntent.positive.enabled,
        selectors: { "&[data-disabled]": feedbackColorsByIntent.positive.disabled },
      },
      destructive: {
        vars: { [overlayColor]: vars.color.semantic.fill.boldest },
        ...feedbackColorsByIntent.destructive.enabled,
        selectors: { "&[data-disabled]": feedbackColorsByIntent.destructive.disabled },
      },
    } satisfies Record<BlockButtonFeedback, StyleRule>,
    size: sizeVariants satisfies Record<BlockButtonSize, StyleRule>,
  },
});
