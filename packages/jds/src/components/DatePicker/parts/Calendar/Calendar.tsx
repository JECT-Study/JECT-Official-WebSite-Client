import { clsx } from "clsx";
import { Children, forwardRef } from "react";

import * as styles from "./calendar.css";
import { DAYS_IN_WEEK, type CalendarProps } from "./calendar.types";
import type { Weekday } from "../../datePicker.types";
import { WeekdayLabel } from "../WeekdayLabel";

/**
 * @description DatePicker에서 요일 헤더 행과 날짜 격자를 배치하는 레이아웃 파츠
 *
 * @remarks
 * 날짜 계산과 셀 상태는 다루지 않습니다. 호출부가 `weekStartsOn`에 맞춘 날짜 셀을 `children`으로 넣으면 `role="grid"`의 행으로 7개씩 묶습니다.
 * @internal
 * @name Calendar
 * @tag div
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ weekStartsOn, children, className, ...restProps }, forwardedRef) => {
    const cells = Children.toArray(children);
    const weeks = Array.from({ length: Math.ceil(cells.length / DAYS_IN_WEEK) }, (_, index) =>
      cells.slice(index * DAYS_IN_WEEK, (index + 1) * DAYS_IN_WEEK),
    );

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        role='grid'
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <div role='row' data-part='weekdays' className={styles.weekdays}>
          {Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
            const weekday = ((weekStartsOn + offset) % DAYS_IN_WEEK) as Weekday;

            return <WeekdayLabel key={weekday} role='columnheader' weekday={weekday} />;
          })}
        </div>
        <div role='rowgroup' data-part='grid' className={styles.grid}>
          {weeks.map((week, index) => (
            <div key={index} role='row' className={styles.week}>
              {week}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

Calendar.displayName = "DatePicker.Calendar";
