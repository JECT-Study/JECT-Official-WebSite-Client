import { style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor } from "utils";

import { BLOCK_BUTTON_HIERARCHY_OPTIONS } from "./blockButton.types";
import type {
  BlockButtonFeedback,
  BlockButtonHierarchy,
  BlockButtonSize,
  BlockButtonVariant,
} from "./blockButton.types";
import type { IconSize } from "../../Icon";

export const iconSizeMap: Record<BlockButtonSize, IconSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

interface SolidPalette {
  backgroundColor: string;
  color: string;
}
interface OutlinedPalette {
  borderColor: string;
  color: string;
}
interface HollowPalette {
  color: string;
}

const solidDisabled = {
  backgroundColor: vars.color.semantic.fill.subtlest,
  color: vars.color.semantic.object.subtler,
} satisfies SolidPalette;

const outlinedDisabled = {
  borderColor: vars.color.semantic.stroke.alpha.subtler,
  color: vars.color.semantic.object.subtler,
} satisfies OutlinedPalette;

const hollowDisabled = {
  color: vars.color.semantic.object.subtler,
} satisfies HollowPalette;

const solidEnabledByHierarchy = {
  accent: {
    backgroundColor: vars.color.semantic.accent.neutral,
    color: vars.color.semantic.object.static.inverse.boldest,
  },
  primary: {
    backgroundColor: vars.color.semantic.fill.boldest,
    color: vars.color.semantic.object.inverse.boldest,
  },
  secondary: {
    backgroundColor: vars.color.semantic.fill.subtler,
    color: vars.color.semantic.object.neutral,
  },
} satisfies Record<BlockButtonHierarchy, SolidPalette>;

const overlayColorByHierarchy = {
  accent: vars.color.semantic.accent.normal,
  primary: vars.color.semantic.fill.boldest,
  secondary: vars.color.semantic.fill.boldest,
} satisfies Record<BlockButtonHierarchy, string>;

const solidOverlayColorByHierarchy = {
  accent: vars.color.semantic.fill.boldest,
  primary: vars.color.semantic.fill.inverse.boldest,
  secondary: vars.color.semantic.fill.boldest,
} satisfies Record<BlockButtonHierarchy, string>;

const outlinedEnabledByHierarchy = {
  accent: {
    borderColor: vars.color.semantic.accent.neutral,
    color: vars.color.semantic.accent.normal,
  },
  primary: {
    borderColor: vars.color.semantic.stroke.alpha.assistive,
    color: vars.color.semantic.object.boldest,
  },
  secondary: {
    borderColor: vars.color.semantic.stroke.alpha.subtle,
    color: vars.color.semantic.object.neutral,
  },
} satisfies Record<BlockButtonHierarchy, OutlinedPalette>;

const hollowEnabledByHierarchy = {
  accent: { color: vars.color.semantic.accent.normal },
  primary: { color: vars.color.semantic.object.boldest },
  secondary: { color: vars.color.semantic.object.neutral },
} satisfies Record<BlockButtonHierarchy, HollowPalette>;

// feedback의 disabled 색은 solid 토큰을 재사용한다.
const feedbackEnabledByIntent = {
  positive: {
    backgroundColor: vars.color.semantic.feedback.positive.neutral,
    color: vars.color.semantic.object.static.inverse.boldest,
  },
  destructive: {
    backgroundColor: vars.color.semantic.feedback.destructive.neutral,
    color: vars.color.semantic.object.static.inverse.boldest,
  },
} satisfies Record<BlockButtonFeedback, SolidPalette>;

const sizeVariants = {
  lg: {
    padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["20"]}`,
    borderRadius: vars.scheme.semantic.radius["8"],
  },
  md: {
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["16"]}`,
    borderRadius: vars.scheme.semantic.radius["8"],
  },
  sm: {
    padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  xs: {
    padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
} satisfies Record<BlockButtonSize, StyleRule>;

const colorVars = <T extends { color: string }>(
  { color, ...rest }: T,
  overlay?: string,
): StyleRule => ({
  ...rest,
  color,
  vars: {
    ...(overlay && { [overlayColor]: overlay }),
  },
});

const baseStyles = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  cursor: "pointer",
  userSelect: "none",
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
    ...colorVars(solidEnabledByHierarchy[hierarchy], solidOverlayColorByHierarchy[hierarchy]),
    selectors: { "&[data-disabled]": colorVars(solidDisabled) },
  } satisfies StyleRule,
}));

const outlinedCompoundVariants = BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => ({
  variants: { hierarchy, variant: "outlined" as const },
  style: {
    ...colorVars(outlinedEnabledByHierarchy[hierarchy], overlayColorByHierarchy[hierarchy]),
    selectors: { "&[data-disabled]": colorVars(outlinedDisabled) },
  } satisfies StyleRule,
}));

const hollowCompoundVariants = BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => ({
  variants: { hierarchy, variant: "hollow" as const },
  style: {
    ...colorVars(hollowEnabledByHierarchy[hierarchy], overlayColorByHierarchy[hierarchy]),
    selectors: { "&[data-disabled]": colorVars(hollowDisabled) },
  } satisfies StyleRule,
}));

const rootBase = [overlay(), focusRing(), baseStyles];

// hierarchy는 overlayColor만 지정하고, 실제 색상은 variant와 조합해서 결정된다.
export const basicRoot = recipe({
  base: rootBase,
  variants: {
    hierarchy: {
      accent: {},
      primary: {},
      secondary: {},
    } satisfies Record<BlockButtonHierarchy, StyleRule>,
    variant: {
      solid: {},
      outlined: {
        backgroundColor: "transparent",
        borderWidth: vars.scheme.semantic.strokeWeight["1"],
        borderStyle: "solid",
      },
      hollow: { backgroundColor: "transparent" },
    } satisfies Record<BlockButtonVariant, StyleRule>,
    size: sizeVariants satisfies Record<BlockButtonSize, StyleRule>,
  },
  compoundVariants: [
    ...solidCompoundVariants,
    ...outlinedCompoundVariants,
    ...hollowCompoundVariants,
  ],
});

const feedbackVariant = (enabled: SolidPalette): StyleRule => ({
  ...colorVars(enabled, solidOverlayColorByHierarchy.accent),
  selectors: { "&[data-disabled]": colorVars(solidDisabled) },
});

const feedbackVariants = {
  positive: feedbackVariant(feedbackEnabledByIntent.positive),
  destructive: feedbackVariant(feedbackEnabledByIntent.destructive),
} satisfies Record<BlockButtonFeedback, StyleRule>;

export const feedbackRoot = recipe({
  base: rootBase,
  variants: {
    feedback: feedbackVariants satisfies Record<BlockButtonFeedback, StyleRule>,
    size: sizeVariants satisfies Record<BlockButtonSize, StyleRule>,
  },
});
