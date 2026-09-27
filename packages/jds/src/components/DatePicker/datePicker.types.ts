import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "./parts/WeekdayLabel";

export const DATE_PICKER_VIEW_OPTIONS = ["calendar", "month", "year"] as const;

export type DatePickerView = (typeof DATE_PICKER_VIEW_OPTIONS)[number];

export const YEAR_RANGE_RADIUS = 10;

export interface DatePickerProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onChange" | "defaultValue"
> {
  "data-part"?: never;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  weekStartsOn?: Weekday;
  withActionBar?: boolean;
  minYear?: number;
  maxYear?: number;
}
