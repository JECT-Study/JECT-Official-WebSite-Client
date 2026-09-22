import { style } from "@vanilla-extract/css";

import { calendarCellGap, calendarPadding, calendarWeekdayGap } from "./calendar.constants";
import { DAYS_IN_WEEK } from "./calendar.types";
import { cellSize } from "../Cell/cell.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: calendarWeekdayGap,
  padding: calendarPadding,
});

export const weekdays = style({
  display: "flex",
  flexDirection: "row",
  gap: calendarCellGap,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: `repeat(${DAYS_IN_WEEK}, ${cellSize})`,
  gap: calendarCellGap,
});
