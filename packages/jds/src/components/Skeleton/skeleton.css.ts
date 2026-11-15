import { keyframes, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { SkeletonRadius } from "./skeleton.types";

const shimmer = keyframes({
  from: { backgroundPosition: "87.5% 0" },
  to: { backgroundPosition: "12.5% 0" },
});

const radiusVariants = Object.fromEntries(
  Object.entries(vars.scheme.semantic.radius).map(([radius, borderRadius]) => [
    radius,
    { borderRadius },
  ]),
) as Record<SkeletonRadius, StyleRule>;

export const skeleton = recipe({
  base: {
    display: "block",
    flexShrink: 0,
    pointerEvents: "none",
    userSelect: "none",
    backgroundImage: `linear-gradient(90deg, ${vars.color.semantic.fill.subtler} 0%, ${vars.color.semantic.fill.subtler} 41.667%, ${vars.color.semantic.fill.subtlest} 50%, ${vars.color.semantic.fill.subtler} 58.333%, ${vars.color.semantic.fill.subtler} 100%)`,
    backgroundSize: "300% 100%",
    backgroundRepeat: "no-repeat",
    animationName: shimmer,
    animationDuration: vars.environment.semantic.duration[1500],
    animationTimingFunction: vars.environment.semantic.motion.fluent,
    animationIterationCount: "infinite",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        animation: "none",
        backgroundColor: vars.color.semantic.fill.subtler,
        backgroundImage: "none",
      },
    },
  },
  variants: {
    radius: radiusVariants,
  },
});
