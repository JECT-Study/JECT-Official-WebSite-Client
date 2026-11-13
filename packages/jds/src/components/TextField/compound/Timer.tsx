import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldContext } from "../../Field/field.context";
import * as fieldStyles from "../../Field/field.css";
import { useFieldCounterSlot } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";
import type { TextFieldTimerProps } from "../textField.types";

import { formatTimer, formatTimerLabel } from "@/utils/formatTimer";
import { getLabelClassName } from "@/utils/typography";
import { visuallyHidden } from "@/utils/visuallyHidden.css";

/**
 * @description 소비처가 넘긴 남은 시간을 Counter 자리에 렌더한다.
 * 값은 컨트롤이 아니라 소비처가 소유하므로 props로 받고, 카운트다운 진행과 만료 처리도 소비처가 담당한다.
 * Counter 자리를 공유하므로 TextField.Counter와 함께 배치하면 먼저 등록된 요소만 렌더된다.
 *
 * 화면에는 `timeFormatter` 결과를 표시하고, 스크린 리더는 `seconds`로 만든 `남은 시간 n분 n초`를 읽는다.
 * 매초 값이 바뀌므로 aria-live는 두지 않으며, 컨트롤에 포커스할 때 그 시점의 남은 시간을 읽는다.
 */
export const TextFieldTimer = forwardRef<HTMLSpanElement, TextFieldTimerProps>(
  ({ seconds, timeFormatter = formatTimer, className, ...restProps }, ref) => {
    const { status, disabled: isDisabled } = useFieldContext("TextField.Timer");
    const { counterId, isSlotAvailable } = useFieldCounterSlot("TextField.Timer");

    if (!isSlotAvailable) return null;

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
        <span aria-hidden>{timeFormatter(seconds)}</span>
        <span className={visuallyHidden}>{`남은 시간 ${formatTimerLabel(seconds)}`}</span>
      </span>
    );
  },
);

TextFieldTimer.displayName = "TextField.Timer";
