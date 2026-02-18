import type { ChangeEvent } from "react";
import { forwardRef } from "react";

import {
  StyledRadioRootInput,
  StyledRadioRootLabel,
  StyledRadioRootSpan,
  StyledLabel,
  StyledSubLabel,
  StyledRadioItem,
} from "./Radio.style";
import type {
  RadioBasicProps,
  RadioItemProps,
  RadioLabelProps,
  RadioRootProps,
  RadioSubLabelProps,
} from "./radio.types";
import { RadioProvider, useRadioContext } from "./RadioContext";
import { RadioGroupProvider, useRadioGroupContext } from "./RadioGroupContext";

const RadioRoot = ({
  radioSize = "md",
  radioStyle = "empty",
  radioAlign = "left",
  disabled = false,
  value,
  onChange,
  name,
  children,
}: RadioRootProps) => {
  return (
    <RadioGroupProvider
      value={{ radioSize, radioStyle, radioAlign, isDisabled: disabled, value, onChange, name }}
    >
      {children}
    </RadioGroupProvider>
  );
};

RadioRoot.displayName = "Radio.Root";

const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  (
    { radioSize = "md", radioStyle = "empty", radioAlign = "left", disabled = false, children },
    ref,
  ) => {
    const groupContext = useRadioGroupContext();
    const size = groupContext?.radioSize || radioSize;
    const isDisabled = groupContext?.isDisabled || disabled;
    const isAlignRight = groupContext?.radioAlign
      ? groupContext.radioAlign === "right"
      : radioAlign === "right";
    const isStyleOutline = groupContext?.radioStyle
      ? groupContext?.radioStyle === "outline"
      : radioStyle === "outline";

    return (
      <RadioProvider value={{ radioSize: size, isDisabled }}>
        <StyledRadioItem
          ref={ref}
          radioSize={size}
          isDisabled={isDisabled}
          isAlignRight={isAlignRight}
          isStyleOutline={isStyleOutline}
        >
          {children}
        </StyledRadioItem>
      </RadioProvider>
    );
  },
);

RadioItem.displayName = "Radio.Item";

const RadioBasic = forwardRef<HTMLInputElement, RadioBasicProps>(
  ({ radioSize = "md", value, checked, disabled, onChange, ...props }, ref) => {
    const groupContext = useRadioGroupContext();
    const radioContext = useRadioContext();

    const isChecked = groupContext?.value ? groupContext.value === value : checked;
    const isBasicDisabled = radioContext?.isDisabled ? radioContext.isDisabled : disabled;
    const groupName = groupContext?.name;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (groupContext?.onChange && value !== undefined) {
        groupContext.onChange(String(value));
      }
      onChange?.(e);
    };

    return (
      <StyledRadioRootLabel radioSize={radioContext?.radioSize || radioSize}>
        <StyledRadioRootInput
          ref={ref}
          type='radio'
          value={value}
          checked={isChecked}
          disabled={isBasicDisabled}
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
  const rootContext = useRadioContext();
  return (
    <StyledLabel
      ref={ref}
      $size={rootContext?.radioSize || "md"}
      $isDisabled={rootContext?.isDisabled || false}
    >
      {children}
    </StyledLabel>
  );
});

RadioLabel.displayName = "Radio.Label";

const RadioSubLabel = forwardRef<HTMLDivElement, RadioSubLabelProps>(({ children }, ref) => {
  const rootContext = useRadioContext();
  return (
    <StyledSubLabel
      ref={ref}
      $size={rootContext?.radioSize || "md"}
      $isDisabled={rootContext?.isDisabled || false}
    >
      {children}
    </StyledSubLabel>
  );
});

RadioSubLabel.displayName = "Radio.SubLabel";

export const Radio = {
  Root: RadioRoot,
  Item: RadioItem,
  Basic: RadioBasic,
  Label: RadioLabel,
  SubLabel: RadioSubLabel,
};
