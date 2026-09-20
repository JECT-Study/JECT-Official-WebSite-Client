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

export const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const getLeadingDayCount = (month: Date, weekStartsOn: Weekday) =>
  (startOfMonth(month).getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;

const getDayCount = (month: Date) =>
  new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

export const getWeekCount = (month: Date, weekStartsOn: Weekday) =>
  Math.ceil((getLeadingDayCount(month, weekStartsOn) + getDayCount(month)) / DAYS_IN_WEEK);

export const getGridDates = (month: Date, weekStartsOn: Weekday) => {
  const leadingDayCount = getLeadingDayCount(month, weekStartsOn);
  const cellCount = getWeekCount(month, weekStartsOn) * DAYS_IN_WEEK;

  return Array.from(
    { length: cellCount },
    (_, index) => new Date(month.getFullYear(), month.getMonth(), 1 - leadingDayCount + index),
  );
};
