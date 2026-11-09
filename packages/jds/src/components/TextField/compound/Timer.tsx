import { clsx } from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { useFieldContext } from "../../Field/field.context";
import * as fieldStyles from "../../Field/field.css";
import * as styles from "../textField.css";
import type { TextFieldTimerProps } from "../textField.types";

import { formatTimer } from "@/utils/formatTimer";
import { getLabelClassName } from "@/utils/typography";

/**
 * @description 소비처가 넘긴 남은 시간을 Counter 자리에 렌더한다.
 * 값은 컨트롤이 아니라 소비처가 소유하므로 props로 받고, 카운트다운 진행과 만료 처리도 소비처가 담당한다.
 * Counter와 같은 id를 사용하므로 한 필드에 함께 배치하지 않는다.
 */
export const TextFieldTimer = forwardRef<HTMLSpanElement, TextFieldTimerProps>(
  ({ seconds, timeFormatter = formatTimer, className, ...restProps }, ref) => {
    const {
      counterId,
      onCounterMountChange,
      status,
      disabled: isDisabled,
    } = useFieldContext("TextField.Timer");

    // 컨트롤의 aria-describedby에 연결되도록 Counter 자리에 마운트되었음을 보고한다.
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
          fieldStyles.supportText({ status, disabled: isDisabled }),
          fieldStyles.counter,
          styles.timer,
          className,
        )}
      >
        {timeFormatter(seconds)}
      </span>
    );
  },
);

TextFieldTimer.displayName = "TextField.Timer";
