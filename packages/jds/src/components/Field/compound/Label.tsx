import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

// prefix는 HTMLAttributes의 RDFa 속성과 타입이 충돌하므로 제외하고 ReactNode로 재정의한다.
export interface FieldLabelProps extends Omit<
  ComponentPropsWithoutRef<"label">,
  "htmlFor" | "prefix"
> {
  children?: ReactNode;
  /** 레이블 텍스트 앞에 배치되는 부가 요소 (예: 아이콘) */
  prefix?: ReactNode;
  /** 레이블 텍스트 뒤에 배치되는 부가 요소 (예: 도움말 아이콘) */
  suffix?: ReactNode;
}

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
