import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

import type { SelectDimension, SelectOption } from "../../../Listbox";

interface OptionListBaseProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onSelect" | "aria-label" | "aria-labelledby"
> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 목록에 표시할 연도나 월 옵션 */
  options: Pick<SelectOption, "value" | "label" | "disabled">[];
  /** 선택된 옵션의 `value`. 선택 상태는 호출부가 소유합니다. */
  value: string;
  /** 목록 높이. 달력 본문 높이를 넘겨 보기를 전환해도 패널 크기가 유지되게 합니다. */
  height: SelectDimension;
  /** 옵션을 고르면 그 옵션의 `value`로 호출됩니다. 이미 선택된 옵션을 다시 골라도 호출됩니다. */
  onSelect: (value: string) => void;
}

export type OptionListProps = OptionListBaseProps & AriaLabelProps;
