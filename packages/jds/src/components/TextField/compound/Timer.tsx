import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldContext } from "../../Field/field.context";
import * as fieldStyles from "../../Field/field.css";
import { useFieldCounterSlot } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";
import type { TextFieldTimerProps } from "../textField.types";

import { formatTimer } from "@/utils/formatTimer";
import { getLabelClassName } from "@/utils/typography";

/**
 * @description 소비처가 넘긴 남은 시간을 Counter 자리에 렌더한다.
 * 값은 컨트롤이 아니라 소비처가 소유하므로 props로 받고, 카운트다운 진행과 만료 처리도 소비처가 담당한다.
 * Counter 자리를 공유하므로 TextField.Counter와 함께 배치하면 먼저 등록된 요소만 렌더된다.
 */
export const TextFieldTimer = forwardRef<HTMLSpanElement, TextFieldTimerProps>(
  ({ seconds, timeFormatter = formatTimer, className, ...restProps }, ref) => {
    const { status, disabled: isDisabled } = useFieldContext("TextField.Timer");
    const { counterId, isOwner } = useFieldCounterSlot("TextField.Timer");

    if (!isOwner) return null;

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
