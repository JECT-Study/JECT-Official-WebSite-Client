import { style } from "@vanilla-extract/css";

import { vars } from "../../../../tokens/vars.css";

export const root = style({
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: vars.scheme.semantic.spacing["4"],
  height: "100%",
  padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["4"]}`,
  scrollPaddingBlock: vars.scheme.semantic.spacing["10"],
  overflowX: "clip",
  overflowY: "auto",
  overscrollBehavior: "contain",
  outline: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});
