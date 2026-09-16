import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./calendar.css";
import {
  DAYS_IN_WEEK,
  type CalendarGridProps,
  type CalendarRootProps,
  type CalendarWeekdaysProps,
} from "./calendar.types";
import { WeekdayLabel, type Weekday } from "../WeekdayLabel";

const CalendarRoot = forwardRef<HTMLDivElement, CalendarRootProps>(
  ({ children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      {children}
    </div>
  ),
);

CalendarRoot.displayName = "DatePicker.Calendar.Root";

const CalendarWeekdays = forwardRef<HTMLDivElement, CalendarWeekdaysProps>(
  ({ weekStartsOn = 1, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='weekdays'
      className={clsx(styles.weekdays, className)}
    >
      {Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
        const weekday = ((weekStartsOn + offset) % DAYS_IN_WEEK) as Weekday;

        return <WeekdayLabel key={weekday} weekday={weekday} />;
      })}
    </div>
  ),
);

CalendarWeekdays.displayName = "DatePicker.Calendar.Weekdays";

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='grid'
      className={clsx(styles.grid, className)}
    >
      {children}
    </div>
  ),
);

CalendarGrid.displayName = "DatePicker.Calendar.Grid";

export const Calendar = {
  Root: CalendarRoot,
  Weekdays: CalendarWeekdays,
  Grid: CalendarGrid,
};
