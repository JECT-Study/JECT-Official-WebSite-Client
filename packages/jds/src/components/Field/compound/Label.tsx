import { clsx } from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { useFieldContext } from "../field.context";
import * as styles from "../field.css";
import type { FieldLabelProps } from "../field.types";

import { getLabelClassName } from "@/utils/typography";

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, prefix, suffix, className, ...restProps }, ref) => {
    const {
      fieldId,
      labelId,
      onLabelMountChange,
      isControlRequired,
      disabled: isDisabled,
    } = useFieldContext("Field.Label");

    useLayoutEffect(() => {
      onLabelMountChange(true);
      return () => onLabelMountChange(false);
    }, [onLabelMountChange]);

    return (
      <span className={styles.labelContainer}>
        {prefix}
        <span className={styles.labelMain}>
          <label
            {...restProps}
            ref={ref}
            id={labelId}
            htmlFor={fieldId}
            className={clsx(
              getLabelClassName({ size: "sm" }),
              styles.label({ disabled: isDisabled }),
              className,
            )}
          >
            {children}
          </label>
          {isControlRequired && (
            <span
              className={clsx(
                getLabelClassName({ size: "sm" }),
                styles.requiredMark({ disabled: isDisabled }),
              )}
              aria-hidden
            >
              *
            </span>
          )}
        </span>
        {suffix}
      </span>
    );
  },
);

FieldLabel.displayName = "Field.Label";
