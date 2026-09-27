import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./calendar.css";
import { DAYS_IN_WEEK, type CalendarProps } from "./calendar.types";
import { WeekdayLabel, type Weekday } from "../WeekdayLabel";

/**
 * @description DatePicker에서 요일 헤더 행과 날짜 격자를 배치하는 레이아웃 파츠
 *
 * @remarks
 * 날짜 계산과 셀 상태는 다루지 않습니다. 호출부가 `weekStartsOn`에 맞춘 날짜 셀을 `children`으로 넣습니다.
 * @internal
 * @name Calendar
 * @tag div
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ weekStartsOn, children, className, ...restProps }, forwardedRef) => (
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
