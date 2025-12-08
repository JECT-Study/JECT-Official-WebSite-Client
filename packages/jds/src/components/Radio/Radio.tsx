import type { ChangeEvent } from "react";
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
  RadioGroupProps,
  RadioLabelProps,
  RadioProps,
  RadioRootProps,
  RadioSubLabelProps,
} from "./radio.types";
import { RadioProvider, useRadioContext } from "./RadioContext";
import { RadioGroupProvider, useRadioGroupContext } from "./RadioGroupContext";

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

const RadioBasic = forwardRef<HTMLInputElement, RadioProps>(
  ({ radioSize = "md", value, checked, onChange, ...props }, ref) => {
    const groupContext = useRadioGroupContext();

    // RadioGroup이 있으면 그룹의 값 사용, 없으면 개별 props 사용
    const isChecked = groupContext ? groupContext.value === value : checked;
    const groupName = groupContext?.name;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (groupContext?.onChange && value !== undefined) {
        groupContext.onChange(String(value));
      }
      onChange?.(e);
    };

    return (
      <StyledRadioRootLabel radioSize={radioSize}>
        <StyledRadioRootInput
          ref={ref}
          type='radio'
          value={value}
          checked={isChecked}
          onChange={handleChange}
          name={groupName}
          {...props}
        />
        <StyledRadioRootSpan className='visual' aria-hidden='true' radioSize={radioSize} />
      </StyledRadioRootLabel>
    );
  },
);

RadioBasic.displayName = "Radio.Basic";

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

const RadioGroup = ({ value, onChange, name, children }: RadioGroupProps) => {
  return <RadioGroupProvider value={{ value, onChange, name }}>{children}</RadioGroupProvider>;
};

RadioGroup.displayName = "Radio.Group";

export const Radio = {
  Root: RadioRoot,
  Basic: RadioBasic,
  Label: RadioLabel,
  SubLabel: RadioSubLabel,
  Group: RadioGroup,
};
