import { useCheckbox, useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import { Icon } from "components";
import type { ForwardedRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import { forwardRef, useId, useLayoutEffect, useState } from "react";
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

const CheckboxItem = forwardRef<HTMLLabelElement, CheckboxItemProps>(
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
    const labelId = useId();
    const helperId = useId();

    const size = sizeProp ?? parentContext?.size ?? "md";
    const isDisabled = disabled || (parentContext?.disabled ?? false);
    const variant = variantProp ?? parentContext?.variant ?? "hollow";
    const isInvalid = isInvalidProp ?? parentContext?.isInvalid ?? false;

    const [childChecked, setChildChecked] = useState<CheckedState>(false);
    const [hasHelper, setHasHelper] = useState(false);
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
          labelId,
          helperId,
          hasHelper,
          onHelperMountChange: setHasHelper,
          onChildCheckedChange: setChildChecked,
          withinItem: true,
        }}
      >
        <label
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
        </label>
      </CheckboxProvider>
    );
  },
);

CheckboxItem.displayName = "Checkbox.Item";

interface CheckboxControlProps {
  isWithinItem: boolean;
  labelId?: string;
  describedById?: string;
  isEffectiveInvalid: boolean;
  size: CheckboxSize;
  interaction: "on" | "off";
  inputRef: Ref<HTMLInputElement>;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  icon: ReactNode;
}

const CheckboxControl = ({
  isWithinItem,
  labelId,
  describedById,
  isEffectiveInvalid,
  size,
  interaction,
  inputRef,
  inputProps,
  icon,
}: CheckboxControlProps) => {
  const className = clsx(checkboxRootLabel, checkboxControlSlot);
  const content = (
    <>
      <input
        {...inputProps}
        ref={inputRef}
        aria-invalid={isEffectiveInvalid || undefined}
        aria-labelledby={isWithinItem ? labelId : undefined}
        aria-describedby={describedById}
        className={checkboxInput}
      />
      <span className={checkboxVisual({ size, interaction })} aria-hidden='true'>
        {icon}
      </span>
    </>
  );

  return isWithinItem ? (
    <span className={className} data-invalid={isEffectiveInvalid || undefined}>
      {content}
    </span>
  ) : (
    <label className={className} data-invalid={isEffectiveInvalid || undefined}>
      {content}
    </label>
  );
};

interface CheckboxBasicGroupedProps {
  size: CheckboxSize;
  value: string;
  isDisabled: boolean;
  isInvalid: boolean;
  isWithinItem: boolean;
  labelId?: string;
  describedById?: string;
  interaction: "on" | "off";
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
  isWithinItem,
  labelId,
  describedById,
  interaction,
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
    <CheckboxControl
      isWithinItem={isWithinItem}
      labelId={labelId}
      describedById={describedById}
      isEffectiveInvalid={isEffectiveInvalid}
      size={size}
      interaction={interaction}
      inputRef={ref}
      inputProps={mergeProps(inputProps, restProps)}
      icon={<Icon name='check-line' size={iconSize} />}
    />
  );
};

interface CheckboxBasicStandaloneProps {
  size: CheckboxSize;
  isDisabled: boolean;
  isInvalid: boolean;
  interaction: "on" | "off";
  isWithinItem: boolean;
  labelId?: string;
  describedById?: string;
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
  interaction,
  isWithinItem,
  labelId,
  describedById,
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
    <CheckboxControl
      isWithinItem={isWithinItem}
      labelId={labelId}
      describedById={describedById}
      isEffectiveInvalid={isEffectiveInvalid}
      size={size}
      interaction={interaction}
      inputRef={ref}
      inputProps={mergeProps(inputProps, restProps)}
      icon={<Icon name={isIndeterminate ? "subtract-line" : "check-line"} size={iconSize} />}
    />
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
    const isWithinItem = context?.withinItem ?? false;
    const interaction = isWithinItem ? "off" : "on";
    const labelId = context?.labelId;
    const describedById = isWithinItem && context?.hasHelper ? context?.helperId : undefined;

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
          interaction={interaction}
          state={context.state}
          onChildCheckedChange={context?.onChildCheckedChange}
          isWithinItem={isWithinItem}
          labelId={labelId}
          describedById={describedById}
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
        interaction={interaction}
        isWithinItem={isWithinItem}
        labelId={labelId}
        describedById={describedById}
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

const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>(({ children }, ref) => {
  const context = useCheckboxContext();
  const size = context?.size ?? "md";
  return (
    <span
      ref={ref}
      id={context?.labelId}
      className={clsx(
        getLabelClassName({ size: checkboxSizeMap[size].label }),
        checkboxTextLabel,
        checkboxLabelSlot,
      )}
    >
      {children}
    </span>
  );
});

CheckboxLabel.displayName = "Checkbox.Label";

const CheckboxHelper = forwardRef<HTMLDivElement, CheckboxHelperProps>(({ children }, ref) => {
  const context = useCheckboxContext();
  const size = context?.size ?? "md";
  const onHelperMountChange = context?.onHelperMountChange;

  useLayoutEffect(() => {
    onHelperMountChange?.(true);
    return () => onHelperMountChange?.(false);
  }, [onHelperMountChange]);

  return (
    <div
      ref={ref}
      id={context?.helperId}
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
