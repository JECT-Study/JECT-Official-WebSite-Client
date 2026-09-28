import { clsx } from "clsx";
import { useControllableState } from "hooks";
import { forwardRef, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

import * as styles from "./datePicker.css";
import { YEAR_RANGE_RADIUS, type DatePickerProps, type DatePickerView } from "./datePicker.types";
import {
  addMonths,
  clampMonth,
  formatMonthLabel,
  formatYearLabel,
  formatYearMonthLabel,
  getCellStatus,
  getGridDates,
  getMonthOptions,
  getWeekCount,
  getYearOptions,
  isDateUnavailable,
  isMonthOutOfRange,
  isSameDay,
  MAX_WEEKS_IN_GRID,
  startOfDay,
  startOfMonth,
} from "./datePicker.utils";
import { ActionBar } from "./parts/ActionBar";
import { Calendar, getCalendarBodyHeight } from "./parts/Calendar";
import { Cell } from "./parts/Cell";
import { Header } from "./parts/Header";
import { OptionList } from "./parts/OptionList";
import { useCalendarKeyboard } from "./useCalendarKeyboard";
import { IconButton } from "../Button/IconButton";
import { LabelButton } from "../Button/LabelButton";
import { Divider } from "../Divider";

/**
 * @description 날짜 하나를 고르는 달력 패널
 *
 * @remarks
 * 표시 중인 달은 DatePicker가 관리합니다. 다른 달의 날짜는 표시만 하고 선택할 수 없으며, 달은 이전 달, 다음 달 버튼과 연월 목록으로만 이동합니다.
 * @public
 * @name DatePicker
 * @tag div
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue = null,
      onChange,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      weekStartsOn = 1,
      withActionBar = false,
      fixedWeeks = false,
      disabled = false,
      readOnly = false,
      minDate,
      maxDate,
      isDateDisabled,
      className,
      onKeyDown,
      ...restProps
    },
    forwardedRef,
  ) => {
    const today = startOfDay(new Date());
    const [selected, setSelected] = useControllableState<Date | null>(
      value,
      defaultValue,
      onChange,
    );
    const [internalMonth, setInternalMonth] = useState(() =>
      startOfMonth(defaultMonth ?? selected ?? today),
    );
    const isMonthControlled = monthProp !== undefined;
    const [view, setView] = useState<DatePickerView>("date");
    const yearButtonRef = useRef<HTMLButtonElement>(null);
    const monthButtonRef = useRef<HTMLButtonElement>(null);

    const [draft, setDraft] = useState<Date | null>(selected);
    const [syncedSelected, setSyncedSelected] = useState<Date | null>(selected);

    if (!isSameDay(syncedSelected, selected)) {
      setSyncedSelected(selected);
      setDraft(selected);
    }

    const displayed = withActionBar ? draft : selected;
    const month = clampMonth(
      startOfMonth(isMonthControlled ? monthProp : internalMonth),
      minDate,
      maxDate,
    );
    const year = month.getFullYear();
    const isFirstMonth = isMonthOutOfRange(addMonths(month, -1), minDate, maxDate);
    const isLastMonth = isMonthOutOfRange(addMonths(month, 1), minDate, maxDate);
    const weekCount = fixedWeeks ? MAX_WEEKS_IN_GRID : getWeekCount(month, weekStartsOn);
    const bodyHeight = getCalendarBodyHeight(weekCount);

    const setMonth = (next: Date) => {
      const target = clampMonth(startOfMonth(next), minDate, maxDate);
      if (isSameDay(target, month)) return;

      if (!isMonthControlled) setInternalMonth(target);
      onMonthChange?.(target);
    };

    const previousSelectedRef = useRef(selected);

    useLayoutEffect(() => {
      if (isSameDay(previousSelectedRef.current, selected)) return;

      previousSelectedRef.current = selected;
      if (selected !== null) setMonth(selected);
    });

    const toggleView = (next: DatePickerView) => {
      setView(current => (current === next ? "date" : next));
    };

    const closeView = () => {
      setView("date");
      (view === "year" ? yearButtonRef : monthButtonRef).current?.focus();
    };

    const isUnavailable = (date: Date) => {
      return isDateUnavailable(date, { minDate, maxDate, isDateDisabled });
    };

    const selectDate = (date: Date) => {
      if (readOnly) return;

      if (withActionBar) {
        setDraft(date);

        return;
      }

      setSelected(date);
    };

    const gridDates = getGridDates(month, weekStartsOn, weekCount);
    const { gridRef, onGridKeyDown, getCellProps } = useCalendarKeyboard({
      month,
      gridDates,
      preferredDates: [displayed, today],
      weekStartsOn,
      minDate,
      maxDate,
      isUnavailable,
      onMonthChange: setMonth,
    });

    const goToday = () => {
      setMonth(today);
      if (!readOnly) setDraft(today);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.key === "Escape" && view !== "date") {
        event.stopPropagation();
        closeView();
      }
    };

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        onKeyDown={handleKeyDown}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <Header
          titles={
            <>
              <LabelButton
                ref={yearButtonRef}
                size='lg'
                suffixIcon='chevron-down'
                aria-expanded={view === "year"}
                disabled={disabled}
                onClick={() => toggleView("year")}
              >
                {formatYearLabel(year)}
              </LabelButton>
              <LabelButton
                ref={monthButtonRef}
                size='lg'
                suffixIcon='chevron-down'
                aria-expanded={view === "month"}
                disabled={disabled}
                onClick={() => toggleView("month")}
              >
                {formatMonthLabel(month)}
              </LabelButton>
            </>
          }
          navigation={
            <>
              <IconButton
                size='lg'
                condensed={false}
                icon='chevron-left'
                aria-label='이전 달'
                disabled={disabled || view !== "date" || isFirstMonth}
                onClick={() => setMonth(addMonths(month, -1))}
              />
              <IconButton
                size='lg'
                condensed={false}
                icon='chevron-right'
                aria-label='다음 달'
                disabled={disabled || view !== "date" || isLastMonth}
                onClick={() => setMonth(addMonths(month, 1))}
              />
            </>
          }
        />
        <Divider variant='dashed' decorative />
        {view === "date" && (
          <Calendar
            ref={gridRef}
            weekStartsOn={weekStartsOn}
            aria-label={formatYearMonthLabel(month)}
            aria-readonly={readOnly || undefined}
            onKeyDown={onGridKeyDown}
          >
            {gridDates.map(date => (
              <Cell
                key={date.toISOString()}
                date={date}
                status={getCellStatus(date, displayed, today)}
                outsideMonth={date.getMonth() !== month.getMonth()}
                disabled={disabled || isUnavailable(date)}
                {...getCellProps(date)}
                onClick={() => selectDate(date)}
              />
            ))}
          </Calendar>
        )}
        {view === "month" && (
          <div className={styles.optionListArea}>
            <OptionList
              aria-label='월 선택'
              height={bodyHeight}
              value={String(month.getMonth())}
              options={getMonthOptions(year, minDate, maxDate)}
              onSelect={next => {
                setMonth(new Date(year, Number(next), 1));
                closeView();
              }}
            />
          </div>
        )}
        {view === "year" && (
          <div className={styles.optionListArea}>
            <OptionList
              aria-label='연도 선택'
              height={bodyHeight}
              value={String(year)}
              options={getYearOptions(
                minDate?.getFullYear() ?? year - YEAR_RANGE_RADIUS,
                maxDate?.getFullYear() ?? year + YEAR_RANGE_RADIUS,
              )}
              onSelect={next => {
                setMonth(new Date(Number(next), month.getMonth(), 1));
                closeView();
              }}
            />
          </div>
        )}
        {withActionBar && (
          <ActionBar
            onToday={goToday}
            onClear={() => setDraft(null)}
            onApply={() => setSelected(draft)}
            todayDisabled={disabled || isUnavailable(today)}
            clearDisabled={disabled || readOnly}
            applyDisabled={disabled || readOnly || isSameDay(draft, selected)}
          />
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
