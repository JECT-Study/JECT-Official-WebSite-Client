import { clsx } from "clsx";
import { Icon } from "components";
import type { IconSize } from "components";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { forwardRef, useId, useLayoutEffect, useState } from "react";
import { focusRing, getLabelClassName } from "utils";
import type { LabelSize } from "utils";

import {
  checkboxControlSlot,
  checkboxGroupWrapper,
  checkboxHelper,
  checkboxHelperSlot,
  checkboxIndicator,
  checkboxItem,
  checkboxLabel,
  checkboxLabelSlot,
  checkboxVisual,
} from "./checkbox.css";
import type {
  CheckedState,
  CheckboxControlProps,
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
import { useCheckboxState } from "./useCheckboxState";

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
  const [selected, setSelected] = useCheckboxState(value, defaultValue ?? [], onChange);

  const state = {
    value: selected,
    isSelected: (v: string) => selected.includes(v),
    toggle: (v: string) =>
      setSelected(prev => (prev.includes(v) ? prev.filter(item => item !== v) : [...prev, v])),
  };

  return (
    <CheckboxConfigProvider value={{ size, variant, disabled, isInvalid, name, state }}>
      <div role='group' className={checkboxGroupWrapper}>
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
              focusRing({ feedback: isEffectiveInvalid ? "destructive" : "none", interaction: "within" }),
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

const CheckboxControl = forwardRef<HTMLButtonElement, CheckboxControlProps>(
  (
    {
      size: sizeProp,
      value,
      disabled,
      isInvalid: isInvalidProp,
      checked,
      defaultChecked,
      onCheckedChange,
      className,
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
    const iconSize = checkboxSizeMap[size].icon;

    const groupState = configContext?.state;

    if (groupState && value == null) {
      throw new Error(
        "Checkbox.Root 내부에서는 그룹 내 고유 식별자로 사용할 `value`를 지정해야 합니다.",
      );
    }

    const isGrouped = groupState != null && value != null;
    const isControlledStandalone = checked !== undefined;

    const [uncontrolledChecked, setUncontrolledChecked] = useState<CheckedState>(
      defaultChecked ?? false,
    );

    const currentChecked: CheckedState = isGrouped
      ? groupState.isSelected(value)
      : isControlledStandalone
        ? checked
        : uncontrolledChecked;

    const isEffectiveInvalid = isInvalid && currentChecked === false;
    const isIndeterminate = currentChecked === "indeterminate";

    const onChildCheckedChange = itemContext?.onChildCheckedChange;
    useLayoutEffect(() => {
      onChildCheckedChange?.(currentChecked);
    }, [currentChecked, onChildCheckedChange]);

    const handleCheckedChange = (next: CheckedState) => {
      if (isGrouped) {
        groupState.toggle(value);
        return;
      }
      if (!isControlledStandalone) setUncontrolledChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <CheckboxPrimitive.Root
        ref={forwardedRef}
        value={value}
        name={configContext?.name}
        checked={currentChecked}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        aria-invalid={isEffectiveInvalid || undefined}
        aria-labelledby={isWithinItem ? itemContext?.labelId : undefined}
        aria-describedby={
          isWithinItem && itemContext?.hasHelper ? itemContext?.helperId : undefined
        }
        data-invalid={isEffectiveInvalid || undefined}
        className={clsx(checkboxVisual({ size, interaction }), checkboxControlSlot, className)}
        {...restProps}
      >
        <CheckboxPrimitive.Indicator className={checkboxIndicator}>
          <Icon name={isIndeterminate ? "subtract-line" : "check-line"} size={iconSize} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

CheckboxControl.displayName = "Checkbox.Control";

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
  Control: CheckboxControl,
  Label: CheckboxLabel,
  Helper: CheckboxHelper,
};
