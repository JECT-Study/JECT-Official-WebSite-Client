import { useLayoutEffect, useRef, useState } from "react";

import {
  addMonths,
  clampMonth,
  isMonthOutOfRange,
  isSameDay,
  startOfMonth,
} from "./datePicker.utils";

interface UseVisibleMonthParams {
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  selected: Date | null;
  today: Date;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * @description 표시 중인 달을 제어, 비제어 방식으로 관리합니다.
 *
 * @remarks
 * 달은 항상 `minDate`, `maxDate` 범위 안으로 보정되고, `selected`가 다른 달의 날짜로 바뀌면 그 달로 이동합니다.
 * @returns 보정된 `month`, 달을 바꾸는 `setMonth`, 범위의 첫 달과 마지막 달 여부
 */
export const useVisibleMonth = ({
  month: monthProp,
  defaultMonth,
  onMonthChange,
  selected,
  today,
  minDate,
  maxDate,
}: UseVisibleMonthParams) => {
  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(defaultMonth ?? selected ?? today),
  );
  const isControlled = monthProp !== undefined;

  const month = clampMonth(
    startOfMonth(isControlled ? monthProp : internalMonth),
    minDate,
    maxDate,
  );

  const setMonth = (next: Date) => {
    const target = clampMonth(startOfMonth(next), minDate, maxDate);
    if (isSameDay(target, month)) return;

    if (!isControlled) setInternalMonth(target);
    onMonthChange?.(target);
  };

  const previousSelectedRef = useRef(selected);

  useLayoutEffect(() => {
    if (isSameDay(previousSelectedRef.current, selected)) return;

    previousSelectedRef.current = selected;
    if (selected !== null) setMonth(selected);
  });

  return {
    month,
    setMonth,
    isFirstMonth: isMonthOutOfRange(addMonths(month, -1), minDate, maxDate),
    isLastMonth: isMonthOutOfRange(addMonths(month, 1), minDate, maxDate),
  };
};
