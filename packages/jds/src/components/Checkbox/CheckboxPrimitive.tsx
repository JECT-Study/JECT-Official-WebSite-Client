import { clsx } from "clsx";
import { useControllableState } from "hooks";
import { Checkbox as RadixCheckbox } from "radix-ui";
import { forwardRef, useCallback, useId, useLayoutEffect, useMemo, useState } from "react";
import { focusRing, getLabelClassName, overlay } from "utils";
import type { LabelSize } from "utils";

import type { IconSize } from "../Icon";
import { Icon } from "../Icon";
import {
  checkboxControl,
  checkboxControlSlot,
  checkboxGroupWrapper,
  checkboxHelper,
  checkboxHelperSlot,
  checkboxIconWrapper,
  checkboxItem,
  checkboxLabel,
  checkboxLabelSlot,
  checkboxVisual,
} from "./checkbox.css";
import type {
  CheckedState,
  CheckboxControlProps,
  CheckboxHelperProps,
  CheckboxIndicatorProps,
  CheckboxItemProps,
  CheckboxLabelProps,
  CheckboxRootProps,
  CheckboxSize,
} from "./checkbox.types";
import {
  CheckboxConfigProvider,
  CheckboxItemProvider,
  CheckboxSelectionProvider,
  useCheckboxConfig,
  useCheckboxItem,
  useCheckboxSelection,
} from "./CheckboxContext";
import type { CheckboxGroupState } from "./CheckboxContext";

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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: CheckboxRootProps) => {
  const [selected, setSelected] = useControllableState<string[]>(
    value,
    defaultValue ?? [],
    onChange,
  );

  const isSelected = useCallback((v: string) => selected.includes(v), [selected]);
  const toggle = useCallback(
    (v: string) =>
      setSelected(prev => (prev.includes(v) ? prev.filter(item => item !== v) : [...prev, v])),
    [setSelected],
  );

  const selectionState = useMemo<CheckboxGroupState>(
    () => ({ value: selected, isSelected, toggle }),
    [selected, isSelected, toggle],
  );

  const configValue = useMemo(
    () => ({ size, variant, disabled, isInvalid, name }),
    [size, variant, disabled, isInvalid, name],
  );

  return (
    <CheckboxConfigProvider value={configValue}>
      <CheckboxSelectionProvider value={selectionState}>
        <div
          role='group'
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={checkboxGroupWrapper}
        >
          {children}
        </div>
      </CheckboxSelectionProvider>
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

    const configValue = useMemo(
      () => ({ ...parentConfig, size, variant, disabled: isDisabled, isInvalid }),
      [parentConfig, size, variant, isDisabled, isInvalid],
    );

    return (
      <CheckboxConfigProvider value={configValue}>
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
              focusRing({
                feedback: isEffectiveInvalid ? "destructive" : "none",
                interaction: "within",
              }),
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

const CheckboxIndicator = forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  (
    { size = "md", state = false, disabled = false, isInvalid = false, className, ...restProps },
    ref,
  ) => {
    const isIndeterminate = state === "indeterminate";
    const isChecked = state === true;
    const dataState = isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked";

    return (
      <span
        ref={ref}
        aria-hidden
        data-state={dataState}
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
        className={clsx(checkboxVisual({ size }), className)}
        {...restProps}
      >
        {(isChecked || isIndeterminate) && (
          <span className={checkboxIconWrapper}>
            <Icon
              name={isIndeterminate ? "subtract-line" : "check-line"}
              size={checkboxSizeMap[size].icon}
            />
          </span>
        )}
      </span>
    );
  },
);

CheckboxIndicator.displayName = "Checkbox.Indicator";

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

    const groupState = useCheckboxSelection();

    if (groupState && value == null) {
      throw new Error(
        "Checkbox.Root 내부에서는 그룹 내 고유 식별자로 사용할 `value`를 지정해야 합니다.",
      );
    }

    const isGrouped = groupState != null && value != null;

    const [standaloneChecked, setStandaloneChecked] = useControllableState<CheckedState>(
      checked,
      defaultChecked ?? false,
      onCheckedChange,
    );

    const currentChecked: CheckedState = isGrouped
      ? groupState.isSelected(value)
      : standaloneChecked;

    const isEffectiveInvalid = isInvalid && currentChecked === false;

    const onChildCheckedChange = itemContext?.onChildCheckedChange;
    useLayoutEffect(() => {
      onChildCheckedChange?.(currentChecked);
    }, [currentChecked, onChildCheckedChange]);

    const handleCheckedChange = (next: CheckedState) => {
      if (isGrouped) {
        groupState.toggle(value);
        return;
      }
      setStandaloneChecked(next);
    };

    return (
      <RadixCheckbox.Root
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
        className={clsx(
          checkboxControl,
          checkboxControlSlot,
          !isWithinItem && overlay({ density: "normal" }),
          !isWithinItem && focusRing({ feedback: isEffectiveInvalid ? "destructive" : "none" }),
          className,
        )}
        {...restProps}
      >
        <CheckboxIndicator
          size={size}
          state={currentChecked}
          disabled={isDisabled}
          isInvalid={isEffectiveInvalid}
        />
      </RadixCheckbox.Root>
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

export const CheckboxPrimitive = {
  Root: CheckboxRoot,
  Item: CheckboxItem,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Helper: CheckboxHelper,
};
