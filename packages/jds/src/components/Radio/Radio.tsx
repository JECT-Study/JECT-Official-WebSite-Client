import { useRadio, useRadioGroup } from "@react-aria/radio";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import type { ChangeEventHandler, ForwardedRef, InputHTMLAttributes, Ref } from "react";
import { forwardRef, useId, useLayoutEffect, useState } from "react";
import { useRadioGroupState } from "react-stately";
import type { RadioGroupState } from "react-stately";
import { focusRing, getLabelClassName, visuallyHidden } from "utils";
import type { LabelSize } from "utils";

import {
  radioControlRoot,
  radioControlSlot,
  radioGroupWrapper,
  radioHelper,
  radioHelperSlot,
  radioItem,
  radioLabel,
  radioLabelSlot,
  radioVisual,
} from "./radio.css";
import type {
  RadioSize,
  RadioBasicProps,
  RadioHelperProps,
  RadioItemProps,
  RadioLabelProps,
  RadioRootProps,
} from "./radio.types";
import { RadioItemProvider, RadioConfigProvider, useRadioConfig, useRadioItem } from "./RadioContext";

const radioTextSizeMap = {
  lg: { label: "lg", helper: "sm" },
  md: { label: "md", helper: "sm" },
  sm: { label: "sm", helper: "xs" },
  xs: { label: "xs", helper: "xs" },
} satisfies Record<RadioSize, { label: LabelSize; helper: LabelSize }>;

const RadioRoot = ({
  size = "md",
  variant = "hollow",
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
    <RadioConfigProvider value={{ size, variant, disabled, state }}>
      <div {...radioGroupProps} className={radioGroupWrapper}>
        {children}
      </div>
    </RadioConfigProvider>
  );
};

RadioRoot.displayName = "Radio.Root";

const RadioItem = forwardRef<HTMLLabelElement, RadioItemProps>(
  (
    { size: sizeProp, variant: variantProp, disabled = false, children, className, ...restProps },
    ref,
  ) => {
    const parentContext = useRadioConfig();
    const labelId = useId();
    const helperId = useId();

    const size = sizeProp ?? parentContext?.size ?? "md";
    const isDisabled = disabled || (parentContext?.disabled ?? false);
    const variant = variantProp ?? parentContext?.variant ?? "hollow";

    const [hasHelper, setHasHelper] = useState(false);

    return (
      <RadioConfigProvider value={{ ...parentContext, size, variant, disabled: isDisabled }}>
        <RadioItemProvider
          value={{ labelId, helperId, hasHelper, onHelperMountChange: setHasHelper }}
        >
          <label
            ref={ref}
            {...restProps}
            data-disabled={isDisabled || undefined}
            className={clsx(
              radioItem({ size, styleOutlined: variant }),
              focusRing({ interaction: "within" }),
              className,
            )}
          >
            {children}
          </label>
        </RadioItemProvider>
      </RadioConfigProvider>
    );
  },
);

RadioItem.displayName = "Radio.Item";

