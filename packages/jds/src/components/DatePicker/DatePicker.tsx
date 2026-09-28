import { clsx } from "clsx";
import { useControllableState } from "hooks";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import * as styles from "./datePicker.css";
import { YEAR_RANGE_RADIUS, type DatePickerProps, type DatePickerView } from "./datePicker.types";
import {
  addMonths,
  clampDate,
  clampMonth,
  findAvailableDate,
  getGridDates,
  getKeyboardTarget,
  getSearchDirection,
  getMonthOptions,
  getWeekCount,
  getYearOptions,
  isDateOutOfRange,
  isMonthOutOfRange,
  isSameDay,
  MAX_WEEKS_IN_GRID,
  startOfDay,
  startOfMonth,
  toDateKey,
} from "./datePicker.utils";
import { ActionBar } from "./parts/ActionBar";
import { Calendar, getCalendarBodyHeight } from "./parts/Calendar";
import { Cell } from "./parts/Cell";
import { Header } from "./parts/Header";
import { OptionList } from "./parts/OptionList";
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
      return isDateOutOfRange(date, minDate, maxDate) || isDateDisabled?.(date) === true;
    };

    const selectDate = (date: Date) => {
      if (readOnly) return;

      if (withActionBar) {
        setDraft(date);

        return;
      }

      setSelected(date);
    };

    const isInMonth = (date: Date) => {
      return isSameDay(startOfMonth(date), month);
    };

    const gridDates = getGridDates(month, weekStartsOn, weekCount);
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const shouldMoveFocusRef = useRef(false);

    const tabbableDate =
      [focusedDate, displayed, today].find(
        (date): date is Date => date !== null && isInMonth(date) && !isUnavailable(date),
      ) ??
      gridDates.find(date => isInMonth(date) && !isUnavailable(date)) ??
      null;

    useEffect(() => {
      if (!shouldMoveFocusRef.current || focusedDate === null) return;

      shouldMoveFocusRef.current = false;
      gridRef.current
        ?.querySelector<HTMLElement>(`[data-date="${toDateKey(focusedDate)}"]`)
        ?.focus();
    });

    const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
      if (!isInMonth(next)) setMonth(next);
    };

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
                {`${year}년`}
              </LabelButton>
              <LabelButton
                ref={monthButtonRef}
                size='lg'
                suffixIcon='chevron-down'
                aria-expanded={view === "month"}
                disabled={disabled}
                onClick={() => toggleView("month")}
              >
                {`${month.getMonth() + 1}월`}
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
            aria-label={`${year}년 ${month.getMonth() + 1}월`}
            aria-readonly={readOnly || undefined}
            onKeyDown={handleGridKeyDown}
          >
            {gridDates.map(date => (
              <Cell
                key={date.toISOString()}
                date={date}
                status={
                  isSameDay(date, displayed)
                    ? "selected"
                    : isSameDay(date, today)
                      ? "current"
                      : "normal"
                }
                outsideMonth={date.getMonth() !== month.getMonth()}
                disabled={disabled || isUnavailable(date)}
                tabIndex={isSameDay(date, tabbableDate) ? 0 : -1}
                data-date={toDateKey(date)}
                onFocus={() => setFocusedDate(date)}
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
              options={getMonthOptions(year).map(option => ({
                ...option,
                disabled: isMonthOutOfRange(
                  new Date(year, Number(option.value), 1),
                  minDate,
                  maxDate,
                ),
              }))}
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
