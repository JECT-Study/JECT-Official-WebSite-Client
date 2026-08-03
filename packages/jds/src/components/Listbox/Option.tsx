import { clsx } from "clsx";

import { CheckboxPrimitive } from "../Checkbox/CheckboxPrimitive";
import { Icon } from "../Icon";
import * as styles from "./listbox.css";
import type { OptionProps } from "./listbox.types";
import { getOptionId } from "./listbox.utils";
import { useListboxContext } from "./ListboxContext";
import { RadioPrimitive } from "../Radio/RadioPrimitive";

import { getLabelClassName } from "@/utils/typography";

export const Option = ({ value, disabled = false, caption, suffix, children }: OptionProps) => {
  const {
    listboxId,
    mode,
    variant,
    disabled: isGroupDisabled,
    isSelected,
    activeValue,
    select,
    setActive,
  } = useListboxContext();

  const id = getOptionId(listboxId, value);
  const isDisabled = disabled || isGroupDisabled;
  const isItemSelected = isSelected(value);
  const isActive = activeValue === value;

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
      className={styles.option}
      onClick={handleClick}
    >
      {variant === "control" && (
        <span className={styles.optionControlSlot}>
          {mode === "multiple" ? (
            <CheckboxPrimitive.Indicator size='md' state={isItemSelected} disabled={isDisabled} />
          ) : (
            <RadioPrimitive.Indicator size='md' checked={isItemSelected} disabled={isDisabled} />
          )}
        </span>
      )}
      <span className={clsx(getLabelClassName({ size: "md" }), styles.optionText)}>{children}</span>
      {(suffix != null || (variant === "label" && isItemSelected)) && (
        <div className={styles.optionTrailing}>
          {suffix}
          {variant === "label" && isItemSelected && (
            <span className={styles.optionCheck}>
              <Icon name='check-line' size='sm' />
            </span>
          )}
        </div>
      )}
      {caption && (
        <span
          className={clsx(
            getLabelClassName({ size: "sm", weight: "subtle" }),
            styles.optionCaption,
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
};

Option.displayName = "Option";
