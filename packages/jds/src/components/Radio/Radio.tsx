import { useRadio, useRadioGroup } from "@react-aria/radio";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { useRadioGroupState } from "react-stately";
import type { RadioGroupState } from "react-stately";

import {
  radioGroupWrapper,
  radioInput,
  radioItem,
  radioRootLabel,
  radioSubLabel,
  radioTextLabel,
  radioVisual,
} from "./radio.css";
import type {
  RadioSize,
  RadioBasicProps,
  RadioItemProps,
  RadioLabelProps,
  RadioRootProps,
  RadioSubLabelProps,
} from "./radio.types";
import { RadioProvider, useRadioContext } from "./RadioContext";

import { useContainerPressable } from "@/hooks";

const RadioRoot = ({
  radioSize = "md",
  radioStyle = "empty",
  radioAlign = "left",
  disabled = false,
  value,
  defaultValue,
  onChange,
  name,
  children,
}: RadioRootProps) => {
  const state = useRadioGroupState({ value, defaultValue, onChange, isDisabled: disabled, name });
  const { radioGroupProps } = useRadioGroup({ isDisabled: disabled }, state);

  return (
    <RadioProvider
      value={{ size: radioSize, style: radioStyle, align: radioAlign, disabled, state }}
    >
      <div {...radioGroupProps} className={radioGroupWrapper}>
        {children}
      </div>
    </RadioProvider>
  );
};

RadioRoot.displayName = "Radio.Root";

const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  (
    { radioSize, radioStyle, radioAlign, disabled = false, children, className, ...restProps },
    ref,
  ) => {
    const parentContext = useRadioContext();

    const size = radioSize ?? parentContext?.size ?? "md";
    const isDisabled = disabled || (parentContext?.disabled ?? false);
    const style = radioStyle ?? parentContext?.style ?? "empty";
    const align = radioAlign ?? parentContext?.align ?? "left";

    const { containerPressableProps } = useContainerPressable({ disabled: isDisabled });

    return (
      <RadioProvider value={{ ...parentContext, size, style, align, disabled: isDisabled }}>
        <div
          ref={ref}
          {...mergeProps(containerPressableProps, restProps)}
          className={clsx(radioItem({ size, styleOutline: style, alignRight: align }), className)}
        >
          {children}
        </div>
      </RadioProvider>
    );
  },
);

RadioItem.displayName = "Radio.Item";

// Radio.Root 컨텍스트 안에서 useRadio를 호출하는 내부 컴포넌트.
// hooks 규칙상 조건부 호출이 불가하므로 컴포넌트를 분리한다.
interface RadioBasicGroupedProps {
  size: RadioSize;
  value: string;
  isDisabled: boolean;
  state: RadioGroupState;
  forwardedRef: ForwardedRef<HTMLInputElement>;
  restProps: InputHTMLAttributes<HTMLInputElement>;
}

const RadioBasicGrouped = ({
  size,
  value,
  isDisabled,
  state,
  forwardedRef,
  restProps,
}: RadioBasicGroupedProps) => {
  const ref = useObjectRef(forwardedRef);
  const { labelProps, inputProps } = useRadio({ value, isDisabled }, state, ref);

  return (
    <label {...labelProps} className={radioRootLabel}>
      <input {...mergeProps(inputProps, restProps)} className={radioInput} />
      <span className={clsx(radioVisual({ size }), "visual")} aria-hidden='true' />
    </label>
  );
};

const RadioBasic = forwardRef<HTMLInputElement, RadioBasicProps>(
  ({ radioSize, value, checked, disabled, onChange, name, ...restProps }, forwardedRef) => {
    const context = useRadioContext();
    const size = context?.size ?? radioSize ?? "md";
    const isDisabled = disabled ?? context?.disabled ?? false;

    if (context?.state) {
      return (
        <RadioBasicGrouped
          size={size}
          value={String(value ?? "")}
          isDisabled={isDisabled}
          state={context.state}
          forwardedRef={forwardedRef}
          restProps={restProps}
        />
      );
    }

    return (
      <label className={radioRootLabel}>
        <input
          ref={forwardedRef}
          type='radio'
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange}
          name={name}
          className={radioInput}
          {...restProps}
        />
        <span className={clsx(radioVisual({ size }), "visual")} aria-hidden='true' />
      </label>
    );
  },
);

RadioBasic.displayName = "Radio.Basic";

const RadioLabel = forwardRef<HTMLDivElement, RadioLabelProps>(({ children }, ref) => {
  const context = useRadioContext();
  return (
    <div ref={ref} className={radioTextLabel({ size: context?.size ?? "md" })}>
      {children}
    </div>
  );
});

RadioLabel.displayName = "Radio.Label";

const RadioSubLabel = forwardRef<HTMLDivElement, RadioSubLabelProps>(({ children }, ref) => {
  const context = useRadioContext();
  return (
    <div ref={ref} className={radioSubLabel({ size: context?.size ?? "md" })}>
      {children}
    </div>
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
