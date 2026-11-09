import { Popover } from "radix-ui";
import type { FocusEventHandler, RefObject } from "react";

import { TimePicker, type TimeValue } from "../../TimePicker";
import * as styles from "../timeField.css";
import type { TimeFieldInputProps } from "../timeField.types";
import { timeToValue, valueToTime } from "../timeField.utils";

interface TimeFieldPickerProps extends Pick<
  TimeFieldInputProps,
  "minuteStep" | "minTime" | "maxTime" | "withActionBar"
> {
  contentRef: RefObject<HTMLDivElement>;
  onBlur: FocusEventHandler<HTMLDivElement>;
  /** "HH:mm" 형식의 값. 비어 있으면 선택된 시각이 없다. */
  value: string;
  /** 시간 선택에서 시각을 확정하면 "HH:mm" 값으로 호출된다. */
  onSelect: (value: string) => void;
  onCloseAutoFocus: (event: Event) => void;
  onInteractOutside: () => void;
}

const FOCUSABLE_COLUMN_SELECTOR = '[role="listbox"][tabindex="0"]';

/**
 * @description 필드 박스 아래에 시간 선택을 띄우는 팝오버. `Popover.Root` 안에서 사용한다.
 * 입력값과 같은 "HH:mm" 값을 주고받고, `TimePicker`가 쓰는 시각 객체와의 변환은 여기서 한다.
 */
export const TimeFieldPicker = ({
  contentRef,
  onBlur,
  value,
  onSelect,
  withActionBar,
  minuteStep,
  minTime,
  maxTime,
  onCloseAutoFocus,
  onInteractOutside,
}: TimeFieldPickerProps) => {
  const handleChange = (time: TimeValue) => {
    onSelect(timeToValue(time));
  };

  // 첫 열(오전/오후)에서 시작한다. 열 안에서는 위아래, 열 사이는 좌우 방향키로 이동한다.
  const handleOpenAutoFocus = (event: Event) => {
    const column =
      contentRef.current?.querySelector<HTMLElement>(FOCUSABLE_COLUMN_SELECTOR) ?? null;
    if (column === null) return;

    event.preventDefault();
    column.focus();
  };

  return (
    <Popover.Portal>
      <Popover.Content
        asChild
        align='start'
        sideOffset={4}
        collisionPadding={8}
        aria-label='시간 선택'
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onInteractOutside={onInteractOutside}
        onBlur={onBlur}
      >
        <TimePicker
          ref={contentRef}
          className={styles.picker}
          format='hh:mm'
          value={valueToTime(value)}
          onChange={handleChange}
          withActionBar={withActionBar}
          minuteStep={minuteStep}
          minTime={minTime}
          maxTime={maxTime}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};
