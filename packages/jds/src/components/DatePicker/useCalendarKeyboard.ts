import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import {
  clampDate,
  findAvailableDate,
  getKeyboardTarget,
  getSearchDirection,
  isSameDay,
  startOfMonth,
  toDateKey,
} from "./datePicker.utils";
import type { Weekday } from "./parts/WeekdayLabel";

interface UseCalendarKeyboardParams {
  month: Date;
  gridDates: Date[];
  preferredDates: (Date | null)[];
  weekStartsOn: Weekday;
  minDate?: Date;
  maxDate?: Date;
  isUnavailable: (date: Date) => boolean;
  onMonthChange: (month: Date) => void;
}

/**
 * @description 달력 격자의 roving tabindex와 키보드 날짜 이동을 관리합니다.
 *
 * @remarks
 * Tab 정지점은 `preferredDates` 중 표시 중인 달에서 선택할 수 있는 첫 날짜이고, 없으면 그 달의 첫 선택 가능한 날짜입니다.
 * @returns 격자에 연결할 `gridRef`, `onGridKeyDown`과 셀마다 펼쳐 넣을 `getCellProps`
 */
export const useCalendarKeyboard = ({
  month,
  gridDates,
  preferredDates,
  weekStartsOn,
  minDate,
  maxDate,
  isUnavailable,
  onMonthChange,
}: UseCalendarKeyboardParams) => {
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocusRef = useRef(false);

  const isInMonth = (date: Date) => {
    return isSameDay(startOfMonth(date), month);
  };

  const isFocusable = (date: Date) => {
    return isInMonth(date) && !isUnavailable(date);
  };

  const tabbableDate =
    [focusedDate, ...preferredDates].find(
      (date): date is Date => date !== null && isFocusable(date),
    ) ??
    gridDates.find(isFocusable) ??
    null;

  useEffect(() => {
    if (!shouldMoveFocusRef.current || focusedDate === null) return;

    shouldMoveFocusRef.current = false;
    gridRef.current?.querySelector<HTMLElement>(`[data-date="${toDateKey(focusedDate)}"]`)?.focus();
  });

  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (tabbableDate === null) return;

    const target = getKeyboardTarget(tabbableDate, event.key, event.shiftKey, weekStartsOn);
    if (target === null) return;

    event.preventDefault();

    const bounded = clampDate(target, minDate, maxDate);
    const direction = getSearchDirection(event.key, tabbableDate, target, bounded);
    const next = findAvailableDate(bounded, direction, isUnavailable, minDate, maxDate);
    if (next === null) return;

    shouldMoveFocusRef.current = true;
    setFocusedDate(next);
    if (!isInMonth(next)) onMonthChange(next);
  };

  const getCellProps = (date: Date) => {
    return {
      tabIndex: isSameDay(date, tabbableDate) ? 0 : -1,
      "data-date": toDateKey(date),
      onFocus: () => {
        setFocusedDate(date);
      },
    };
  };

  return { gridRef, onGridKeyDown, getCellProps };
};
