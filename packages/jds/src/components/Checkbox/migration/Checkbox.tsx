import { useCheckbox, useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import { Icon } from "components";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useLayoutEffect, useState } from "react";
import { useCheckboxGroupState, useToggleState } from "react-stately";
import type { CheckboxGroupState } from "react-stately";
import { focusRing, getLabelClassName } from "utils";

import {
  checkboxControlSlot,
  checkboxGroupWrapper,
  checkboxHelper,
  checkboxHelperSlot,
  checkboxInput,
  checkboxItem,
  checkboxLabelSlot,
  checkboxRootLabel,
  checkboxTextLabel,
  checkboxVisual,
} from "./checkbox.css";
import type {
  CheckedState,
  CheckboxBasicProps,
  CheckboxHelperProps,
  CheckboxItemProps,
  CheckboxLabelProps,
  CheckboxRootProps,
  CheckboxSize,
} from "./checkbox.types";
import { checkboxSizeMap } from "./checkbox.variants";
import { CheckboxProvider, useCheckboxContext } from "./CheckboxContext";

import { useContainerPressable } from "@/hooks";

const CheckboxRoot = ({
  size = "md",
  variant = "hollow",
  disabled = false,
  isInvalid = false,
  value,
  defaultValue,
  onChange,
  name,
  children,
}: CheckboxRootProps) => {
  const state = useCheckboxGroupState({
    value,
    defaultValue,
    onChange,
    isDisabled: disabled,
    isInvalid,
    name,
  });
  const { groupProps } = useCheckboxGroup({ isDisabled: disabled, isInvalid }, state);

  return (
    <CheckboxProvider value={{ size, variant, disabled, isInvalid, state }}>
      <div {...groupProps} className={checkboxGroupWrapper}>
        {children}
      </div>
    </CheckboxProvider>
  );
};

CheckboxRoot.displayName = "Checkbox.Root";

const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItemProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      disabled = false,
      isInvalid: isInvalidProp,
      children,
      className,
      ...restProps
    },
    ref,
  ) => {
    const parentContext = useCheckboxContext();

    const size = sizeProp ?? parentContext?.size ?? "md";
    const isDisabled = disabled || (parentContext?.disabled ?? false);
    const variant = variantProp ?? parentContext?.variant ?? "hollow";
    const isInvalid = isInvalidProp ?? parentContext?.isInvalid ?? false;

    const [childChecked, setChildChecked] = useState<CheckedState>(false);
    const isEffectiveInvalid = isInvalid && childChecked === false;

    const { containerPressableProps } = useContainerPressable({ disabled: isDisabled });

    return (
      <CheckboxProvider
        value={{
          ...parentContext,
          size,
          variant,
          disabled: isDisabled,
          isInvalid,
          onChildCheckedChange: setChildChecked,
          withinItem: true,
        }}
      >
        <div
          ref={ref}
          {...mergeProps(containerPressableProps, restProps)}
          data-invalid={isEffectiveInvalid || undefined}
          className={clsx(
            checkboxItem({ size, styleOutlined: variant }),
            focusRing({ feedback: isEffectiveInvalid ? "destructive" : "none" }),
            className,
          )}
        >
          {children}
        </div>
      </CheckboxProvider>
    );
  },
);

CheckboxItem.displayName = "Checkbox.Item";

interface CheckboxBasicGroupedProps {
  size: CheckboxSize;
  value: string;
  isDisabled: boolean;
  isInvalid: boolean;
  focusRing: "on" | "off";
  state: CheckboxGroupState;
  onChildCheckedChange?: (checked: CheckedState) => void;
  forwardedRef: ForwardedRef<HTMLInputElement>;
  restProps: InputHTMLAttributes<HTMLInputElement>;
}

const CheckboxBasicGrouped = ({
  size,
  value,
  isDisabled,
  isInvalid,
  focusRing,
  state,
  onChildCheckedChange,
  forwardedRef,
  restProps,
}: CheckboxBasicGroupedProps) => {
  const ref = useObjectRef(forwardedRef);
  const { inputProps } = useCheckboxGroupItem({ value, isDisabled }, state, ref);

  const isChecked = state.isSelected(value);
  const isEffectiveInvalid = isInvalid && !isChecked;

  useLayoutEffect(() => {
    onChildCheckedChange?.(isChecked);
  }, [isChecked, onChildCheckedChange]);

  const iconSize = checkboxSizeMap[size].icon;

  return (
    <label
      className={clsx(checkboxRootLabel, checkboxControlSlot)}
      data-invalid={isEffectiveInvalid || undefined}
    >
      <input
        {...mergeProps(inputProps, restProps)}
        ref={ref}
        aria-invalid={isEffectiveInvalid || undefined}
        className={checkboxInput}
      />
      <span className={checkboxVisual({ size, focusRing })} aria-hidden='true'>
        <Icon name='check-line' size={iconSize} />
      </span>
    </label>
  );
};

