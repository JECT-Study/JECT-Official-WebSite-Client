import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldLabelProps extends Omit<ComponentPropsWithoutRef<"label">, "htmlFor"> {
  children?: ReactNode;
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      fieldId,
      fieldStyle,
      disabled: isDisabled,
      required: isRequired,
    } = useFieldContext("Field.Label");

    return (
      <span className={styles.labelContainer({ fieldStyle })}>
        <label
          ref={ref}
          htmlFor={fieldId}
          className={clsx(
            getLabelClassName({ size: "sm" }),
            styles.label({ disabled: isDisabled }),
            className,
          )}
          {...restProps}
        >
          {children}
        </label>
        {isRequired && (
          <div className={styles.asteriskContainer}>
            <span className={styles.asterisk} aria-hidden>
              *
            </span>
          </div>
        )}
      </span>
    );
  },
);

FieldLabel.displayName = "Field.Label";
