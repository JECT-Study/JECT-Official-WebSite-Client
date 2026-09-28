import type { ComponentPropsWithoutRef } from "react";

/** `status`로 지정할 수 있는 셀 상태 */
export const CELL_STATUS_OPTIONS = ["normal", "current", "selected"] as const;

/** 날짜 셀의 상태. `current`는 오늘, `selected`는 선택된 날짜입니다. */
export type CellStatus = (typeof CELL_STATUS_OPTIONS)[number];

export interface CellProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 셀이 나타내는 날짜. 화면에는 일만 표시하고, 기본 `aria-label`은 전체 날짜입니다. */
  date: Date;
  /**
   * @description 모습과 `aria-selected`를 정하는 상태
   * @default "normal"
   */
  status?: CellStatus;
  /**
   * @description 표시 중인 달 밖의 날짜인지 여부. 모습은 유지하고 native `disabled`로 선택만 막습니다.
   * @default false
   */
  outsideMonth?: boolean;
  /**
   * @description 오늘 날짜인지 여부. `aria-current="date"`만 부여하고 모습은 바꾸지 않습니다.
   * @default false
   */
  today?: boolean;
  /**
   * @description 비활성화 여부. 비활성 모습으로 바꾸고 native `disabled`로 선택을 막습니다.
   * @default false
   */
  disabled?: boolean;
}
