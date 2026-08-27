import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { vars } from "../../../tokens/vars.css";
import { focusRing } from "../../../utils/focusRing.css";
import { overlay as overlayInteraction, overlayColor } from "../../../utils/overlay.css";
import { CARD_PART_CAPTION, CARD_PART_OVERLAY } from "../card.types";

const titleColor = createVar();
const bodyColor = createVar();
const captionColor = createVar();

const horizontalImageSize = createVar();
const horizontalPlateHeight = pxToRem(120);
const horizontalPlateCaptionHeight = pxToRem(152);

export const root = recipe({
  base: {
    position: "relative",
    zIndex: 0,
    display: "flex",
    width: "100%",
    vars: {
      [titleColor]: vars.color.semantic.object.bolder,
      [bodyColor]: vars.color.semantic.object.normal,
      [captionColor]: vars.color.semantic.object.alternative,
    },
    selectors: {
      "&[data-interactive]:not([data-disabled])": {
        transition: `transform ${vars.environment.semantic.duration[150]} ${vars.environment.semantic.motion.fluent}, box-shadow ${vars.environment.semantic.duration[150]} ${vars.environment.semantic.motion.fluent}`,
      },
      "&[data-interactive]:not([data-disabled]):hover": {
        transform: "translateY(-2px)",
        boxShadow: vars.environment.semantic.shadow.raised,
      },
      "&[data-interactive]:not([data-disabled]):active": {
        transform: "translateY(0)",
        transition: "none",
      },
      [`&[data-interactive]:not([data-disabled]):has([data-part='${CARD_PART_OVERLAY}']:focus-visible)`]: {
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
        minWidth: pxToRem(240),
        borderRadius: vars.scheme.semantic.radius[12],
        backgroundColor: vars.color.semantic.surface.shallow,
        /*
         * 디자인 치수가 stroke를 제외한 값이라 border로 그리면 border-box 안쪽이 그만큼 줄어든다.
         * outline은 레이아웃 박스를 차지하지 않아 안쪽 높이를 그대로 둔다.
         */
        outline: `1px solid ${vars.color.semantic.stroke.subtle}`,
        boxShadow: vars.environment.semantic.shadow.embossed,
      },
      post: {
        selectors: {
          "&[data-interactive]:not([data-disabled]):hover": {
            boxShadow: "none",
          },
          [`&[data-interactive]:not([data-disabled]):has([data-part='${CARD_PART_OVERLAY}']:focus-visible)`]: {
            boxShadow: "none",
          },
        },
      },
    },
    isDisabled: {
      true: {
        vars: {
          [titleColor]: vars.color.semantic.object.subtle,
          [bodyColor]: vars.color.semantic.object.subtle,
          [captionColor]: vars.color.semantic.object.subtle,
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "post", layout: "vertical" },
      style: { gap: vars.scheme.semantic.spacing[16] },
    },
    {
      variants: { variant: "post", layout: "horizontal" },
      style: { gap: vars.scheme.semantic.spacing[24] },
    },
    {
      variants: { variant: "plate", layout: "horizontal" },
      style: {
        height: horizontalPlateHeight,
        vars: {
          [horizontalImageSize]: horizontalPlateHeight,
        },
        selectors: {
          [`&:has([data-part='${CARD_PART_CAPTION}'])`]: {
            height: horizontalPlateCaptionHeight,
            vars: {
              [horizontalImageSize]: horizontalPlateCaptionHeight,
            },
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
      horizontal: {},
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
        width: horizontalImageSize,
        height: horizontalImageSize,
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: 0,
        borderBottomLeftRadius: "inherit",
        borderBottomRightRadius: 0,
      },
    },
    {
      variants: { layout: "horizontal", variant: "post" },
      style: {
        width: pxToRem(80),
        height: pxToRem(80),
        alignSelf: "flex-start",
      },
    },
  ],
});

export const thumbnailFill = recipe({
  variants: {
    isHorizontal: {
      true: { position: "absolute", inset: 0, aspectRatio: "auto" },
      false: {},
    },
  },
});

export const content = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 0 0",
    minWidth: 0,
    gap: vars.scheme.semantic.spacing[16],
  },
  variants: {
    variant: {
      plate: { padding: vars.scheme.semantic.margin.sm },
      post: {},
    },
    layout: {
      vertical: {},
      horizontal: {},
    },
  },
  compoundVariants: [
    /*
     * 구분선도 root의 outline과 같은 이유로 border를 쓰지 않는다.
     * inset box-shadow는 레이아웃 박스를 차지하지 않으면서 한 면만 그릴 수 있다.
     */
    {
      variants: { variant: "plate", layout: "vertical" },
      style: { boxShadow: `inset 0 1px 0 ${vars.color.semantic.stroke.subtle}` },
    },
    {
      variants: { variant: "plate", layout: "horizontal" },
      style: { boxShadow: `inset 1px 0 0 ${vars.color.semantic.stroke.subtle}` },
    },
  ],
});

export const contentGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  width: "100%",
  gap: vars.scheme.semantic.spacing[10],
});

export const meta = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "stretch",
  gap: vars.scheme.semantic.spacing[12],
});

export const metaItem = style({
  display: "block",
  cursor: "default",
  color: captionColor,
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const title = style({
  display: "block",
  color: titleColor,
  cursor: "default",
  margin: 0,
  alignSelf: "stretch",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const body = recipe({
  base: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    color: bodyColor,
    margin: 0,
    alignSelf: "stretch",
    textAlign: "left",
  },
  variants: {
    variant: {
      plate: { minHeight: pxToRem(44) },
      post: {},
    },
  },
});

export const caption = style({
  color: captionColor,
  cursor: "default",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  overflow: "hidden",
});

const overlayBase = style({
  position: "absolute",
  zIndex: 1,
  textDecoration: "none",
  color: "inherit",
  appearance: "none",
  background: "none",
  padding: 0,
  vars: {
    [overlayColor]: vars.color.semantic.object.assistive,
  },
  selectors: {
    "&::before, &::after": { inset: 0, borderRadius: "inherit" },
  },
});

export const overlay = recipe({
  base: [overlayInteraction(), focusRing(), overlayBase],
  variants: {
    variant: {
      plate: {
        inset: 0,
        borderRadius: vars.scheme.semantic.radius[12],
      },
      post: {
        inset: `calc(${vars.scheme.semantic.spacing[12]} * -1)`,
        borderRadius: vars.scheme.semantic.radius[10],
      },
    },
    isDisabled: {
      true: { cursor: "default", pointerEvents: "none" },
      false: { cursor: "pointer", pointerEvents: "auto" },
    },
  },
});
