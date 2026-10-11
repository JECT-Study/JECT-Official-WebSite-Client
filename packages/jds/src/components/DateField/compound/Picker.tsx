import { Popover } from "radix-ui";
import { useRef } from "react";

import { DatePicker } from "../../DatePicker";
import * as styles from "../dateField.css";
import type { DateFieldInputProps } from "../dateField.types";
import { dateToValue, valueToDate } from "../dateField.utils";

interface DateFieldPickerProps extends Pick<
  DateFieldInputProps,
  "minDate" | "maxDate" | "isDateDisabled"
> {
  /** "YYYY-MM-DD" 형식의 값. 비어 있으면 선택된 날짜가 없다. */
  value: string;
  /** 달력에서 날짜를 고르면 "YYYY-MM-DD" 값으로 호출된다. */
  onSelect: (value: string) => void;
  disabled: boolean;
  readOnly: boolean;
}

// DatePicker는 날짜 보기일 때만 격자를 렌더한다. 현재 보기를 노출하지 않으므로 격자 유무로 판단한다.
const DATE_GRID_SELECTOR = '[role="grid"]';
const TABBABLE_DATE_CELL_SELECTOR = `${DATE_GRID_SELECTOR} [tabindex="0"]`;

/**
 * @description 필드 박스 아래에 달력을 띄우는 팝오버. `Popover.Root` 안에서 사용한다.
 * 입력값과 같은 "YYYY-MM-DD" 값을 주고받고, `DatePicker`가 쓰는 Date와의 변환은 여기서 한다.
 */
export const DateFieldPicker = ({
  value,
  onSelect,
  disabled,
  readOnly,
  minDate,
  maxDate,
  isDateDisabled,
}: DateFieldPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleChange = (date: Date | null) => {
    onSelect(dateToValue(date));
  };

  // 첫 탭 정지점인 헤더의 연도 버튼 대신, 선택된 날짜(없으면 오늘) 셀에서 시작한다.
  const handleOpenAutoFocus = (event: Event) => {
    const cell = pickerRef.current?.querySelector<HTMLElement>(TABBABLE_DATE_CELL_SELECTOR) ?? null;
    if (cell === null) return;

    event.preventDefault();
    cell.focus();
  };

  // 연, 월 목록이 열려 있으면 Esc는 목록만 닫아야 한다.
  // Radix는 Esc를 document 캡처 단계에서 받아 DatePicker가 전파를 막아도 팝오버를 닫으므로 여기서 막는다.
  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    const dateGrid = pickerRef.current?.querySelector(DATE_GRID_SELECTOR) ?? null;
    const isListView = dateGrid === null;
    if (isListView) event.preventDefault();
  };

  return (
    <Popover.Portal>
      <Popover.Content
        asChild
        align='start'
        sideOffset={4}
        collisionPadding={8}
        aria-label='날짜 선택'
        onOpenAutoFocus={handleOpenAutoFocus}
        onEscapeKeyDown={handleEscapeKeyDown}
      >
        <DatePicker
          ref={pickerRef}
          className={styles.picker}
          value={valueToDate(value)}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          minDate={minDate}
          maxDate={maxDate}
          isDateDisabled={isDateDisabled}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};
