import { forwardRef } from "react";

import { createSelectItemHandlers } from "./createSelectItemHandlers";
import { useSelectContext } from "./Select";
import {
  StyledSelectItem,
  StyledSelectItemContent,
  StyledSelectItemText,
  StyledSelectItemCaption,
  StyledSelectItemInputWrapper,
} from "./select.styles";
import type { SelectCheckboxProps } from "./select.types";

export const SelectCheckbox = forwardRef<HTMLDivElement, SelectCheckboxProps>(
  ({ value, isDisabled = false, caption, children, ...restProps }, ref) => {
    const { size, isSelected, onChange } = useSelectContext();

    const { isItemSelected, handleClick, handleKeyDown } = createSelectItemHandlers({
      value,
      isDisabled,
      isSelected,
      onChange,
    });

    return (
      <StyledSelectItem
        ref={ref}
        $size={size}
        $isDisabled={isDisabled}
        $selected={isItemSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={isItemSelected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        {...restProps}
      >
        <StyledSelectItemInputWrapper>
          {/* TODO: Checkbox 컴포넌트가 구현되면 여기에 추가 */}
          <input
            type="checkbox"
            checked={isItemSelected}
            disabled={isDisabled}
            readOnly
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
        </StyledSelectItemInputWrapper>

        <StyledSelectItemContent>
          <StyledSelectItemText
            as="span"
            size={size}
            weight="normal"
            $isDisabled={isDisabled}
            $selected={isItemSelected}
          >
            {children}
          </StyledSelectItemText>
          {caption && (
            <StyledSelectItemCaption
              as="span"
              size={size === "md" ? "sm" : "xs"}
              weight="normal"
              $isDisabled={isDisabled}
            >
              {caption}
            </StyledSelectItemCaption>
          )}
        </StyledSelectItemContent>
      </StyledSelectItem>
    );
  },
);

SelectCheckbox.displayName = "Select.Checkbox";
