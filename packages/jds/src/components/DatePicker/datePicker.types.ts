import type { ComponentPropsWithoutRef } from "react";

import type { Weekday } from "./parts/WeekdayLabel";

export const DATE_PICKER_VIEW_OPTIONS = ["date", "month", "year"] as const;

export type DatePickerView = (typeof DATE_PICKER_VIEW_OPTIONS)[number];

export const YEAR_RANGE_RADIUS = 10;

export interface DatePickerProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onChange" | "defaultValue"
> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 선택된 날짜. 넘기면 선택 상태를 호출부가 소유합니다. */
  value?: Date | null;
  /**
   * @description 비제어 모드의 시작 선택값
   * @default null
   */
  defaultValue?: Date | null;
  /** 선택이 확정되면 새 날짜로 호출됩니다. 날짜는 로컬 시간대 자정 기준입니다. */
  onChange?: (date: Date | null) => void;
  /** 처음 표시할 달. 없으면 선택된 날짜의 달을 표시합니다. */
  defaultMonth?: Date;
  /**
   * @description 한 주의 시작 요일. 0은 일요일입니다.
   * @default 1
   */
  weekStartsOn?: Weekday;
  /**
   * @description 오늘, 지우기, 적용 버튼 표시 여부. 켜면 적용을 눌러야 선택이 확정됩니다.
   * @default false
   */
  withActionBar?: boolean;
  /**
   * @description 모든 달을 6주로 표시할지 여부. 끄면 달에 필요한 주 수만 표시합니다.
   * @default false
   */
  fixedWeeks?: boolean;
  /** 연도 목록과 달 이동의 하한 연도 */
  minYear?: number;
  /** 연도 목록과 달 이동의 상한 연도 */
  maxYear?: number;
}
