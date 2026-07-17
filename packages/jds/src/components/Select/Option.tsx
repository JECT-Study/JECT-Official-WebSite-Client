import { clsx } from "clsx";
import { useEffect, useId } from "react";

import { CheckboxPrimitive } from "../Checkbox/CheckboxPrimitive";
import { Icon } from "../Icon";
import { useListboxContext } from "./ListboxContext";
import {
  option,
  optionCaption,
  optionCheck,
  optionControlSlot,
  optionText,
  optionTrailing,
} from "./select.css";
import type { SelectOptionProps } from "./select.types";
import { RadioPrimitive } from "../Radio/RadioPrimitive";

import { getLabelClassName } from "@/utils/typography";

export const Option = ({
  value,
  disabled = false,
  caption,
  suffix,
  children,
}: SelectOptionProps) => {
  const {
    mode,
    variant,
    disabled: isGroupDisabled,
    isSelected,
    activeValue,
    select,
    setActive,
    registerOption,
  } = useListboxContext();

  const id = useId();
  const isDisabled = disabled || isGroupDisabled;
  const isItemSelected = isSelected(value);
  const isActive = activeValue === value;

  useEffect(() => registerOption(value, id), [value, id, registerOption]);

  const handleClick = () => {
    if (isDisabled) return;
    setActive(value);
    select(value);
  };

  return (
    <div
      id={id}
      role='option'
      aria-selected={isItemSelected}
      aria-disabled={isDisabled || undefined}
      data-value={value}
      data-variant={variant}
      data-selected={isItemSelected || undefined}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
      className={option}
      onClick={handleClick}
    >
      {variant === "control" && (
        <span className={optionControlSlot}>
          {mode === "multiple" ? (
            <CheckboxPrimitive.Indicator size='md' state={isItemSelected} disabled={isDisabled} />
          ) : (
            <RadioPrimitive.Indicator size='md' checked={isItemSelected} disabled={isDisabled} />
          )}
        </span>
      )}
      <span className={clsx(getLabelClassName({ size: "md" }), optionText)}>{children}</span>
      {(suffix != null || (variant === "label" && isItemSelected)) && (
        <div className={optionTrailing}>
          {suffix}
          {variant === "label" && isItemSelected && (
            <span className={optionCheck}>
              <Icon name='check-line' size='sm' />
            </span>
          )}
        </div>
      )}
      {caption && (
        <span className={clsx(getLabelClassName({ size: "sm", weight: "subtle" }), optionCaption)}>
          {caption}
        </span>
      )}
    </div>
  );
};

Option.displayName = "Select.Option";
