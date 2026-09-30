import { DAYS_IN_WEEK } from "./parts/Calendar";
import type { CellStatus } from "./parts/Cell";
import type { Weekday } from "./parts/WeekdayLabel";

/** 시간을 무시하고 같은 날짜인지 비교합니다. 둘 다 `null`이면 같다고 봅니다. */
export const isSameDay = (a: Date | null, b: Date | null) => {
  if (a === null || b === null) {
    return a === b;
  }

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/** 셀에 표시할 상태. 선택된 날짜가 오늘이면 `selected`가 우선합니다. */
export const getCellStatus = (date: Date, selected: Date | null, today: Date): CellStatus => {
  if (isSameDay(date, selected)) return "selected";
  if (isSameDay(date, today)) return "current";

  return "normal";
};

/** 같은 날짜의 로컬 자정 */
export const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/** 같은 달 1일의 로컬 자정 */
export const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/** `amount`달 뒤 달의 1일. 일은 유지하지 않습니다. */
export const addMonths = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
};

/** `minDate`, `maxDate` 범위 밖인지 날짜 단위로 판정합니다. 경계 날짜는 범위 안입니다. */
export const isDateOutOfRange = (date: Date, minDate?: Date, maxDate?: Date) => {
  return (
    (minDate !== undefined && date < startOfDay(minDate)) ||
    (maxDate !== undefined && date > startOfDay(maxDate))
  );
};

/** 날짜를 고를 수 있는지 판정하는 조건 */
export interface DateAvailability {
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
}

/** 범위 밖이거나 `isDateDisabled`가 `true`를 돌려주면 고를 수 없는 날짜입니다. */
export const isDateUnavailable = (date: Date, availability: DateAvailability) => {
  return (
    isDateOutOfRange(date, availability.minDate, availability.maxDate) ||
    availability.isDateDisabled?.(date) === true
  );
};

/** `minDate`, `maxDate` 범위 밖인지 달 단위로 판정합니다. `month`는 1일이어야 합니다. */
export const isMonthOutOfRange = (month: Date, minDate?: Date, maxDate?: Date) => {
  return (
    (minDate !== undefined && month < startOfMonth(minDate)) ||
    (maxDate !== undefined && month > startOfMonth(maxDate))
  );
};

/** 범위 밖의 날짜를 가까운 경계 날짜의 자정으로 보정합니다. */
export const clampDate = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate !== undefined && date < startOfDay(minDate)) return startOfDay(minDate);
  if (maxDate !== undefined && date > startOfDay(maxDate)) return startOfDay(maxDate);

  return date;
};

/**
 * @description 키보드로 이동한 뒤 고를 수 있는 날짜를 찾아 나갈 방향
 *
 * @remarks
 * 경계로 보정됐으면 범위 안쪽으로, Home은 뒤로, End는 앞으로, 그 밖의 키는 이동한 방향으로 찾습니다.
 * @param from 키를 누르기 전 날짜
 * @param target `getKeyboardTarget`이 돌려준 날짜
 * @param bounded `target`을 `clampDate`로 보정한 날짜
 * @returns 뒤쪽 날짜로 찾으면 `1`, 앞쪽 날짜로 찾으면 `-1`
 */
export const getSearchDirection = (key: string, from: Date, target: Date, bounded: Date) => {
  if (bounded < target) return -1;
  if (bounded > target) return 1;
  if (key === "Home") return 1;
  if (key === "End") return -1;

  return target > from ? 1 : -1;
};

/** 범위 밖의 달을 가까운 경계 달의 1일로 보정합니다. `month`는 1일이어야 합니다. */
export const clampMonth = (month: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate !== undefined && month < startOfMonth(minDate)) return startOfMonth(minDate);
  if (maxDate !== undefined && month > startOfMonth(maxDate)) return startOfMonth(maxDate);

  return month;
};

const getLeadingDayCount = (month: Date, weekStartsOn: Weekday) => {
  return (startOfMonth(month).getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;
};

const getDayCount = (month: Date) => {
  return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
};

/** 그 달의 날짜를 모두 담는 데 필요한 주 수 */
export const getWeekCount = (month: Date, weekStartsOn: Weekday) => {
  return Math.ceil((getLeadingDayCount(month, weekStartsOn) + getDayCount(month)) / DAYS_IN_WEEK);
};

const addDays = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

const addMonthsKeepingDay = (date: Date, amount: number) => {
  const target = addMonths(date, amount);

  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(date.getDate(), getDayCount(target)),
  );
};

