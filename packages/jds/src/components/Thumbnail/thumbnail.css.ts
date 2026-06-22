import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import {
  THUMBNAIL_ORIENTATION_OPTIONS,
  THUMBNAIL_RATIO_OPTIONS,
  type ThumbnailAppearance,
  type ThumbnailCornerStyle,
  type ThumbnailOrientation,
  type ThumbnailRatio,
} from "./thumbnail.types";
import { vars } from "../../tokens/vars.css";

export const thumbnailVars = {
  width: createVar(),
  borderColor: createVar(),
} as const;

const ratioBase: Record<ThumbnailRatio, [number, number]> = {
  "1:1": [1, 1],
  "4:5": [4, 5],
  "3:4": [3, 4],
  "2:3": [2, 3],
  "9:16": [9, 16],
  "1:2": [1, 2],
  "9:21": [9, 21],
};

const ratioVariants = Object.fromEntries(THUMBNAIL_RATIO_OPTIONS.map(r => [r, {}])) as Record<
  ThumbnailRatio,
  Record<string, never>
>;

const orientationVariants = {
  portrait: {},
  landscape: {},
} satisfies Record<ThumbnailOrientation, unknown>;

const cornerStyleVariants = {
  angular: { borderRadius: 0 },
  curved: { borderRadius: vars.scheme.semantic.radius["8"] },
  rounded: { borderRadius: vars.scheme.semantic.radius.max },
} satisfies Record<ThumbnailCornerStyle, unknown>;

const appearanceVariants = {
  hollow: { border: "none" },
  outlined: { border: `1px solid ${thumbnailVars.borderColor}` },
} satisfies Record<ThumbnailAppearance, unknown>;

const aspectRatioCompoundVariants = THUMBNAIL_RATIO_OPTIONS.flatMap(r => {
  const [w, h] = ratioBase[r];
  return THUMBNAIL_ORIENTATION_OPTIONS.map(o => ({
    variants: { ratio: r, orientation: o } as const,
    style: {
      aspectRatio: o === "portrait" ? `${w} / ${h}` : `${h} / ${w}`,
    },
  }));
});

const roundedOnlyOnSquareCompoundVariants = THUMBNAIL_RATIO_OPTIONS.filter(r => r !== "1:1").map(
  r => ({
    variants: { ratio: r, cornerStyle: "rounded" as const },
    style: { borderRadius: 0 },
  }),
);

const root = recipe({
  base: {
    position: "relative",
    display: "block",
    margin: 0,
    overflow: "hidden",
    width: thumbnailVars.width,

    appearance: "none",
    background: "none",
    padding: 0,
    font: "inherit",
    textDecoration: "none",
    color: "inherit",

    vars: {
      [thumbnailVars.width]: "100%",
      [thumbnailVars.borderColor]: vars.color.semantic.stroke.alpha.subtle,
    },

    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        boxShadow: "none",
        transition: `box-shadow ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundColor: vars.color.semantic.fill.normal,
        opacity: 0,
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },

      "&:is(button, a)": {
        cursor: "pointer",
      },
      "&:is(button, a):active::after": {
        opacity: `calc(${vars.scheme.semantic.opacity["8"]} * 1%)`,
        transition: "none",
      },
      "&:is(button, a):focus-visible": {
        outline: "none",
      },
      "&:is(button, a):focus-visible::before": {
        boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
        zIndex: 1,
      },
    },
  },
  variants: {
    ratio: ratioVariants,
    orientation: orientationVariants,
    cornerStyle: cornerStyleVariants,
    appearance: appearanceVariants,
  },
  compoundVariants: [...aspectRatioCompoundVariants, ...roundedOnlyOnSquareCompoundVariants],
});

const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderRadius: "inherit",
});

export const thumbnailStyles = {
  root,
  image,
} as const;
