import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./calendar.css";
import { DAYS_IN_WEEK, type CalendarProps } from "./calendar.types";
import { WeekdayLabel, type Weekday } from "../WeekdayLabel";

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ weekStartsOn = 1, children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      <div data-part='weekdays' className={styles.weekdays}>
        {Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
          const weekday = ((weekStartsOn + offset) % DAYS_IN_WEEK) as Weekday;

          return <WeekdayLabel key={weekday} weekday={weekday} />;
        })}
      </div>
      <div data-part='grid' className={styles.grid}>
        {children}
      </div>
    </div>
  ),
);

Calendar.displayName = "DatePicker.Calendar";
