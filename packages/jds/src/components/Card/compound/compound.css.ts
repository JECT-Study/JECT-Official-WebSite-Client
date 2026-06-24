import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../tokens/vars.css";

const SHADOW_DEFAULT = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
const FOCUS_OUTLINE_WIDTH = "3px";

const titleColor = createVar();
const labelColor = createVar();
const bodyColor = createVar();
const captionColor = createVar();

export const root = recipe({
  base: {
    position: "relative",
    zIndex: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    vars: {
      [titleColor]: vars.color.semantic.object.bolder,
      [labelColor]: vars.color.semantic.object.neutral,
      [bodyColor]: vars.color.semantic.object.normal,
      [captionColor]: vars.color.semantic.object.alternative,
    },
    selectors: {
      '&[data-interactive="true"]:not([data-disabled="true"])': {
        transition: `transform ${vars.environment.semantic.duration[150]} ${vars.environment.semantic.motion.fluent}, box-shadow ${vars.environment.semantic.duration[150]} ${vars.environment.semantic.motion.fluent}`,
      },
      '&[data-interactive="true"]:not([data-disabled="true"]):hover': {
        transform: "translateY(-2px)",
        boxShadow: vars.environment.semantic.shadow.raised,
      },
      '&[data-interactive="true"]:not([data-disabled="true"]):active': {
        transform: "translateY(0)",
        transition: "none",
      },
      '&[data-interactive="true"]:not([data-disabled="true"]):has([data-overlay]:focus-visible)': {
        transform: "translateY(-2px)",
        boxShadow: vars.environment.semantic.shadow.raised,
      },
    },
  },
  variants: {
    layout: {
      vertical: { flexDirection: "column" },
      horizontal: { flexDirection: "row" },
    },
    variant: {
      plate: {
        gap: 0,
        padding: 0,
        borderRadius: vars.scheme.semantic.radius[12],
        backgroundColor: vars.color.semantic.surface.shallow,
        border: `1px solid ${vars.color.semantic.stroke.alpha.subtler}`,
        boxShadow: SHADOW_DEFAULT,
      },
      post: {
        borderRadius: vars.scheme.semantic.radius[10],
        overflow: "visible",
      },
    },
    cardStyle: {
      outlined: {},
      empty: {},
    },
    isDisabled: {
      true: {
        vars: {
          [titleColor]: vars.color.semantic.object.subtle,
          [labelColor]: vars.color.semantic.object.subtle,
          [bodyColor]: vars.color.semantic.object.subtle,
          [captionColor]: vars.color.semantic.object.subtle,
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "post", cardStyle: "outlined", layout: "vertical" },
      style: { gap: vars.scheme.semantic.spacing[20] },
    },
    {
      variants: { variant: "post", cardStyle: "outlined", layout: "horizontal" },
      style: { gap: vars.scheme.semantic.spacing[20] },
    },
    {
      variants: { variant: "post", cardStyle: "outlined" },
      style: {
        border: `1px solid ${vars.color.semantic.stroke.subtle}`,
        padding: vars.scheme.semantic.spacing[20],
        backgroundColor: vars.color.semantic.surface.shallow,
        boxShadow: SHADOW_DEFAULT,
      },
    },
    {
      variants: { variant: "post", cardStyle: "empty", layout: "vertical" },
      style: { gap: vars.scheme.semantic.spacing[16] },
    },
    {
      variants: { variant: "post", cardStyle: "empty", layout: "horizontal" },
      style: { gap: vars.scheme.semantic.spacing[24] },
    },
    {
      variants: { variant: "post", cardStyle: "empty" },
      style: {
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        boxShadow: "none",
        selectors: {
          '&[data-interactive="true"]:not([data-disabled="true"]):hover': {
            boxShadow: "none",
          },
          '&[data-interactive="true"]:not([data-disabled="true"]):has([data-overlay]:focus-visible)':
            {
              boxShadow: "none",
            },
        },
      },
    },
  ],
});

export const imageContainer = recipe({
  base: {
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
  },
  variants: {
    layout: {
      vertical: { width: "100%" },
      horizontal: {
        height: "100%",
        alignSelf: "stretch",
        aspectRatio: "1 / 1",
      },
    },
    variant: {
      plate: {},
      post: {},
    },
  },
  compoundVariants: [
    {
      variants: { layout: "vertical", variant: "plate" },
      style: {
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    {
      variants: { layout: "horizontal", variant: "plate" },
      style: {
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: 0,
        borderBottomLeftRadius: "inherit",
        borderBottomRightRadius: 0,
      },
    },
  ],
});

export const content = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 0 0",
  },
  variants: {
    variant: {
      plate: {
        padding: vars.scheme.semantic.spacing[20],
        gap: vars.scheme.semantic.spacing[16],
        alignSelf: "stretch",
      },
      post: { gap: vars.scheme.semantic.spacing[16] },
    },
    layout: {
      vertical: {},
      horizontal: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "plate", layout: "vertical" },
      style: { borderTop: `1px solid ${vars.color.semantic.stroke.alpha.subtler}` },
    },
    {
      variants: { variant: "plate", layout: "horizontal" },
      style: { borderLeft: `1px solid ${vars.color.semantic.stroke.alpha.subtler}` },
    },
  ],
});

