import type { ComponentPropsWithoutRef } from "react";

/** `Weekday`로 지정할 수 있는 값 */
export const WEEKDAY_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

/** 요일. `Date.getDay()`와 같이 0은 일요일, 6은 토요일입니다. */
export type Weekday = (typeof WEEKDAY_OPTIONS)[number];

export interface WeekdayLabelProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 표시할 요일 */
  weekday: Weekday;
}
