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
import type { SelectRadioProps } from "./select.types";
import { Radio } from "../Radio";

export const SelectRadio = forwardRef<HTMLDivElement, SelectRadioProps>(
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
        role='radio'
        aria-checked={isItemSelected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        {...restProps}
      >
        <StyledSelectItemInputWrapper>
          <Radio.Basic
            radioSize={size}
            value={value}
            checked={isItemSelected}
            disabled={isDisabled}
            tabIndex={-1}
          />
        </StyledSelectItemInputWrapper>
        <StyledSelectItemContent>
          <StyledSelectItemText
            as='span'
            size={size}
            weight='normal'
            $isDisabled={isDisabled}
            $selected={isItemSelected}
          >
            {children}
          </StyledSelectItemText>

          {caption && (
            <StyledSelectItemCaption
              as='span'
              size={size === "md" ? "sm" : "xs"}
              weight='normal'
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

SelectRadio.displayName = "Select.Radio";
