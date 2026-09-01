import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export type FieldCounterProps = Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * @description 컨트롤이 보고한 카운터 값을 렌더한다.
 * 보고가 없으면 아무것도 렌더하지 않으므로, 컨트롤에 최대치를 지정하지 않으면 배치해도 표시되지 않는다.
 */
export const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(
  ({ className, ...restProps }, ref) => {
    const {
      counterId,
      counter,
      onCounterMountChange,
      status,
      disabled: isDisabled,
    } = useFieldContext("Field.Counter");

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
