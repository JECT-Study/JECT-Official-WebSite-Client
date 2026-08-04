import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { RadioGroup } from "radix-ui";
import { forwardRef, useId, useLayoutEffect, useMemo, useState } from "react";
import { focusRing, getLabelClassName } from "utils";
import type { LabelSize } from "utils";

import * as styles from "./radio.css";
import type {
  RadioSize,
  RadioIndicatorProps,
  RadioHelperProps,
  RadioItemProps,
  RadioLabelProps,
  RadioRootProps,
} from "./radio.types";
import {
  RadioItemProvider,
  RadioConfigProvider,
  useRadioConfig,
  useRadioItem,
} from "./RadioContext";
import type { RadioConfigContextValue, RadioItemContextValue } from "./RadioContext";

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
  layout = "vertical",
  columns,
  stretched = false,
  value,
  defaultValue,
  onChange,
  name,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: RadioRootProps) => {
  const configValue = useMemo<RadioConfigContextValue>(
    () => ({ size, variant, disabled, stretched }),
    [size, variant, disabled, stretched],
  );

  return (
    <RadioConfigProvider value={configValue}>
      <RadioGroup.Root
        className={styles.radioGroupWrapper({ layout })}
        style={
          layout === "grid"
            ? assignInlineVars({
                [styles.radioGroupColumnsVar]: String(Math.max(1, Math.floor(Number(columns)))),
              })
            : undefined
        }
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </RadioGroup.Root>
    </RadioConfigProvider>
  );
};

RadioRoot.displayName = "Radio.Root";

const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  (
    {
      value,
      size: sizeProp,
      variant: variantProp,
      disabled = false,
      stretched: stretchedProp,
      children,
      className,
      ...restProps
    },
    ref,
  ) => {
    const parentContext = useRadioConfig();
    const labelId = useId();
    const helperId = useId();

    const size = sizeProp ?? parentContext?.size ?? "md";
    const isDisabled = disabled || (parentContext?.disabled ?? false);
    const variant = variantProp ?? parentContext?.variant ?? "hollow";
    const isStretched = stretchedProp ?? parentContext?.stretched ?? false;

    const [hasHelper, setHasHelper] = useState(false);

    const configValue = useMemo<RadioConfigContextValue>(
      () => ({ size, variant, disabled: isDisabled, stretched: isStretched }),
      [size, variant, isDisabled, isStretched],
    );

    const itemValue = useMemo<RadioItemContextValue>(
      () => ({ labelId, helperId, hasHelper, onHelperMountChange: setHasHelper }),
      [labelId, helperId, hasHelper],
    );

    return (
      <RadioConfigProvider value={configValue}>
        <RadioItemProvider value={itemValue}>
          <RadioGroup.Item
            ref={ref}
            {...restProps}
            value={value}
            disabled={isDisabled}
            aria-labelledby={labelId}
            aria-describedby={hasHelper ? helperId : undefined}
            className={clsx(
              styles.radioItem({ size, styleOutlined: variant, stretched: isStretched }),
              focusRing(),
              className,
            )}
          >
            {children}
          </RadioGroup.Item>
        </RadioItemProvider>
      </RadioConfigProvider>
    );
  },
);

RadioItem.displayName = "Radio.Item";

const RadioIndicator = forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({ size: sizeProp, checked, disabled = false, className, ...restProps }, ref) => {
    const config = useRadioConfig();
    const size = sizeProp ?? config?.size ?? "md";
    const isWithinItem = useRadioItem() != null;
    const hasExplicitState = checked !== undefined;

    return (
      <span
        ref={ref}
        aria-hidden
        data-state={hasExplicitState ? (checked ? "checked" : "unchecked") : undefined}
        data-disabled={disabled || undefined}
        className={clsx(
          styles.radioVisual({ size }),
          styles.radioIndicatorSlot,
          isWithinItem && styles.radioIndicatorInItem,
          className,
        )}
        {...restProps}
      />
    );
  },
);

RadioIndicator.displayName = "Radio.Indicator";

const RadioLabel = forwardRef<HTMLSpanElement, RadioLabelProps>(({ children }, ref) => {
  const size = useRadioConfig()?.size ?? "md";
  const labelId = useRadioItem()?.labelId;
  return (
    <span
      ref={ref}
      id={labelId}
      className={clsx(
        getLabelClassName({ size: radioTextSizeMap[size].label }),
        styles.radioLabel,
        styles.radioLabelSlot,
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
        styles.radioHelper,
        styles.radioHelperSlot,
      )}
    >
      {children}
    </span>
  );
});

RadioHelper.displayName = "Radio.Helper";

export const RadioPrimitive = {
  Root: RadioRoot,
  Item: RadioItem,
  Indicator: RadioIndicator,
  Label: RadioLabel,
  Helper: RadioHelper,
};
