import type { TimePickerFormat, TimeValue } from "./timePicker.types";

/** 열 종류. 배열 순서가 단위의 크기 순서입니다. */
export const TIME_COLUMN_KINDS = ["meridiem", "hour", "minute", "second"] as const;

export type TimeColumnKind = (typeof TIME_COLUMN_KINDS)[number];

/** 형식별로 왼쪽부터 놓을 열 */
export const FORMAT_COLUMNS = {
  hh: ["meridiem", "hour"],
  "hh:mm": ["meridiem", "hour", "minute"],
  "hh:mm:ss": ["meridiem", "hour", "minute", "second"],
  "HH:mm": ["hour", "minute"],
  mm: ["minute"],
  "mm:ss": ["minute", "second"],
  ss: ["second"],
} as const satisfies Record<TimePickerFormat, readonly TimeColumnKind[]>;

/** 열마다 붙이는 접근성 이름 */
export const COLUMN_ARIA_LABELS = {
  meridiem: "오전/오후",
  hour: "시",
  minute: "분",
  second: "초",
} as const satisfies Record<TimeColumnKind, string>;

/** 오전/오후 열 항목 라벨. 인덱스 0이 오전, 1이 오후입니다. */
export const MERIDIEM_LABELS = ["오전", "오후"] as const;

/** Root에 `aria-label`, `aria-labelledby`가 없을 때 사용하는 이름 */
export const DEFAULT_TIME_PICKER_LABEL = "시간 선택";

/**
 * @description 선택 항목으로 부드럽게 스크롤하는 동안 열에 붙는 속성
 *
 * @remarks
 * 스크롤 중에는 마우스를 움직이기 전까지 `:hover`가 클릭한 항목에 남으므로, 이 동안 항목의 hover 오버레이를 숨깁니다.
 */
export const COLUMN_SCROLLING_ATTRIBUTE = "data-scrolling";

/** 선택도 `minTime`도 없을 때 열을 채우는 기준 시각 */
export const MIDNIGHT: TimeValue = { hour: 0, minute: 0, second: 0 };

export const HOURS_PER_DAY = 24;
export const HOURS_PER_HALF_DAY = 12;
export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_MINUTE = 60;
