import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldContext, useFieldCounterValue } from "../field.context";
import * as styles from "../field.css";
import type { FieldCounterProps } from "../field.types";
import { useFieldCounterSlot } from "../useFieldCounter";

import { getLabelClassName } from "@/utils/typography";

/**
 * @description 컨트롤이 보고한 카운터 값을 렌더한다.
 * 컨트롤이 최대 개수를 지정하지 않으면 배치해도 렌더되지 않는다.
 * Counter 자리를 다른 요소가 먼저 차지했다면 렌더되지 않는다.
 */
export const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(
  ({ className, ...restProps }, ref) => {
    const { status, disabled: isDisabled } = useFieldContext("Field.Counter");
    const counter = useFieldCounterValue();
    const { counterId, isSlotAvailable } = useFieldCounterSlot("Field.Counter", counter != null);

    if (counter == null || !isSlotAvailable) return null;

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
