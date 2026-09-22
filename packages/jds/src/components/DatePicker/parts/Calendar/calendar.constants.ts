import { DAYS_IN_WEEK } from "./calendar.types";
import { vars } from "../../../../tokens/vars.css";
import { cellSize } from "../Cell/cell.css";

export const calendarCellGap = vars.scheme.semantic.spacing["4"];
export const calendarWeekdayGap = vars.scheme.semantic.spacing["8"];
export const calendarPadding = vars.scheme.semantic.spacing["12"];

const weekdayHeight = vars.typo.primitive.font.lineHeight.label.sm;

export const calendarBodyWidth = `calc(${DAYS_IN_WEEK} * ${cellSize} + ${DAYS_IN_WEEK - 1} * ${calendarCellGap})`;

export const getCalendarBodyHeight = (weekCount: number) =>
  `calc(${weekdayHeight} + ${calendarWeekdayGap} + ${weekCount} * ${cellSize} + ${weekCount - 1} * ${calendarCellGap})`;
