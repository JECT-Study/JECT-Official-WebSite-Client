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
import { Checkbox } from "../Checkbox";

import { getLabelClassName } from "@/utils/typography";

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
        role='checkbox'
        aria-checked={isItemSelected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        {...restProps}
      >
        <StyledSelectItemInputWrapper>
          <Checkbox.Control
            size={size}
            checked={isItemSelected}
            onCheckedChange={() => {}}
            disabled={isDisabled}
            tabIndex={-1}
            aria-hidden
          />
        </StyledSelectItemInputWrapper>
        <StyledSelectItemContent>
          <StyledSelectItemText
            className={getLabelClassName({ size })}
            $isDisabled={isDisabled}
            $selected={isItemSelected}
          >
            {children}
          </StyledSelectItemText>
          {caption && (
            <StyledSelectItemCaption
              className={getLabelClassName({
                size: size === "md" ? "sm" : "xs",
              })}
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
