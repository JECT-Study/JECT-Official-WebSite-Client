import { style } from "@vanilla-extract/css";
import { vars } from "tokens";

import { labelColorVar } from "@/utils/typography.css";

export const megaMenuRoot = style({
  display: "flex",
  backgroundColor: vars.color.semantic.surface.shallow,
  border: `1px solid ${vars.color.semantic.stroke.subtler}`,
  borderRadius: vars.scheme.semantic.radius["10"],
  boxShadow: vars.environment.semantic.shadow.floated,
});

export const megaMenuSection = style({
  display: "flex",
  flexDirection: "column",
  padding: `${vars.scheme.semantic.margin.lg} ${vars.scheme.semantic.margin.xl}`,
  gap: vars.scheme.semantic.spacing["20"],
});

export const megaMenuLabel = style({
  vars: {
    [labelColorVar]: vars.color.semantic.object.alternative,
  },
});

export const megaMenuGroup = style({
  display: "flex",
  flexDirection: "column",
  justifyItems: "flex-start",
  alignItems: "flex-start",
  gap: vars.scheme.semantic.spacing["16"],
});

export const megaMenuDivider = style({
  width: 0,
  border: "none",
  borderLeft: `1px solid ${vars.color.semantic.stroke.subtler}`,
  margin: 0,
});
