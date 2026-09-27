import { DAYS_IN_WEEK } from "./parts/Calendar";
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

export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const addMonths = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
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

export const getMonthOptions = (year: number) => {
  return Array.from({ length: MONTHS_IN_YEAR }, (_, index) => ({
    value: String(index),
    label: monthFormatter.format(new Date(year, index, 1)),
  }));
};

export const getYearOptions = (minYear: number, maxYear: number) => {
  return Array.from({ length: Math.max(maxYear - minYear + 1, 1) }, (_, index) => ({
    value: String(minYear + index),
    label: `${minYear + index}년`,
  }));
};
