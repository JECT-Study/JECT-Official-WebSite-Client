import type { ComponentPropsWithoutRef } from "react";

export const DATE_PICKER_VIEW_OPTIONS = ["date", "month", "year"] as const;

export type DatePickerView = (typeof DATE_PICKER_VIEW_OPTIONS)[number];

export const YEAR_RANGE_RADIUS = 10;

/** `Weekday`로 지정할 수 있는 값 */
export const WEEKDAY_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

/** 요일. `Date.getDay()`와 같이 0은 일요일, 6은 토요일입니다. */
export type Weekday = (typeof WEEKDAY_OPTIONS)[number];

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
  /** 표시할 달. 넘기면 표시 중인 달을 호출부가 소유합니다. */
  month?: Date;
  /** 비제어 모드에서 처음 표시할 달. 없으면 선택된 날짜의 달을 표시합니다. */
  defaultMonth?: Date;
  /** 표시 중인 달이 바뀌면 그 달의 1일로 호출됩니다. */
  onMonthChange?: (month: Date) => void;
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
  /**
   * @description 비활성화 여부. 켜면 날짜 선택과 달 이동을 모두 할 수 없습니다.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 읽기 전용 여부. 켜면 달은 이동할 수 있지만 선택은 바꿀 수 없습니다.
   * @default false
   */
  readOnly?: boolean;
  /** 선택할 수 있는 가장 이른 날짜. 이 날짜가 속한 달보다 앞으로는 이동할 수 없습니다. */
  minDate?: Date;
  /** 선택할 수 있는 가장 늦은 날짜. 이 날짜가 속한 달보다 뒤로는 이동할 수 없습니다. */
  maxDate?: Date;
  /** 날짜마다 호출되며, `true`를 반환한 날짜는 선택할 수 없습니다. */
  isDateDisabled?: (date: Date) => boolean;
}
