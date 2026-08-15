import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldCounterProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** 현재 개수 (글자 수, 선택 개수 등 필드가 세는 값) */
  current: number;
  /** 허용 최대 개수 */
  max: number;
}

export const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(
  ({ current, max, className, ...restProps }, ref) => {
    const {
      counterId,
      onCounterMountChange,
      status,
      disabled: isDisabled,
    } = useFieldContext("Field.Counter");

    useLayoutEffect(() => {
      onCounterMountChange(true);
      return () => onCounterMountChange(false);
    }, [onCounterMountChange]);

    return (
      <span
        {...restProps}
        ref={ref}
        id={counterId}
        className={clsx(
          getLabelClassName({ size: "sm" }),
          styles.supportText({ status, disabled: isDisabled }),
          className,
        )}
      >
        {`${current}/${max}`}
      </span>
    );
  },
);

FieldCounter.displayName = "Field.Counter";
