import { style, styleVariants } from "@vanilla-extract/css";
import { textStyles, vars } from "tokens";
import { focusRing, overlay } from "utils";

export const preview = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.scheme.semantic.spacing["24"],
  width: "min(720px, calc(100vw - 32px))",
  height: 576,
  boxSizing: "border-box",
  padding: vars.scheme.semantic.spacing["40"],
  overflow: "hidden",
  backgroundColor: vars.color.semantic.surface.standard,
  color: vars.color.semantic.object.bolder,
  "@media": {
    "screen and (max-width: 599px)": {
      padding: vars.scheme.semantic.spacing["16"],
    },
  },
});

export const pageTitle = style({ ...textStyles.title["3"], flexShrink: 0, margin: 0 });

export const projectGrid = style({
  display: "grid",
  flexShrink: 0,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
  gap: vars.scheme.semantic.spacing["16"],
});

export const projectCard = style({
  boxSizing: "border-box",
  overflow: "hidden",
  border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  selectors: {
    "&&": {
      minWidth: 0,
      outline: "none",
      boxShadow: "none",
    },
  },
});

export const titleSlot = style({
  display: "flex",
  alignItems: "center",
  minHeight: textStyles.title["1"].lineHeight,
  width: "100%",
});

export const bodyLines = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: vars.scheme.semantic.spacing["8"],
  minHeight: `calc(${textStyles.body.sm.normal.lineHeight} * 2)`,
  width: "100%",
});

export const projectCaptionSlot = style({
  display: "flex",
  alignItems: "center",
  minHeight: textStyles.label.xs.subtle.lineHeight,
});

export const filters = style({
  display: "flex",
  flexShrink: 0,
  flexWrap: "wrap",
  gap: vars.scheme.semantic.spacing["8"],
});

export const filterChip = style([
  focusRing(),
  overlay({ density: "normal" }),
  {
    ...textStyles.label.md.normal,
    position: "relative",
    flexShrink: 0,
    paddingBlock: vars.scheme.semantic.spacing["4"],
    paddingInline: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["8"]}`,
    border: "none",
    boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${vars.color.semantic.stroke.alpha.subtle}`,
    borderRadius: vars.scheme.semantic.radius.max,
    background: "transparent",
    color: vars.color.semantic.object.normal,
    whiteSpace: "nowrap",
    cursor: "pointer",
    selectors: {
      "&::before, &::after": { inset: 0, borderRadius: "inherit" },
      "&[aria-pressed='true']": {
        boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${vars.color.semantic.accent.alpha.subtle}`,
        backgroundColor: vars.color.semantic.accent.alpha.subtlest,
        color: vars.color.semantic.accent.bold,
      },
    },
  },
]);

export const posts = style({
  display: "flex",
  flexShrink: 0,
  flexDirection: "column",
  gap: vars.scheme.semantic.spacing["24"],
});

export const captionSlot = style({
  display: "flex",
  alignItems: "center",
  paddingBlock: vars.scheme.semantic.spacing["3"],
});

export const memberGrid = style({
  display: "grid",
  flexShrink: 0,
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  columnGap: vars.scheme.semantic.spacing["16"],
  rowGap: vars.scheme.semantic.spacing["32"],
});

export const member = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["12"],
  minWidth: 0,
});

export const memberDetails = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const nameSlot = style({
  display: "flex",
  alignItems: "center",
  paddingBlock: vars.scheme.semantic.spacing["4"],
});

export const positionSlot = style({
  display: "flex",
  alignItems: "center",
  minHeight: textStyles.body.sm.normal.lineHeight,
});

export const projectImageSkeleton = style({ width: "100%", height: 208 });

const titleSkeleton = style({ height: textStyles.title["1"].fontSize });

export const projectTitleSkeleton = style([titleSkeleton, { width: "min(180px, 100%)" }]);
export const postTitleSkeleton = style([titleSkeleton, { width: "min(360px, 100%)" }]);

export const bodyLineSkeleton = style({
  width: "100%",
  height: textStyles.body.sm.normal.fontSize,
});

export const projectBodyLastSkeleton = style([bodyLineSkeleton, { width: "min(160px, 100%)" }]);
export const postBodyLastSkeleton = style([bodyLineSkeleton, { width: "min(300px, 100%)" }]);

const captionSkeleton = style({ height: textStyles.body["2xs"].normal.fontSize });

export const projectCaptionSkeleton = style([captionSkeleton, { width: 64 }]);
export const postAuthorSkeleton = style([captionSkeleton, { width: 40 }]);
export const postDateSkeleton = style([captionSkeleton, { width: 100 }]);

export const postThumbnailSkeleton = style({ width: 80, height: 80 });
export const memberProfileSkeleton = style({ width: 120, height: 120 });

export const memberNameSkeleton = styleVariants({ 48: 48, 56: 56, 64: 64, 72: 72 }, width => ({
  width,
  height: textStyles.label.lg.normal.fontSize,
}));

export const memberPositionSkeleton = styleVariants(
  { 80: 80, 88: 88, 96: 96, 104: 104 },
  width => ({ width, height: textStyles.body.sm.normal.fontSize }),
);
