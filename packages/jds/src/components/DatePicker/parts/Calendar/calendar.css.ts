import { style } from "@vanilla-extract/css";
import { pxToRem } from "utils";

import { DAYS_IN_WEEK } from "./calendar.types";
import { vars } from "../../../../tokens/vars.css";

const CALENDAR_COLUMN_SIZE = 32;

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.scheme.semantic.spacing["8"],
  padding: vars.scheme.semantic.spacing["12"],
});

export const weekdays = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.scheme.semantic.spacing["4"],
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: `repeat(${DAYS_IN_WEEK}, ${pxToRem(CALENDAR_COLUMN_SIZE)})`,
  gap: vars.scheme.semantic.spacing["4"],
});
