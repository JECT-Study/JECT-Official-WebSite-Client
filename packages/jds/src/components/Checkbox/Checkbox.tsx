import { useCheckbox, useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import { Icon } from "components";
import type { IconSize } from "components";
import type { ForwardedRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import { forwardRef, useId, useLayoutEffect, useState } from "react";
import { useCheckboxGroupState, useToggleState } from "react-stately";
import type { CheckboxGroupState } from "react-stately";
import { focusRing, getLabelClassName, visuallyHidden } from "utils";
import type { LabelSize } from "utils";

import {
  checkboxControlRoot,
  checkboxControlSlot,
  checkboxGroupWrapper,
  checkboxHelper,
  checkboxHelperSlot,
  checkboxItem,
  checkboxLabel,
  checkboxLabelSlot,
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
import {
  CheckboxConfigProvider,
  CheckboxItemProvider,
  useCheckboxConfig,
  useCheckboxItem,
} from "./CheckboxContext";

const checkboxSizeMap = {
  lg: { icon: "md", label: "lg", helper: "sm" },
  md: { icon: "sm", label: "md", helper: "sm" },
  sm: { icon: "xs", label: "sm", helper: "xs" },
  xs: { icon: "2xs", label: "xs", helper: "xs" },
} satisfies Record<CheckboxSize, { icon: IconSize; label: LabelSize; helper: LabelSize }>;

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
    <CheckboxConfigProvider value={{ size, variant, disabled, isInvalid, state }}>
      <div {...groupProps} className={checkboxGroupWrapper}>
        {children}
      </div>
    </CheckboxConfigProvider>
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
    const parentConfig = useCheckboxConfig();
    const labelId = useId();
    const helperId = useId();

    const size = sizeProp ?? parentConfig?.size ?? "md";
    const isDisabled = disabled || (parentConfig?.disabled ?? false);
    const variant = variantProp ?? parentConfig?.variant ?? "hollow";
    const isInvalid = isInvalidProp ?? parentConfig?.isInvalid ?? false;

    const [childChecked, setChildChecked] = useState<CheckedState>(false);
    const [hasHelper, setHasHelper] = useState(false);
    const isEffectiveInvalid = isInvalid && childChecked === false;

    return (
      <CheckboxConfigProvider
        value={{
          ...parentConfig,
          size,
          variant,
          disabled: isDisabled,
          isInvalid,
        }}
      >
        <CheckboxItemProvider
          value={{
            labelId,
            helperId,
            hasHelper,
            onHelperMountChange: setHasHelper,
            onChildCheckedChange: setChildChecked,
          }}
        >
          <label
            ref={ref}
            {...restProps}
            data-disabled={isDisabled || undefined}
            data-invalid={isEffectiveInvalid || undefined}
            className={clsx(
              checkboxItem({ size, styleOutlined: variant }),
              focusRing({ feedback: isEffectiveInvalid ? "destructive" : "none" }),
              className,
            )}
          >
            {children}
          </label>
        </CheckboxItemProvider>
      </CheckboxConfigProvider>
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
  const className = clsx(checkboxControlRoot, checkboxControlSlot);
  const content = (
    <>
      <input
        {...inputProps}
        ref={inputRef}
        aria-invalid={isEffectiveInvalid || undefined}
        aria-labelledby={isWithinItem ? labelId : undefined}
        aria-describedby={describedById}
        className={visuallyHidden}
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
    const configContext = useCheckboxConfig();
    const itemContext = useCheckboxItem();

    const size = sizeProp ?? configContext?.size ?? "md";
    const isDisabled = (disabled ?? false) || (configContext?.disabled ?? false);
    const isInvalid = (isInvalidProp ?? false) || (configContext?.isInvalid ?? false);
    const isWithinItem = itemContext != null;
    const interaction = isWithinItem ? "off" : "on";
    const labelId = itemContext?.labelId;
    const describedById = itemContext?.hasHelper ? itemContext?.helperId : undefined;

    if (configContext?.state) {
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
          isWithinItem={isWithinItem}
          interaction={interaction}
          state={configContext.state}
          onChildCheckedChange={itemContext?.onChildCheckedChange}
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
        isWithinItem={isWithinItem}
        interaction={interaction}
        labelId={labelId}
        describedById={describedById}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        onChildCheckedChange={itemContext?.onChildCheckedChange}
        forwardedRef={forwardedRef}
        restProps={restProps}
      />
    );
  },
);

CheckboxBasic.displayName = "Checkbox.Basic";

const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>(({ children }, ref) => {
  const config = useCheckboxConfig();
  const item = useCheckboxItem();
  const size = config?.size ?? "md";

  return (
    <span
      ref={ref}
      id={item?.labelId}
      className={clsx(
        getLabelClassName({ size: checkboxSizeMap[size].label }),
        checkboxLabel,
        checkboxLabelSlot,
      )}
    >
      {children}
    </span>
  );
});

CheckboxLabel.displayName = "Checkbox.Label";

const CheckboxHelper = forwardRef<HTMLSpanElement, CheckboxHelperProps>(({ children }, ref) => {
  const config = useCheckboxConfig();
  const item = useCheckboxItem();
  const size = config?.size ?? "md";
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
        getLabelClassName({ size: checkboxSizeMap[size].helper, weight: "subtle" }),
        checkboxHelper,
        checkboxHelperSlot,
      )}
    >
      {children}
    </span>
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
