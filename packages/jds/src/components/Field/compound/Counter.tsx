import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef } from "react";

import { useFieldContext, useFieldCounterValue } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export type FieldCounterProps = Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * @description 컨트롤이 보고한 카운터 값을 렌더한다.
 * 컨트롤이 최대 개수를 지정하지 않으면 배치해도 렌더되지 않는다.
 */
export const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(
  ({ className, ...restProps }, ref) => {
    const {
      counterId,
      onCounterMountChange,
      status,
      disabled: isDisabled,
    } = useFieldContext("Field.Counter");

    const counter = useFieldCounterValue();

    const hasCounter = counter != null;

    useLayoutEffect(() => {
      if (!hasCounter) return;

      onCounterMountChange(true);
      return () => onCounterMountChange(false);
    }, [hasCounter, onCounterMountChange]);

    if (counter == null) return null;

    return (
      <span
        {...restProps}
        ref={ref}
        id={counterId}
        className={clsx(
          getLabelClassName({ size: "sm" }),
          styles.supportText({ status, disabled: isDisabled }),
          styles.counter,
          className,
        )}
      >
        {`${counter.current}/${counter.max}`}
      </span>
    );
  },
);

FieldCounter.displayName = "Field.Counter";
