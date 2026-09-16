import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "../WeekdayLabel";

export const DAYS_IN_WEEK = 7;

export type CalendarRootProps = ComponentPropsWithoutRef<"div"> & {
  "data-part"?: never;
};

export type CalendarWeekdaysProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  "data-part"?: never;
  weekStartsOn?: Weekday;
};

export type CalendarGridProps = ComponentPropsWithoutRef<"div"> & {
  "data-part"?: never;
};
