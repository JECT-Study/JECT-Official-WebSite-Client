import { globalStyle, style } from "@vanilla-extract/css";

export const iconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

globalStyle(`${iconWrapper} > svg`, {
  display: "block",
  flexShrink: 0,
});