export const contentMain = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  width: "100%",
  gap: vars.scheme.semantic.spacing[8],
});

export const meta = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 0,
  alignSelf: "stretch",
  gap: vars.scheme.semantic.spacing[8],
});

export const metaItem = style({
  color: captionColor,
  whiteSpace: "nowrap",
});

export const title = style({
  color: titleColor,
  margin: 0,
  alignSelf: "stretch",
  textWrap: "wrap",
});

const ellipsis = style({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const label = recipe({
  base: [
    ellipsis,
    {
      color: labelColor,
      margin: 0,
      alignSelf: "stretch",
    },
  ],
  variants: {
    variant: {
      plate: "semantic-textStyle-label-sm-normal",
      post: "semantic-textStyle-label-lg-bold",
    },
  },
});

export const body = style({
  color: bodyColor,
  margin: 0,
  alignSelf: "stretch",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
});

export const caption = recipe({
  base: [ellipsis, { color: captionColor }],
  variants: {
    standalone: {
      true: "semantic-textStyle-label-sm-subtle",
      false: "semantic-textStyle-label-xs-subtle",
    },
  },
});

export const overlay = recipe({
  base: {
    position: "absolute",
    zIndex: 100,
    textDecoration: "none",
    color: "inherit",
    outline: "none",
    appearance: "none",
    background: "none",
    padding: 0,
    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        boxShadow: `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${vars.color.semantic.accent.normal}`,
        opacity: 0,
        pointerEvents: "none",
        transition: `opacity ${vars.environment.semantic.duration[150]} ${vars.environment.semantic.motion.fluent}`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        backgroundColor: vars.color.semantic.object.assistive,
        opacity: 0,
        pointerEvents: "none",
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },
      '&:not([data-disabled="true"]):hover::after': { opacity: 0.08 },
      '&:not([data-disabled="true"]):active::after': { opacity: 0.12, transition: "none" },
    },
  },
  variants: {
    variant: {
      plate: {
        inset: 0,
        borderRadius: vars.scheme.semantic.radius[12],
      },
      post: { borderRadius: vars.scheme.semantic.radius[10] },
    },
    cardStyle: {
      outlined: {},
      empty: {},
    },
    isDisabled: {
      true: { cursor: "default", pointerEvents: "none" },
      false: { cursor: "pointer", pointerEvents: "auto" },
    },
  },
  compoundVariants: [
    {
      variants: { variant: "post", cardStyle: "outlined" },
      style: {
        inset: 0,
        selectors: {
          "&:focus-visible": {
            boxShadow: `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${vars.color.semantic.accent.normal}`,
          },
        },
      },
    },
    {
      variants: { variant: "post", cardStyle: "empty" },
      style: {
        inset: "-12px",
        selectors: { "&:focus-visible::before": { opacity: 1 } },
      },
    },
    {
      variants: { variant: "plate" },
      style: {
        selectors: {
          "&:focus-visible": {
            boxShadow: `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${vars.color.semantic.accent.normal}`,
          },
        },
      },
    },
  ],
});

export const badge = style({
  position: "absolute",
  top: 8,
  left: 8,
  zIndex: 1,
  minWidth: 18,
  padding: "0 6px",
  borderRadius: 2,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#fff",
  fontSize: 12,
  lineHeight: "18px",
  textAlign: "center",
});

export const horizontalPostContentWrap = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 0 0",
  gap: vars.scheme.semantic.spacing[16],
});

export const horizontalCardPostLayout = style({
  display: "flex",
  gap: vars.scheme.semantic.spacing[24],
  alignItems: "flex-start",
  alignSelf: "stretch",
});
