import { forwardRef } from "react";

import {
  StyledRadioRootInput,
  StyledRadioRootLabel,
  StyledRadioRootSpan,
  StyledLabel,
  StyledRadioRoot,
  StyledSubLabel,
} from "./Radio.style";
import type {
  RadioLabelProps,
  RadioProps,
  RadioRootProps,
  RadioSubLabelProps,
} from "./radio.types";
import { RadioProvider, useRadioContext } from "./RadioContext";

const RadioBasic = forwardRef<HTMLInputElement, RadioProps>(
  ({ radioSize = "md", ...props }, ref) => {
    return (
      <StyledRadioRootLabel radioSize={radioSize}>
        <StyledRadioRootInput ref={ref} type='radio' {...props} />
        <StyledRadioRootSpan className='visual' aria-hidden='true' radioSize={radioSize} />
      </StyledRadioRootLabel>
    );
  },
);

RadioBasic.displayName = "Radio.Basic";

const RadioRoot = forwardRef<HTMLLabelElement, RadioRootProps>(
  ({ radioSize = "md", radioStyle = "empty", align = "left", disabled = false, children }, ref) => {
    return (
      <RadioProvider value={{ radioSize, isDisabled: disabled }}>
        <StyledRadioRoot
          ref={ref}
          radioSize={radioSize}
          isDisabled={disabled}
          isAlignRight={align === "right"}
          isStyleOutline={radioStyle === "outline"}
        >
          {children}
        </StyledRadioRoot>
      </RadioProvider>
    );
  },
);

RadioRoot.displayName = "Radio.Root";

const RadioLabel = forwardRef<HTMLDivElement, RadioLabelProps>(({ children }, ref) => {
  const { radioSize, isDisabled } = useRadioContext();
  return (
    <StyledLabel ref={ref} $size={radioSize} $isDisabled={isDisabled}>
      {children}
    </StyledLabel>
  );
});

RadioLabel.displayName = "Radio.Label";

const RadioSubLabel = forwardRef<HTMLDivElement, RadioSubLabelProps>(({ children }, ref) => {
  const { radioSize, isDisabled } = useRadioContext();
  return (
    <StyledSubLabel ref={ref} $size={radioSize} $isDisabled={isDisabled}>
      {children}
    </StyledSubLabel>
  );
});

RadioSubLabel.displayName = "Radio.SubLabel";

export const Radio = {
  Basic: RadioBasic,
  Root: RadioRoot,
  Label: RadioLabel,
  SubLabel: RadioSubLabel,
};
