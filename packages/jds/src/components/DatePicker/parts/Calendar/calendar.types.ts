import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Weekday } from "../WeekdayLabel";

/** 한 주의 날짜 수. 격자의 열 수입니다. */
export const DAYS_IN_WEEK = 7;

export interface CalendarProps extends ComponentPropsWithoutRef<"div"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 한 주의 시작 요일. `Date.getDay()`와 같이 0은 일요일, 1은 월요일입니다. */
  weekStartsOn: Weekday;
  /** 7열 격자에 차례로 배치할 날짜 셀. 7개씩 한 행으로 묶이고, 행 수는 셀 개수에 따라 정해집니다. */
  children: ReactNode;
}
