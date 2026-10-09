import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";

import type { Weekday } from "./datePicker.types";
import {
  clampDate,
  findAvailableDate,
  getKeyboardTarget,
  getSearchDirection,
  isSameDay,
  startOfMonth,
  toDateKey,
} from "./datePicker.utils";

interface UseCalendarKeyboardParams {
  month: Date;
  gridDates: Date[];
  displayed: Date | null;
  today: Date;
  weekStartsOn: Weekday;
  minDate?: Date;
  maxDate?: Date;
  isUnavailable: (date: Date) => boolean;
  onMonthChange: (month: Date) => void;
}

/**
 * @description 달력 격자의 roving tabindex와 키보드 날짜 이동을 관리합니다.
 * @returns 격자에 연결할 `gridRef`, `onGridKeyDown`, 셀마다 펼쳐 넣을 `getCellProps`와 다음 렌더에서 날짜 셀로 포커스를 옮기는 `focusDate`
 */
export const useCalendarKeyboard = ({
  month,
  gridDates,
  displayed,
  today,
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

  const isFocusedDateInGrid =
    focusedDate !== null &&
    gridDates.some(date => isSameDay(date, focusedDate)) &&
    !isUnavailable(focusedDate);

  const getEntryDate = () => {
    if (displayed !== null && isFocusable(displayed)) return displayed;
    if (isFocusable(today)) return today;

    return gridDates.find(isFocusable) ?? null;
  };

  const tabbableDate = isFocusedDateInGrid ? focusedDate : getEntryDate();

  useEffect(() => {
    if (!shouldMoveFocusRef.current || focusedDate === null) return;

    shouldMoveFocusRef.current = false;
    gridRef.current?.querySelector<HTMLElement>(`[data-date="${toDateKey(focusedDate)}"]`)?.focus();
  });

  const focusDate = (date: Date) => {
    shouldMoveFocusRef.current = true;
    setFocusedDate(date);
  };

  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (tabbableDate === null) return;

    const target = getKeyboardTarget(tabbableDate, event.key, event.shiftKey, weekStartsOn);
    if (target === null) return;

    event.preventDefault();

    const bounded = clampDate(target, minDate, maxDate);
    const direction = getSearchDirection(event.key, tabbableDate, target, bounded);
    const next = findAvailableDate(bounded, direction, isUnavailable, minDate, maxDate);
    if (next === null) return;

    focusDate(next);
    if (!isInMonth(next)) onMonthChange(next);
  };

  const getCellProps = (date: Date) => {
    return {
      tabIndex: isSameDay(date, tabbableDate) ? 0 : -1,
      "data-date": toDateKey(date),
      onFocus: () => {
        setFocusedDate(date);
      },
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (gridRef.current?.contains(event.relatedTarget)) return;

        setFocusedDate(null);
      },
    };
  };

  return { gridRef, onGridKeyDown, getCellProps, focusDate };
};
