import type { BadgeSize } from "./badge.types";
import type { textStyleClassNames } from "../../tokens/textStyles.css";

type TextStyleClassName = (typeof textStyleClassNames)[number];

type BadgeSizeConfig = {
  minWidth: number;
  paddingTopBottom: number;
  paddingLeftRight: number;
  textStyle: TextStyleClassName;
};

type DotBadgeSizeConfig = {
  width: number;
  height: number;
};

export const contentBadgeSizeMap = {
  lg: {
    minWidth: 28,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: "semantic-textStyle-label-lg-normal",
  },
  md: {
    minWidth: 27,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: "semantic-textStyle-label-md-normal",
  },
  sm: {
    minWidth: 24,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: "semantic-textStyle-label-sm-normal",
  },
  xs: {
    minWidth: 20,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: "semantic-textStyle-label-xs-normal",
  },
} satisfies Record<BadgeSize, BadgeSizeConfig>;

export const numericBadgeSizeMap = {
  lg: {
    minWidth: 24,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: "semantic-textStyle-label-lg-subtle",
  },
  md: {
    minWidth: 23,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: "semantic-textStyle-label-md-subtle",
  },
  sm: {
    minWidth: 20,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: "semantic-textStyle-label-sm-subtle",
  },
  xs: {
    minWidth: 18,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: "semantic-textStyle-label-xs-subtle",
  },
} satisfies Record<BadgeSize, BadgeSizeConfig>;

export const dotBadgeSizeMap = {
  lg: {
    width: 16,
    height: 16,
  },
  md: {
    width: 12,
    height: 12,
  },
  sm: {
    width: 8,
    height: 8,
  },
  xs: {
    width: 4,
    height: 4,
  },
} satisfies Record<BadgeSize, DotBadgeSizeConfig>;
