import { forwardRef } from "react";

import { createSelectItemHandlers } from "./createSelectItemHandlers";
import { useSelectContext } from "./Select";
import {
  StyledSelectItem,
  StyledSelectItemContent,
  StyledSelectItemTextRow,
  StyledSelectItemText,
  StyledSelectItemCaption,
  StyledSelectItemBadge,
} from "./select.styles";
import type { SelectLabelProps } from "./select.types";

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ value, isDisabled = false, caption, badge, children, ...restProps }, ref) => {
    const { size, isSelected, onChange } = useSelectContext();

    const { isItemSelected, handleClick, handleKeyDown } = createSelectItemHandlers({
      value,
      isDisabled,
      isSelected,
      onChange,
    });

    const captionSize = size === "md" ? "sm" : "xs";

    return (
      <StyledSelectItem
        ref={ref}
        $size={size}
        $isDisabled={isDisabled}
        $selected={isItemSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='option'
        aria-selected={isItemSelected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        {...restProps}
      >
        <StyledSelectItemContent>
          <StyledSelectItemTextRow>
            <StyledSelectItemText
              as='span'
              size={size}
              weight='normal'
              $isDisabled={isDisabled}
              $selected={isItemSelected}
            >
              {children}
            </StyledSelectItemText>
            {badge && (
              <StyledSelectItemBadge hierarchy='tertiary' size='xs' badgeStyle='outlined'>
                {badge}
              </StyledSelectItemBadge>
            )}
          </StyledSelectItemTextRow>
          {caption && (
            <StyledSelectItemCaption
              as='span'
              size={captionSize}
              weight='subtle'
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

SelectLabel.displayName = "Select.Label";
