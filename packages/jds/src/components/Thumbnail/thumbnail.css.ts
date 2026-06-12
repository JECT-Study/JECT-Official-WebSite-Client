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

// TODO: 임시 하드코딩 — 디자인 토큰 마이그레이션(별도 작업) 완료 후 토큰으로 교체할 것
//   hover dim        = fill.normal               (rgba(1,1,9,0.54), 알파 내장)
//   active 추가 레이어 = fill.normal @ opacity-8 (0.08) — hover 레이어 위에 스택
//                       아래 값은 그 스택 레이어를 합성(0.54 × 0.08 ≈ 0.043)한 단일 색 임시 표현
const HOVER_DIM_COLOR = "rgba(1, 1, 9, 0.54)";
const PRESS_DIM_LAYER_COLOR = "rgba(1, 1, 9, 0.043)";
// TODO: 임시 하드코딩 — 디자인 토큰 마이그레이션 완료 후 토큰으로 교체할 것
//   color = accent.alpha.alternative (rgba(6,87,254,0.56)),  width = stroke-weight-2 (2px)
const FOCUS_RING_WIDTH = "2px";
const FOCUS_RING_COLOR = "rgba(6, 87, 254, 0.56)";

const ratioBase: Record<ThumbnailRatio, [number, number]> = {
  "1:1": [1, 1],
  "4:5": [4, 5],
  "3:4": [3, 4],
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

export const thumbnailVars = {
  width: createVar(),
  borderColor: createVar(),
} as const;

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
      [thumbnailVars.borderColor]: vars.color.semantic.stroke.alpha.subtler,
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
        backgroundColor: HOVER_DIM_COLOR,
        opacity: 0,
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },

      "&:is(button, a)": {
        cursor: "pointer",
      },
      "&:is(button, a):hover::after": {
        opacity: 1,
      },
      "&:is(button, a):active::after": {
        opacity: 1,
        backgroundImage: `linear-gradient(${PRESS_DIM_LAYER_COLOR}, ${PRESS_DIM_LAYER_COLOR})`,
        transition: "none",
      },
      "&:is(button, a):focus-visible": {
        outline: "none",
      },
      "&:is(button, a):focus-visible::before": {
        boxShadow: `inset 0 0 0 ${FOCUS_RING_WIDTH} ${FOCUS_RING_COLOR}`,
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

const fallback = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "inherit",
  // TODO: 토큰 마이그레이션(별도 작업) 후 배경을 primitive/flow/alpha/50 으로 교체할 것
  //       현행 토큰셋에 해당 토큰 미존재로 보류 — 임시로 surface.deeper 유지
  backgroundColor: vars.color.semantic.surface.deeper,
  color: vars.color.semantic.object.subtlest,
});

export const thumbnailStyles = {
  root,
  image,
  fallback,
} as const;
