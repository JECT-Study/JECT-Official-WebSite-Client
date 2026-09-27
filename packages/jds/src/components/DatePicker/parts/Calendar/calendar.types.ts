import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "../WeekdayLabel";

export const DAYS_IN_WEEK = 7;

export interface CalendarProps extends ComponentPropsWithoutRef<"div"> {
  "data-part"?: never;
  weekStartsOn?: Weekday;
}
