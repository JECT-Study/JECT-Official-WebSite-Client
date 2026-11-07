import type { ComponentPropsWithoutRef } from "react";

/** `format`으로 지정할 수 있는 값 */
export const TIME_PICKER_FORMAT_OPTIONS = [
  "hh",
  "hh:mm",
  "hh:mm:ss",
  "HH:mm",
  "mm",
  "mm:ss",
  "ss",
] as const;

/**
 * @description 표시할 열 구성
 *
 * @remarks
 * `hh`는 오전, 오후 열이 붙는 12시간제, `HH`는 24시간제입니다.
 * 시 열이 없는 `mm`, `mm:ss`, `ss`도 시간 길이가 아니라 시각을 입력하며, 화면에 없는 단위는 현재 값을 유지합니다.
 */
export type TimePickerFormat = (typeof TIME_PICKER_FORMAT_OPTIONS)[number];

/** `minuteStep`, `secondStep`으로 지정할 수 있는 값 */
export const TIME_STEP_OPTIONS = [1, 5, 10, 15, 30] as const;

/** 분, 초 목록의 간격 */
export type TimeStep = (typeof TIME_STEP_OPTIONS)[number];

/** 날짜와 시간대 없이 하루 안의 시각만 나타내는 값 */
export interface TimeValue {
  /** 0~23. 12시간제로 표시해도 24시간 기준으로 담습니다. */
  hour: number;
  /** 0~59 */
  minute: number;
  /** 0~59. 초 열이 없는 형식에서도 값을 유지합니다. */
  second: number;
}

export interface TimePickerProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onChange" | "defaultValue"
> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /**
   * @description 표시할 열 구성
   * @default "hh:mm"
   */
  format?: TimePickerFormat;
  /** 선택된 시각. 넘기면 선택 상태를 호출부가 소유합니다. `null`은 선택 없음입니다. */
  value?: TimeValue | null;
  /**
   * @description 비제어 모드의 시작 선택값
   * @default null
   */
  defaultValue?: TimeValue | null;
  /**
   * @description 선택이 확정되면 새 시각으로 호출됩니다.
   *
   * @remarks
   * 선택이 없는 상태에서 한 열만 고르면 나머지 단위는 `minTime`, 없으면 00:00:00에서 채웁니다.
   */
  onChange?: (value: TimeValue) => void;
  /**
   * @description 분 목록의 간격. 간격에 맞지 않는 분이 들어오면 값은 그대로 두고 분 열에 선택 표시를 하지 않습니다.
   * @default 5
   */
  minuteStep?: TimeStep;
  /**
   * @description 초 목록의 간격. 간격에 맞지 않는 초가 들어오면 값은 그대로 두고 초 열에 선택 표시를 하지 않습니다.
   * @default 5
   */
  secondStep?: TimeStep;
  /**
   * @description 선택할 수 있는 가장 이른 시각
   *
   * @remarks
   * `maxTime`보다 늦으면 안 됩니다. 자정을 넘는 범위는 지원하지 않습니다.
   */
  minTime?: TimeValue;
  /** 선택할 수 있는 가장 늦은 시각 */
  maxTime?: TimeValue;
  /**
   * @description 적용 버튼 표시 여부. 켜면 적용을 눌러야 선택이 확정됩니다.
   * @default false
   */
  withActionBar?: boolean;
  /**
   * @description 비활성화 여부. 켜면 모든 열을 조작하거나 포커스할 수 없습니다.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 읽기 전용 여부. 켜면 열은 탐색할 수 있지만 선택은 바꿀 수 없습니다.
   * @default false
   */
  readOnly?: boolean;
}
