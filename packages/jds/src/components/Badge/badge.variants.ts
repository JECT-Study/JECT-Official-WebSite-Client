import type { BadgeSize } from "./badge.types";
import { vars } from "tokens";

type BadgeSizeConfig = {
  minWidth: number;
  paddingTopBottom: string;
  paddingLeftRight: string;
};

type DotBadgeSizeConfig = {
  width: number;
  height: number;
};

export const contentBadgeSizeMap = {
  lg: {
    minWidth: 28,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  md: {
    minWidth: 27,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  sm: {
    minWidth: 24,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  xs: {
    minWidth: 20,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
} satisfies Record<BadgeSize, BadgeSizeConfig>;

export const numericBadgeSizeMap = {
  lg: {
    minWidth: 24,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  md: {
    minWidth: 23,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  sm: {
    minWidth: 20,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  xs: {
    minWidth: 18,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
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
