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

const HOVER_DIM_OPACITY = 0.4;
const PRESSED_DIM_OPACITY = 0.6;
const DISABLED_OPACITY = 0.4;
const FOCUS_RING_WIDTH = "3px";

const thumbnailBorderColor = createVar();
const thumbnailDimColor = createVar();

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

const cornerStyleVariants = {
  angular: { borderRadius: 0 },
  curved: { borderRadius: vars.scheme.semantic.radius["8"] },
  rounded: { borderRadius: vars.scheme.semantic.radius.max },
} satisfies Record<ThumbnailCornerStyle, unknown>;

const appearanceVariants = {
  hollow: { border: "none" },
  outlined: { border: `1px solid ${thumbnailBorderColor}` },
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
    width: "100%",

    // asChild로 button/a가 root가 되었을 때 브라우저 기본 스타일 리셋
    appearance: "none",
    background: "none",
    padding: 0,
    font: "inherit",
    textDecoration: "none",
    color: "inherit",

    vars: {
      [thumbnailBorderColor]: vars.color.semantic.stroke.alpha.subtler,
      [thumbnailDimColor]: vars.color.semantic.curtain.static.dimmer,
    },

    selectors: {
      // pseudo-element 정책 점유 — 시각 효과는 인터랙티브 root에서만 발동
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
        backgroundColor: thumbnailDimColor,
        opacity: 0,
        transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
      },

      // root가 button 또는 a일 때만 인터랙션 상태가 의미를 가진다
      "&:is(button, a)": {
        cursor: "pointer",
      },
      "&:is(button, a):hover::after": {
        opacity: HOVER_DIM_OPACITY,
      },
      "&:is(button, a):active::after": {
        opacity: PRESSED_DIM_OPACITY,
        transition: "none",
      },
      "&:is(button, a):focus-visible": {
        outline: "none",
      },
      "&:is(button, a):focus-visible::before": {
        boxShadow: `0 0 0 ${FOCUS_RING_WIDTH} ${vars.color.semantic.interaction.focus}`,
        zIndex: 1,
      },
      "&:is(button, a):disabled": {
        cursor: "default",
        opacity: DISABLED_OPACITY,
      },
      "&:is(button, a)[aria-disabled='true']": {
        cursor: "default",
        opacity: DISABLED_OPACITY,
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
  defaultVariants: {
    ratio: "1:1",
    orientation: "portrait",
    cornerStyle: "curved",
    appearance: "outlined",
  },
});

const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderRadius: "inherit",
});

/**
 * @description
 * slot 단위 스타일 묶음, 합성 컴포넌트의 part 분리 기준과 동일하게 선언한다.
 *   - root  : <Comp>(div | button | a)에 적용되는 recipe (variant 보유)
 *   - image : 내부 <img> 고정 스타일
 *
 * slot이 늘어나는 컴포넌트(Card/Banner 등)도 같은 형태로 묶어 "어느 part에 어떤
 * 스타일이 적용되는가"를 한 객체에서 즉시 파악할 수 있게 한다.
 */
export const thumbnailStyles = {
  root,
  image,
} as const;
