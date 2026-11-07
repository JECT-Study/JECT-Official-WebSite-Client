import type { ComponentPropsWithoutRef } from "react";

export interface ItemProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 열 안에서 항목을 구분하는 값. 활성 항목 이동이 이 값으로 항목을 찾습니다. */
  value: string;
  /** 화면에 표시할 라벨 */
  label: string;
  /**
   * @description 선택 여부. 모습과 `aria-selected`를 함께 정합니다.
   * @default false
   */
  selected?: boolean;
  /**
   * @description 키보드 활성 항목 여부. 열에 키보드 포커스가 있을 때만 포커스 링이 보입니다.
   * @default false
   */
  active?: boolean;
  /**
   * @description 비활성화 여부. 비활성 모습으로 바꾸고 키보드 이동에서 건너뜁니다. 누름은 호출부가 막습니다.
   * @default false
   */
  disabled?: boolean;
}
