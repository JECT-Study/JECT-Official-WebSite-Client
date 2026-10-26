import { Popover } from "radix-ui";
import type { FocusEventHandler, RefObject } from "react";

import { DatePicker } from "../../DatePicker";
import { isDateUnavailable } from "../../DatePicker/datePicker.utils";
import * as styles from "../dateField.css";
import type { DateFieldInputProps } from "../dateField.types";
import { dateToValue, valueToDate } from "../dateField.utils";

interface DateFieldPickerProps extends Pick<
  DateFieldInputProps,
  "minDate" | "maxDate" | "isDateDisabled" | "withActionBar"
> {
  contentRef: RefObject<HTMLDivElement>;
  onBlur: FocusEventHandler<HTMLDivElement>;
  /** "YYYY-MM-DD" 형식의 값. 비어 있으면 선택된 날짜가 없다. */
  value: string;
  defaultMonth?: Date;
  /** 달력에서 날짜를 고르면 "YYYY-MM-DD" 값으로 호출된다. */
  onSelect: (value: string) => void;
  onCloseAutoFocus: (event: Event) => void;
  onInteractOutside: () => void;
}

const TABBABLE_DATE_CELL_SELECTOR = '[role="grid"] [tabindex="0"]';

/**
 * @description 필드 박스 아래에 달력을 띄우는 팝오버. `Popover.Root` 안에서 사용한다.
 * 입력값과 같은 "YYYY-MM-DD" 값을 주고받고, `DatePicker`가 쓰는 Date와의 변환은 여기서 한다.
 */
export const DateFieldPicker = ({
  contentRef,
  onBlur,
  value,
  defaultMonth,
  onSelect,
  withActionBar,
  minDate,
  maxDate,
  isDateDisabled,
  onCloseAutoFocus,
  onInteractOutside,
}: DateFieldPickerProps) => {
  // DateField의 문자열 형식으로 표현할 수 없는 날짜는 달력에서도 고를 수 없다.
  const isUnavailable = (date: Date) =>
    dateToValue(date) === "" || isDateUnavailable(date, { minDate, maxDate, isDateDisabled });

  const handleChange = (date: Date | null) => {
    // 임시 선택 뒤 제한이 바뀌었을 수 있으므로 적용 시점에도 다시 검사한다.
    if (date !== null && isUnavailable(date)) return;
    onSelect(dateToValue(date));
  };

  // 첫 탭 정지점인 헤더의 연도 버튼 대신, 선택된 날짜(없으면 오늘) 셀에서 시작한다.
  const handleOpenAutoFocus = (event: Event) => {
    const cell =
      contentRef.current?.querySelector<HTMLElement>(TABBABLE_DATE_CELL_SELECTOR) ?? null;
    if (cell === null) return;

    event.preventDefault();
    cell.focus();
  };

  // 연, 월 목록이 열려 있으면 Esc는 목록만 닫아야 한다.
  // Radix는 Esc를 document 캡처 단계에서 받아 DatePicker가 전파를 막아도 팝오버를 닫으므로 여기서 막는다.
  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    // 격자의 렌더 여부 대신 연월 버튼이 노출하는 펼침 상태를 확인한다.
    const expandedListTrigger =
      contentRef.current?.querySelector('button[aria-expanded="true"]') ?? null;
    if (expandedListTrigger !== null) event.preventDefault();
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
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={handleEscapeKeyDown}
        onInteractOutside={onInteractOutside}
        onBlur={onBlur}
      >
        <DatePicker
          ref={contentRef}
          className={styles.picker}
          value={valueToDate(value)}
          defaultMonth={defaultMonth}
          onChange={withActionBar ? undefined : handleChange}
          onApply={withActionBar ? handleChange : undefined}
          withActionBar={withActionBar}
          minDate={minDate}
          maxDate={maxDate}
          isDateDisabled={isUnavailable}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};
