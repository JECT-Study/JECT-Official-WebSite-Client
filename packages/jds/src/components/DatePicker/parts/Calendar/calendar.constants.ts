import { vars } from "../../../../tokens/vars.css";
import { DAYS_IN_WEEK } from "../../datePicker.constants";
import { cellSize } from "../Cell/cell.css";

/** 날짜 셀 사이 간격. 격자 너비와 높이 계산에도 사용합니다. */
export const calendarCellGap = vars.scheme.semantic.spacing["4"];
/** 요일 행과 날짜 격자 사이 간격 */
export const calendarWeekdayGap = vars.scheme.semantic.spacing["8"];
/** 달력 본문의 안쪽 여백. DatePicker 패널 너비 계산에도 사용합니다. */
export const calendarPadding = vars.scheme.semantic.spacing["12"];

const weekdayHeight = vars.typo.primitive.font.lineHeight.label.sm;

/** 7열 격자의 너비. DatePicker 패널 너비의 기준입니다. */
export const calendarBodyWidth = `calc(${DAYS_IN_WEEK} * ${cellSize} + ${DAYS_IN_WEEK - 1} * ${calendarCellGap})`;

/** 요일 행과 `weekCount`주 격자를 합친 높이. 월, 연도 목록도 이 높이를 사용합니다. */
export const getCalendarBodyHeight = (weekCount: number) => {
  return `calc(${weekdayHeight} + ${calendarWeekdayGap} + ${weekCount} * ${cellSize} + ${weekCount - 1} * ${calendarCellGap})`;
};
