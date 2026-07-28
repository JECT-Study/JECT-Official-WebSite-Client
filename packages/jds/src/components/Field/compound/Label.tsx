import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldLabelProps extends ComponentPropsWithoutRef<"label"> {
  children?: ReactNode;
  /** 라벨 텍스트 앞에 배치되는 부가 요소 (예: 아이콘) */
  prefixSlot?: ReactNode;
  /** 라벨 텍스트(+required 별표) 뒤에 배치되는 부가 요소 (예: 도움말 아이콘) */
  suffixSlot?: ReactNode;
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ id: idFromProps, children, prefixSlot, suffixSlot, className, ...restProps }, ref) => {
    const {
      fieldId,
      fieldStyle,
      disabled: isDisabled,
      required: isRequired,
    } = useFieldContext("Field.Label");

    const id = idFromProps ?? fieldId;

    return (
      <span className={styles.labelContainer({ fieldStyle })}>
        {prefixSlot}
        <span className={styles.labelMain}>
          <label
            ref={ref}
            htmlFor={id}
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
            <span
              className={clsx(
                getLabelClassName({ size: "sm" }),
                styles.asterisk({ disabled: isDisabled }),
              )}
              aria-hidden
            >
              *
            </span>
          )}
        </span>
        {suffixSlot}
      </span>
    );
  },
);

FieldLabel.displayName = "Field.Label";