/**
 * @description 격자에서 누른 키가 가리키는 날짜
 *
 * @remarks
 * 방향키는 하루나 한 주, Home과 End는 그 주의 처음과 끝, PageUp과 PageDown은 한 달(Shift를 누르면 1년)씩 이동합니다. 달을 옮길 때 같은 일이 없으면 그 달의 말일로 갑니다.
 * @returns 이동할 날짜. 처리하지 않는 키면 `null`
 */
export const getKeyboardTarget = (
  date: Date,
  key: string,
  hasShift: boolean,
  weekStartsOn: Weekday,
) => {
  const weekOffset = (date.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;

  switch (key) {
    case "ArrowLeft":
      return addDays(date, -1);
    case "ArrowRight":
      return addDays(date, 1);
    case "ArrowUp":
      return addDays(date, -DAYS_IN_WEEK);
    case "ArrowDown":
      return addDays(date, DAYS_IN_WEEK);
    case "Home":
      return addDays(date, -weekOffset);
    case "End":
      return addDays(date, DAYS_IN_WEEK - 1 - weekOffset);
    case "PageUp":
      return addMonthsKeepingDay(date, hasShift ? -12 : -1);
    case "PageDown":
      return addMonthsKeepingDay(date, hasShift ? 12 : 1);
    default:
      return null;
  }
};

const MAX_SEARCH_DAYS = 366;

/**
 * @description `start`부터 `direction` 쪽으로 고를 수 있는 첫 날짜를 찾습니다.
 *
 * @returns 찾은 날짜. 범위를 벗어나거나 1년 안에 없으면 `null`
 */
export const findAvailableDate = (
  start: Date,
  direction: 1 | -1,
  isUnavailable: (date: Date) => boolean,
  minDate?: Date,
  maxDate?: Date,
) => {
  for (let offset = 0; offset <= MAX_SEARCH_DAYS; offset++) {
    const date = addDays(start, offset * direction);

    if (isDateOutOfRange(date, minDate, maxDate)) return null;
    if (!isUnavailable(date)) return date;
  }

  return null;
};

/** 셀의 `data-date` 값. 로컬 날짜 기준입니다. */
export const toDateKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/** 격자의 최대 주 수. `fixedWeeks`이면 항상 이 값을 사용합니다. */
export const MAX_WEEKS_IN_GRID = 6;

/** 격자에 그릴 날짜 목록. 앞뒤 다른 달의 날짜를 포함해 `weekCount`주를 채웁니다. */
export const getGridDates = (
  month: Date,
  weekStartsOn: Weekday,
  weekCount = getWeekCount(month, weekStartsOn),
) => {
  const leadingDayCount = getLeadingDayCount(month, weekStartsOn);
  const cellCount = weekCount * DAYS_IN_WEEK;

  return Array.from(
    { length: cellCount },
    (_, index) => new Date(month.getFullYear(), month.getMonth(), 1 - leadingDayCount + index),
  );
};

const MONTHS_IN_YEAR = 12;

const monthFormatter = new Intl.DateTimeFormat("ko-KR", { month: "long" });

/** 연도 표기. 예: `2026년` */
export const formatYearLabel = (year: number) => {
  return `${year}년`;
};

/** 월 표기. 예: `3월` */
export const formatMonthLabel = (month: Date) => {
  return monthFormatter.format(month);
};

/** 연월 표기. 예: `2026년 3월` */
export const formatYearMonthLabel = (month: Date) => {
  return `${formatYearLabel(month.getFullYear())} ${formatMonthLabel(month)}`;
};

/** 월 목록의 옵션. `value`는 0부터 시작하는 월 번호이고, 범위 밖의 달은 비활성입니다. */
export const getMonthOptions = (year: number, minDate?: Date, maxDate?: Date) => {
  return Array.from({ length: MONTHS_IN_YEAR }, (_, index) => ({
    value: String(index),
    label: formatMonthLabel(new Date(year, index, 1)),
    disabled: isMonthOutOfRange(new Date(year, index, 1), minDate, maxDate),
  }));
};

/** `minYear`부터 `maxYear`까지의 연도 옵션. `maxYear`가 더 작으면 `minYear` 하나만 돌려줍니다. */
export const getYearOptions = (minYear: number, maxYear: number) => {
  return Array.from({ length: Math.max(maxYear - minYear + 1, 1) }, (_, index) => ({
    value: String(minYear + index),
    label: formatYearLabel(minYear + index),
  }));
};
