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
import type { SelectListProps } from "./select.types";

import { getLabelClassName } from "@/utils/typography";

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
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
              className={getLabelClassName({ size })}
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
              className={getLabelClassName({ size: captionSize, weight: "subtle" })}
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

SelectList.displayName = "Select.List";
