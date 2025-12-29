import type { KeyboardEvent } from "react";

interface CreateSelectItemHandlersParams {
  value: string;
  isDisabled: boolean;
  isSelected: (value: string) => boolean;
  onChange: (value: string) => void;
}

interface CreateSelectItemHandlersReturn {
  isItemSelected: boolean;
  handleClick: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Select 아이템의 이벤트 핸들러와 상태를 생성하는 순수 함수
 *
 * SelectLabel, SelectRadio, SelectCheckbox 간의 공통 로직을 추출하였습니다.
 *
 * @example
 * const { isItemSelected, handleClick, handleKeyDown } = createSelectItemHandlers({
 *   value: 'apple',
 *   isDisabled: false,
 *   isSelected: (v) => selectedValue === v,
 *   onChange: (v) => setSelectedValue(v),
 * });
 */
export const createSelectItemHandlers = ({
  value,
  isDisabled,
  isSelected,
  onChange,
}: CreateSelectItemHandlersParams): CreateSelectItemHandlersReturn => {
  const isItemSelected = isSelected(value);

  const handleClick = () => {
    if (!isDisabled) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onChange(value);
    }
  };

  return {
    isItemSelected,
    handleClick,
    handleKeyDown,
  };
};
