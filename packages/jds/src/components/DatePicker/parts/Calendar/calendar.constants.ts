import { DAYS_IN_WEEK } from "./calendar.types";
import { vars } from "../../../../tokens/vars.css";
import { cellSize } from "../Cell/cell.css";

export const calendarCellGap = vars.scheme.semantic.spacing["4"];
export const calendarWeekdayGap = vars.scheme.semantic.spacing["8"];
export const calendarPadding = vars.scheme.semantic.spacing["12"];

const weekdayHeight = vars.typo.primitive.font.lineHeight.label.sm;

export const calendarBodyWidth = `calc(${DAYS_IN_WEEK} * ${cellSize} + ${DAYS_IN_WEEK - 1} * ${calendarCellGap})`;

/** 요일 행과 `weekCount`주 격자를 합친 높이. 월, 연도 목록도 이 높이를 사용합니다. */
export const getCalendarBodyHeight = (weekCount: number) => {
  return `calc(${weekdayHeight} + ${calendarWeekdayGap} + ${weekCount} * ${cellSize} + ${weekCount - 1} * ${calendarCellGap})`;
};