interface RadioControlProps {
  isWithinItem: boolean;
  labelId?: string;
  describedById?: string;
  size: RadioSize;
  interaction: "on" | "off";
  inputRef: Ref<HTMLInputElement>;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const RadioControl = ({
  isWithinItem,
  labelId,
  describedById,
  size,
  interaction,
  inputRef,
  inputProps,
}: RadioControlProps) => {
  const className = clsx(radioControlRoot, radioControlSlot);
  const content = (
    <>
      <input
        {...inputProps}
        ref={inputRef}
        aria-labelledby={isWithinItem ? labelId : undefined}
        aria-describedby={describedById}
        className={visuallyHidden}
      />
      <span className={radioVisual({ size, interaction })} aria-hidden='true' />
    </>
  );

  return isWithinItem ? (
    <span className={className}>{content}</span>
  ) : (
    <label className={className}>{content}</label>
  );
};

interface RadioBasicGroupedProps {
  size: RadioSize;
  value: string;
  isDisabled: boolean;
  isWithinItem: boolean;
  labelId?: string;
  describedById?: string;
  interaction: "on" | "off";
  state: RadioGroupState;
  forwardedRef: ForwardedRef<HTMLInputElement>;
  restProps: InputHTMLAttributes<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const RadioBasicGrouped = ({
  size,
  value,
  isDisabled,
  isWithinItem,
  labelId,
  describedById,
  interaction,
  state,
  forwardedRef,
  restProps,
  onChange,
}: RadioBasicGroupedProps) => {
  const ref = useObjectRef(forwardedRef);
  const { inputProps } = useRadio({ value, isDisabled }, state, ref);

  return (
    <RadioControl
      isWithinItem={isWithinItem}
      labelId={labelId}
      describedById={describedById}
      size={size}
      interaction={interaction}
      inputRef={ref}
      inputProps={mergeProps(inputProps, restProps, { onChange })}
    />
  );
};

const RadioBasic = forwardRef<HTMLInputElement, RadioBasicProps>(
  ({ size: sizeProp, value, checked, disabled, onChange, name, ...restProps }, forwardedRef) => {
    const context = useRadioConfig();
    const itemContext = useRadioItem();

    const size = context?.size ?? sizeProp ?? "md";
    const isDisabled = disabled || (context?.disabled ?? false);
    const isWithinItem = itemContext != null;
    const interaction = isWithinItem ? "off" : "on";
    const labelId = itemContext?.labelId;
    const describedById = itemContext?.hasHelper ? itemContext?.helperId : undefined;

    if (context?.state) {
      return (
        <RadioBasicGrouped
          size={size}
          value={value}
          isDisabled={isDisabled}
          isWithinItem={isWithinItem}
          labelId={labelId}
          describedById={describedById}
          interaction={interaction}
          state={context.state}
          forwardedRef={forwardedRef}
          restProps={restProps}
          onChange={onChange}
        />
      );
    }

    return (
      <RadioControl
        isWithinItem={isWithinItem}
        labelId={labelId}
        describedById={describedById}
        size={size}
        interaction={interaction}
        inputRef={forwardedRef}
        inputProps={{
          type: "radio",
          value,
          checked,
          disabled: isDisabled,
          onChange,
          name,
          ...restProps,
        }}
      />
    );
  },
);

RadioBasic.displayName = "Radio.Basic";

const RadioLabel = forwardRef<HTMLSpanElement, RadioLabelProps>(({ children }, ref) => {
  const size = useRadioConfig()?.size ?? "md";
  const labelId = useRadioItem()?.labelId;
  return (
    <span
      ref={ref}
      id={labelId}
      className={clsx(
        getLabelClassName({ size: radioTextSizeMap[size].label }),
        radioLabel,
        radioLabelSlot,
      )}
    >
      {children}
    </span>
  );
});

RadioLabel.displayName = "Radio.Label";

const RadioHelper = forwardRef<HTMLSpanElement, RadioHelperProps>(({ children }, ref) => {
  const size = useRadioConfig()?.size ?? "md";
  const item = useRadioItem();
  const onHelperMountChange = item?.onHelperMountChange;

  useLayoutEffect(() => {
    onHelperMountChange?.(true);
    return () => onHelperMountChange?.(false);
  }, [onHelperMountChange]);

  return (
    <span
      ref={ref}
      id={item?.helperId}
      className={clsx(
        getLabelClassName({ size: radioTextSizeMap[size].helper, weight: "subtle" }),
        radioHelper,
        radioHelperSlot,
      )}
    >
      {children}
    </span>
  );
});

RadioHelper.displayName = "Radio.Helper";

export const Radio = {
  Root: RadioRoot,
  Item: RadioItem,
  Basic: RadioBasic,
  Label: RadioLabel,
  Helper: RadioHelper,
};
