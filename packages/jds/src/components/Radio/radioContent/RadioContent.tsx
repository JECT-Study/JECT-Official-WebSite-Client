import { forwardRef } from "react";

import {
  RadioContainerLabel,
  StyledLabel,
  StyledSubLabel,
  subLabelSizeMap,
} from "./RadioContent.style";
import type { RadioContentProps } from "./radioContent.types";
import { Radio } from "../radioBasic/Radio";

export const RadioContent = forwardRef<HTMLInputElement, RadioContentProps>(
  (
    {
      radioSize = "md",
      radioStyle = "empty",
      align = "left",
      disabled = false,
      subLabelVisible = false,
      subLabel = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <RadioContainerLabel
        radioSize={radioSize}
        isDisabled={disabled}
        isAlignRight={align === "right"}
        isStyleOutline={radioStyle === "outline"}
      >
        {align === "right" && (
          <StyledLabel $size={radioSize} $isDisabled={disabled}>
            {children}
          </StyledLabel>
        )}
        <Radio ref={ref} radioSize={radioSize} disabled={disabled} {...props} />
        {align === "left" && (
          <StyledLabel $size={radioSize} $isDisabled={disabled}>
            {children}
          </StyledLabel>
        )}
        {subLabelVisible && (
          <StyledSubLabel $size={radioSize} $isDisabled={disabled}>
            {subLabel}
          </StyledSubLabel>
        )}
      </RadioContainerLabel>
    );
  },
);

RadioContent.displayName = "RadioContent";
