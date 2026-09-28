import { DAYS_IN_WEEK } from "./parts/Calendar";
import type { CellStatus } from "./parts/Cell";
import type { Weekday } from "./parts/WeekdayLabel";

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

export const getCellStatus = (date: Date, selected: Date | null, today: Date): CellStatus => {
  if (isSameDay(date, selected)) return "selected";
  if (isSameDay(date, today)) return "current";

  return "normal";
};

export const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const addMonths = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
};

export const isDateOutOfRange = (date: Date, minDate?: Date, maxDate?: Date) => {
  return (
    (minDate !== undefined && date < startOfDay(minDate)) ||
    (maxDate !== undefined && date > startOfDay(maxDate))
  );
};

export interface DateAvailability {
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
}

export const isDateUnavailable = (date: Date, availability: DateAvailability) => {
  return (
    isDateOutOfRange(date, availability.minDate, availability.maxDate) ||
    availability.isDateDisabled?.(date) === true
  );
};

export const isMonthOutOfRange = (month: Date, minDate?: Date, maxDate?: Date) => {
  return (
    (minDate !== undefined && month < startOfMonth(minDate)) ||
    (maxDate !== undefined && month > startOfMonth(maxDate))
  );
};

export const clampDate = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate !== undefined && date < startOfDay(minDate)) return startOfDay(minDate);
  if (maxDate !== undefined && date > startOfDay(maxDate)) return startOfDay(maxDate);

  return date;
};

export const getSearchDirection = (key: string, from: Date, target: Date, bounded: Date) => {
  if (bounded < target) return -1;
  if (bounded > target) return 1;
  if (key === "Home") return 1;
  if (key === "End") return -1;

  return target > from ? 1 : -1;
};

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

export const toDateKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const MAX_WEEKS_IN_GRID = 6;

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

export const formatYearLabel = (year: number) => {
  return `${year}년`;
};

export const formatMonthLabel = (month: Date) => {
  return monthFormatter.format(month);
};

export const formatYearMonthLabel = (month: Date) => {
  return `${formatYearLabel(month.getFullYear())} ${formatMonthLabel(month)}`;
};

export const getMonthOptions = (year: number) => {
  return Array.from({ length: MONTHS_IN_YEAR }, (_, index) => ({
    value: String(index),
    label: formatMonthLabel(new Date(year, index, 1)),
  }));
};

export const getYearOptions = (minYear: number, maxYear: number) => {
  return Array.from({ length: Math.max(maxYear - minYear + 1, 1) }, (_, index) => ({
    value: String(minYear + index),
    label: formatYearLabel(minYear + index),
  }));
};
