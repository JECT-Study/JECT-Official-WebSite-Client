import type { ComponentPropsWithoutRef } from "react";

export interface ActionBarProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** "오늘" 버튼을 누르면 호출됩니다. */
  onToday: () => void;
  /** "지우기" 버튼을 누르면 호출됩니다. */
  onClear: () => void;
  /** "적용" 버튼을 누르면 호출됩니다. */
  onApply: () => void;
  /**
   * @description "적용" 버튼 비활성화 여부
   * @default false
   */
  applyDisabled?: boolean;
  /**
   * @description "오늘" 버튼 비활성화 여부
   * @default false
   */
  todayDisabled?: boolean;
  /**
   * @description "지우기" 버튼 비활성화 여부
   * @default false
   */
  clearDisabled?: boolean;
}
