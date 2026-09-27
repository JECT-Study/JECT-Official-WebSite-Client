import type { ComponentPropsWithoutRef } from "react";

export const WEEKDAY_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

export type Weekday = (typeof WEEKDAY_OPTIONS)[number];

export interface WeekdayLabelProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  "data-part"?: never;
  weekday: Weekday;
}