interface CheckboxBasicStandaloneProps {
  size: CheckboxSize;
  isDisabled: boolean;
  isInvalid: boolean;
  focusRing: "on" | "off";
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  onChildCheckedChange?: (checked: CheckedState) => void;
  forwardedRef: ForwardedRef<HTMLInputElement>;
  restProps: InputHTMLAttributes<HTMLInputElement>;
}

const CheckboxBasicStandalone = ({
  size,
  isDisabled,
  isInvalid,
  focusRing,
  checked,
  defaultChecked,
  onCheckedChange,
  onChildCheckedChange,
  forwardedRef,
  restProps,
}: CheckboxBasicStandaloneProps) => {
  const isIndeterminate = checked === "indeterminate";

  const toggleState = useToggleState({
    isSelected: checked !== undefined && !isIndeterminate ? checked : undefined,
    defaultSelected: defaultChecked,
    onChange: isSelected => onCheckedChange?.(isSelected),
  });

  const isChecked: CheckedState = isIndeterminate ? "indeterminate" : toggleState.isSelected;
  const isEffectiveInvalid = isInvalid && isChecked === false;

  const ref = useObjectRef(forwardedRef);
  const { inputProps } = useCheckbox(
    { isIndeterminate, isDisabled, isInvalid: isEffectiveInvalid },
    toggleState,
    ref,
  );

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate, ref]);

  useLayoutEffect(() => {
    onChildCheckedChange?.(isChecked);
  }, [isChecked, onChildCheckedChange]);

  const iconSize = checkboxSizeMap[size].icon;

  return (
    <label
      className={clsx(checkboxRootLabel, checkboxControlSlot)}
      data-invalid={isEffectiveInvalid || undefined}
    >
      <input {...mergeProps(inputProps, restProps)} ref={ref} className={checkboxInput} />
      <span className={checkboxVisual({ size, focusRing })} aria-hidden='true'>
        <Icon name={isIndeterminate ? "subtract-line" : "check-line"} size={iconSize} />
      </span>
    </label>
  );
};

const CheckboxBasic = forwardRef<HTMLInputElement, CheckboxBasicProps>(
  (
    {
      size: sizeProp,
      value,
      disabled,
      isInvalid: isInvalidProp,
      checked,
      defaultChecked,
      onCheckedChange,
      ...restProps
    },
    forwardedRef,
  ) => {
    const context = useCheckboxContext();

    const size = sizeProp ?? context?.size ?? "md";
    const isDisabled = (disabled ?? false) || (context?.disabled ?? false);
    const isInvalid = (isInvalidProp ?? false) || (context?.isInvalid ?? false);
    const focusRing = context?.withinItem ? "off" : "on";

    if (context?.state) {
      if (!value) {
        throw new Error(
          "Checkbox.Root 내부에서는 그룹 내 고유 식별자로 사용할 `value`를 지정해야 합니다.",
        );
      }

      return (
        <CheckboxBasicGrouped
          size={size}
          value={value}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          focusRing={focusRing}
          state={context.state}
          onChildCheckedChange={context?.onChildCheckedChange}
          forwardedRef={forwardedRef}
          restProps={restProps}
        />
      );
    }

    return (
      <CheckboxBasicStandalone
        size={size}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        focusRing={focusRing}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        onChildCheckedChange={context?.onChildCheckedChange}
        forwardedRef={forwardedRef}
        restProps={restProps}
      />
    );
  },
);

CheckboxBasic.displayName = "Checkbox.Basic";

const CheckboxLabel = forwardRef<HTMLDivElement, CheckboxLabelProps>(({ children }, ref) => {
  const context = useCheckboxContext();
  const size = context?.size ?? "md";
  return (
    <div
      ref={ref}
      className={clsx(
        getLabelClassName({ size: checkboxSizeMap[size].label }),
        checkboxTextLabel,
        checkboxLabelSlot,
      )}
    >
      {children}
    </div>
  );
});

CheckboxLabel.displayName = "Checkbox.Label";

const CheckboxHelper = forwardRef<HTMLDivElement, CheckboxHelperProps>(({ children }, ref) => {
  const context = useCheckboxContext();
  const size = context?.size ?? "md";
  return (
    <div
      ref={ref}
      className={clsx(
        getLabelClassName({ size: checkboxSizeMap[size].helper, weight: "subtle" }),
        checkboxHelper,
        checkboxHelperSlot,
      )}
    >
      {children}
    </div>
  );
});

CheckboxHelper.displayName = "Checkbox.Helper";

export const Checkbox = {
  Root: CheckboxRoot,
  Item: CheckboxItem,
  Basic: CheckboxBasic,
  Label: CheckboxLabel,
  Helper: CheckboxHelper,
};
