import { clsx } from "clsx";
import { useLayoutEffect } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as fieldStyles from "../../Field/field.css";
import { useMultiSelectFieldContext } from "../MultiSelectField.context";
import * as styles from "../multiSelectField.css";

import { getLabelClassName } from "@/utils/typography";

export const MultiSelectFieldCounter = () => {
  const { valueCount, maxValues, counterId, onCounterMountChange } =
    useMultiSelectFieldContext("MultiSelectField.Counter");
  const {
    fieldStyle,
    status,
    disabled: isDisabled,
  } = useFieldContext("MultiSelectField.Counter");

  const isVisible = maxValues != null;

  useLayoutEffect(() => {
    if (!isVisible) return;

    onCounterMountChange(true);
    return () => onCounterMountChange(false);
  }, [isVisible, onCounterMountChange]);

  if (!isVisible) return null;

  return (
    <span
      id={counterId}
      className={clsx(
        getLabelClassName({ size: "sm" }),
        fieldStyles.helperText({ fieldStyle, status, disabled: isDisabled }),
        styles.counter,
      )}
    >
      {`${valueCount}/${maxValues}`}
    </span>
  );
};

MultiSelectFieldCounter.displayName = "MultiSelectField.Counter";
