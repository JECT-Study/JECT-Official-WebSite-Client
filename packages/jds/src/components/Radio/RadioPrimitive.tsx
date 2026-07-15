import { clsx } from "clsx";
import { RadioGroup } from "radix-ui";
import { forwardRef, useId, useLayoutEffect, useMemo, useState } from "react";
import { focusRing, getLabelClassName } from "utils";
import type { LabelSize } from "utils";

import {
  radioGroupWrapper,
  radioHelper,
  radioHelperSlot,
  radioIndicatorSlot,
  radioItem,
  radioLabel,
  radioLabelSlot,
  radioVisual,
} from "./radio.css";
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: RadioRootProps) => {
  const configValue = useMemo(() => ({ size, variant, disabled }), [size, variant, disabled]);

  return (
    <RadioConfigProvider value={configValue}>
      <RadioGroup.Root
        className={radioGroupWrapper}
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

    const [hasHelper, setHasHelper] = useState(false);

    const configValue = useMemo(
      () => ({ size, variant, disabled: isDisabled }),
      [size, variant, isDisabled],
    );

    return (
      <RadioConfigProvider value={configValue}>
        <RadioItemProvider
          value={{ labelId, helperId, hasHelper, onHelperMountChange: setHasHelper }}
        >
          <RadioGroup.Item
            ref={ref}
            value={value}
            disabled={isDisabled}
            aria-labelledby={labelId}
            aria-describedby={hasHelper ? helperId : undefined}
            className={clsx(radioItem({ size, styleOutlined: variant }), focusRing(), className)}
            {...restProps}
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
    const hasExplicitState = checked !== undefined;

    return (
      <span
        ref={ref}
        aria-hidden
        data-state={hasExplicitState ? (checked ? "checked" : "unchecked") : undefined}
        data-disabled={disabled || undefined}
        className={clsx(radioVisual({ size }), radioIndicatorSlot, className)}
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

export const RadioPrimitive = {
  Root: RadioRoot,
  Item: RadioItem,
  Indicator: RadioIndicator,
  Label: RadioLabel,
  Helper: RadioHelper,
};
