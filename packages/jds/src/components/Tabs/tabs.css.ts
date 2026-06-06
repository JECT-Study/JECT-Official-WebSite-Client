import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { TabsVariant } from "./tabs.types";

export const triggerTextStyle = "semantic-textStyle-label-md-bold";
export const badgeTextStyle = "semantic-textStyle-label-md-subtle";

export const label = style({
  color: "inherit",
  cursor: "inherit",
});

export const content = style({
  position: "relative",
  outline: "none",
  borderRadius: vars.scheme.semantic.radius["6"],
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 3px ${vars.color.semantic.interaction.focus}`,
    },
  },
});

const overlaySelectors = {
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    backgroundColor: vars.color.semantic.fill.bold,
    opacity: 0,
    pointerEvents: "none",
    transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
  },
  "&:hover:not(:disabled):not([data-disabled])::after": {
    opacity: 0.05,
  },
  "&:active:not(:disabled):not([data-disabled])::after": {
    opacity: 0.08,
    transition: "none",
  },
} as const;

const focusRingSelectors = {
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
  "&:focus-visible::before": {
    boxShadow: `0 0 0 3px ${vars.color.semantic.interaction.focus}`,
    zIndex: 1,
  },
} as const;

const triggerVariantStyles = {
  header: {
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
    border: "none",
    borderBottom: `${vars.scheme.semantic.strokeWeight["2"]} solid transparent`,
    borderRadius: 0,
    backgroundColor: "transparent",
    selectors: {
      "&[data-state='inactive']": {
        color: vars.color.semantic.object.alternative,
      },
      "&::after": {
        bottom: "-2px",
      },
      "&[data-state='active']": {
        color: vars.color.semantic.object.bolder,
        borderBottomColor: vars.color.semantic.stroke.bold,
        zIndex: 1,
      },
      "&:disabled, &[data-disabled]": {
        color: vars.color.semantic.object.subtle,
      },
      "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
        color: vars.color.semantic.object.subtle,
        borderBottomColor: vars.color.semantic.stroke.subtle,
      },
    },
  },
  content: {
    padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
    borderRadius: vars.scheme.semantic.radius["6"],
    backgroundColor: "transparent",
    selectors: {
      "&[data-state='inactive']": {
        color: vars.color.semantic.object.alternative,
      },
      "&[data-state='active']": {
        color: vars.color.semantic.object.bolder,
        backgroundColor: vars.color.semantic.fill.subtlest,
        borderColor: vars.color.semantic.stroke.alpha.subtle,
      },
      "&:disabled, &[data-disabled]": {
        color: vars.color.semantic.object.subtle,
        borderColor: vars.color.semantic.stroke.alpha.subtler,
      },
      "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
        color: vars.color.semantic.object.subtle,
        backgroundColor: vars.color.semantic.fill.subtlest,
        borderColor: vars.color.semantic.stroke.alpha.subtler,
      },
    },
  },
} satisfies Record<TabsVariant, object>;

export const list = recipe({
  base: {
    display: "flex",
    alignItems: "stretch",
  },
  variants: {
    variant: {
      header: {
        gap: 0,
        borderBottom: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.assistive}`,
      },
      content: {
        gap: vars.scheme.semantic.spacing["8"],
      },
    } satisfies Record<TabsVariant, object>,
  },
});

export const trigger = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.scheme.semantic.spacing["4"],
    minWidth: 0,
    appearance: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    userSelect: "none",
    color: vars.color.semantic.object.alternative,
    selectors: {
      ...overlaySelectors,
      ...focusRingSelectors,
      "&:disabled, &[data-disabled]": {
        cursor: "default",
        pointerEvents: "none",
      },
    },
  },
  variants: {
    variant: triggerVariantStyles,
    isItemStretched: {
      false: {
        flex: "0 0 auto",
      },
      true: {
        flex: "1 1 0%",
      },
    },
  },
});
