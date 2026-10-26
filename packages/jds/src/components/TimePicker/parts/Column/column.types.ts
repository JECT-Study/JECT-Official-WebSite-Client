import type { ComponentPropsWithoutRef } from "react";

import type { TimeColumnOption } from "../../timePicker.utils";

export interface ColumnProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onSelect" | "aria-label"
> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 열의 접근성 이름. 예: "시", "분" */
  "aria-label": string;
  /** 표시할 항목 */
  options: TimeColumnOption[];
  /** 선택된 항목 값. 일치하는 항목이 없거나 `null`이면 선택 표시를 하지 않습니다. */
  value: number | null;
  /** 항목을 누르거나 Enter, Space로 고르면 호출됩니다. 이미 선택된 항목을 다시 골라도 호출됩니다. */
  onSelect: (value: number) => void;
  /**
   * @description 선택 항목을 열 맨 위로 스크롤할지 여부. 끄면 스크롤과 끝 여백을 두지 않으므로, 모든 항목이 열 높이 안에 들어갈 때만 끕니다.
   * @default true
   */
  alignSelectedToTop?: boolean;
  /**
   * @description 비활성화 여부. 켜면 열이 포커스를 받지 않고 모든 항목이 비활성 모습이 됩니다.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 읽기 전용 여부. 켜면 항목을 탐색할 수 있지만 `onSelect`는 호출되지 않습니다.
   * @default false
   */
  readOnly?: boolean;
}
