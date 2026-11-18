import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "../../datePicker.types";

export interface WeekdayLabelProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 표시할 요일 */
  weekday: Weekday;
}
