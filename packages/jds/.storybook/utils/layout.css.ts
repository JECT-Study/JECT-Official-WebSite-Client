import { createVar, style } from "@vanilla-extract/css";

export const gapVar = createVar();

export const flexRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: gapVar,
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: gapVar,
});

export const label = style({
  width: "100px",
});
