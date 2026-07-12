import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldLabelProps extends Omit<ComponentPropsWithoutRef<"label">, "htmlFor"> {
  children?: ReactNode;
  /** 라벨 텍스트 왼쪽에 배치되는 부가 요소 (예: 아이콘) */
  leftSlot?: ReactNode;
  /** 라벨 텍스트(+required 별표) 오른쪽에 배치되는 부가 요소 (예: 도움말 아이콘) */
  rightSlot?: ReactNode;
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, leftSlot, rightSlot, className, ...restProps }, ref) => {
    const {
      fieldId,
      fieldStyle,
      disabled: isDisabled,
      required: isRequired,
    } = useFieldContext("Field.Label");

    return (
      <span className={styles.labelContainer({ fieldStyle })}>
        {leftSlot}
        <span className={styles.labelMain}>
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
        {rightSlot}
      </span>
    );
  },
);

FieldLabel.displayName = "Field.Label";
