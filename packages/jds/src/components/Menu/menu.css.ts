import type { StyleRule } from "@vanilla-extract/css";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import type { MenuSize, MenuStyle } from "./menu.types";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";

const menuListGap = {
  lg: vars.scheme.semantic.spacing["8"],
  md: vars.scheme.semantic.spacing["6"],
  sm: vars.scheme.semantic.spacing["4"],
} satisfies Record<MenuSize, string>;

const menuContentVariants = {
  gap: createVar(),
  paddingTop: createVar(),
  paddingBottom: createVar(),
} as const;

export const menuContent = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: menuContentVariants.gap,
    paddingLeft: vars.scheme.semantic.spacing["10"],
    paddingRight: vars.scheme.semantic.spacing["10"],
    paddingBottom: menuContentVariants.paddingBottom,
  },
  variants: {
    menuStyle: {
      solid: {
        paddingTop: menuContentVariants.paddingTop,
        backgroundColor: vars.color.semantic.surface.shallow,
        border: `1px solid ${vars.color.semantic.stroke.alpha.subtler}`,
        borderRadius: vars.scheme.semantic.radius["10"],
        boxShadow: vars.environment.semantic.shadow.floated,
      },
      hollow: {},
    } satisfies Record<MenuStyle, StyleRule>,
    size: {
      lg: {
        vars: {
          [menuContentVariants.paddingTop]: vars.scheme.semantic.spacing["16"],
          [menuContentVariants.paddingBottom]: vars.scheme.semantic.spacing["16"],
          [menuContentVariants.gap]: vars.scheme.semantic.spacing["8"],
        },
      },
      md: {
        vars: {
          [menuContentVariants.paddingTop]: vars.scheme.semantic.spacing["12"],
          [menuContentVariants.paddingBottom]: vars.scheme.semantic.spacing["12"],
          [menuContentVariants.gap]: vars.scheme.semantic.spacing["6"],
        },
      },
      sm: {
        vars: {
          [menuContentVariants.paddingTop]: vars.scheme.semantic.spacing["10"],
          [menuContentVariants.paddingBottom]: vars.scheme.semantic.spacing["12"],
          [menuContentVariants.gap]: vars.scheme.semantic.spacing["4"],
        },
      },
    } satisfies Record<MenuSize, StyleRule>,
  },
});

const menuCategoryMarginHorizontalMarginVars = createVar();

export const menuCategoryContainer = recipe({
  base: {
    marginTop: vars.scheme.semantic.spacing["6"],
    marginLeft: menuCategoryMarginHorizontalMarginVars,
    marginRight: menuCategoryMarginHorizontalMarginVars,
  },
  variants: {
    size: {
      lg: {
        vars: {
          [menuCategoryMarginHorizontalMarginVars]: vars.scheme.semantic.spacing["10"],
        },
      },
      md: {
        vars: {
          [menuCategoryMarginHorizontalMarginVars]: vars.scheme.semantic.spacing["10"],
        },
      },
      sm: {
        vars: {
          [menuCategoryMarginHorizontalMarginVars]: vars.scheme.semantic.spacing["8"],
        },
      },
    } satisfies Record<MenuSize, StyleRule>,
  },
});

export const menuCategory = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "default",
  color: vars.color.semantic.object.assistive,
});

const menuListGapVar = createVar();

export const menuGroup = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    gap: menuListGapVar,

    // NOTE:ul 태그의 기본 스타일 제거
    paddingLeft: vars.scheme.semantic.spacing["0"],
    marginTop: vars.scheme.semantic.spacing["0"],
    marginBottom: vars.scheme.semantic.spacing["0"],

    vars: { [menuListGapVar]: menuListGap.md },
  },
  variants: {
    size: {
      lg: { vars: { [menuListGapVar]: menuListGap.lg } },
      md: { vars: { [menuListGapVar]: menuListGap.md } },
      sm: { vars: { [menuListGapVar]: menuListGap.sm } },
    } satisfies Record<MenuSize, StyleRule>,
  },
});

export const menuTreeContainer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    gap: menuListGapVar,
  },
  variants: {
    size: {
      lg: { vars: { [menuListGapVar]: menuListGap.lg } },
      md: { vars: { [menuListGapVar]: menuListGap.md } },
      sm: { vars: { [menuListGapVar]: menuListGap.sm } },
    } satisfies Record<MenuSize, StyleRule>,
  },
});

export const menuTreeTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: menuListGapVar,
});

export const menuTreeIconButton = recipe({
  base: {
    marginLeft: vars.scheme.semantic.spacing["10"],
  },
  variants: {
    hasTreeButton: {
      true: {},
      false: {
        visibility: "hidden",
      },
    },
  },
});

export const menuIndentPadding = vars.scheme.semantic.spacing["24"];

export const menuTreeContent = style({
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  gap: menuListGapVar,
  paddingLeft: menuIndentPadding,
  // NOTE: ul 태그의 기본 스타일 제거
  marginTop: vars.scheme.semantic.spacing["0"],
  marginBottom: vars.scheme.semantic.spacing["0"],
});

const menuItemVariants = {
  paddingHorizontal: createVar(),
  paddingVertical: createVar(),
  layerRadius: createVar(),
  labelColor: createVar(),
} as const;

export const menuContainerStyle = recipe({
  base: [
    overlay(),
    focusRing(),
    {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: vars.scheme.semantic.spacing["8"],
      width: "100%",
      cursor: "pointer",
      borderRadius: menuItemVariants.layerRadius,
      color: vars.color.semantic.object.neutral,
      selectors: {
        "&:disabled, &[data-disabled]": {
          cursor: "default",
          color: vars.color.semantic.object.subtle,
          vars: { [menuItemVariants.labelColor]: vars.color.semantic.object.subtle },
        },
        "&::before, &::after": { inset: 0, borderRadius: menuItemVariants.layerRadius },
      },
      vars: {
        [overlayColor]: vars.color.semantic.object.assistive,
        [menuItemVariants.layerRadius]: vars.scheme.semantic.radius["8"],
      },
    },
  ],
  variants: {
    size: {
      sm: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["8"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["4"],
          [menuItemVariants.layerRadius]: vars.scheme.semantic.radius["6"],
        },
      },
      md: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["10"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["6"],
        },
      },
      lg: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["10"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["6"],
        },
      },
    } satisfies Record<MenuSize, StyleRule>,
    isSelected: {
      true: {
        background: vars.color.semantic.fill.subtlest,
        vars: { [menuItemVariants.labelColor]: vars.color.semantic.object.boldest },
      },
      false: {},
    },
    stretched: {
      true: {},
      false: {
        padding: `${menuItemVariants.paddingVertical} ${menuItemVariants.paddingHorizontal}`,
      },
    },
  },
});

export const menuItemLabel = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "inherit",
    color: fallbackVar(menuItemVariants.labelColor, vars.color.semantic.object.neutral),
  },
  variants: {
    fullWidthText: {
      true: {
        flex: 1,
      },
      false: {},
    },
  },
});

export const menuItemImage = recipe({
  variants: {
    size: {
      lg: {
        vars: { [thumbnailVars.width]: pxToRem(20) },
      },
      md: {
        vars: { [thumbnailVars.width]: pxToRem(18) },
      },
      sm: {
        vars: { [thumbnailVars.width]: pxToRem(16) },
      },
    } satisfies Record<MenuSize, StyleRule>,
  },
});
