import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "./parts/WeekdayLabel";

export type DatePickerProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onChange" | "defaultValue"
> & {
  "data-part"?: never;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  weekStartsOn?: Weekday;
  withActionBar?: boolean;
  onYearClick?: () => void;
  onMonthClick?: () => void;
};
