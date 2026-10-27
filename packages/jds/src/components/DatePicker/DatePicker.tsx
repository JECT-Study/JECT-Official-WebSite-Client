import { clsx } from "clsx";
import { forwardRef, type KeyboardEvent } from "react";
import { visuallyHidden } from "utils";

import { MAX_WEEKS_IN_GRID } from "./datePicker.constants";
import * as styles from "./datePicker.css";
import type { DatePickerProps } from "./datePicker.types";
import {
  addMonths,
  formatMonthLabel,
  formatYearLabel,
  formatYearMonthLabel,
  getCellStatus,
  getGridDates,
  getMonthOptions,
  getWeekCount,
  getYearOptions,
  isDateUnavailable,
  isSameDay,
  startOfDay,
} from "./datePicker.utils";
import { ActionBar } from "./parts/ActionBar";
import { Calendar, getCalendarBodyHeight } from "./parts/Calendar";
import { Cell } from "./parts/Cell";
import { Header } from "./parts/Header";
import { OptionList } from "./parts/OptionList";
import { useCalendarKeyboard } from "./useCalendarKeyboard";
import { useDatePickerView } from "./useDatePickerView";
import { useDateSelection } from "./useDateSelection";
import { useVisibleMonth } from "./useVisibleMonth";
import { IconButton } from "../Button/IconButton";
import { LabelButton } from "../Button/LabelButton";
import { Divider } from "../Divider";

/** `minDate`, `maxDate`를 넘기지 않으면 연도 목록을 표시 중인 연도의 앞뒤로 이만큼까지 보여 줍니다. */
const DEFAULT_YEAR_OFFSET = 10;

/**
 * @description 날짜 하나를 고르는 달력 패널
 *
 * @remarks
 * 표시 중인 달은 DatePicker가 관리합니다. 다른 달의 날짜를 선택하면 그 달로 이동합니다. `readOnly`이면 날짜를 눌러도 선택과 달 이동 모두 일어나지 않습니다.
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
    const { selected, displayed, select, clear, apply, hasPendingChange } = useDateSelection({
      value,
      defaultValue,
      onChange,
      withActionBar,
      readOnly,
    });

    const { month, setMonth, isFirstMonth, isLastMonth } = useVisibleMonth({
      month: monthProp,
      defaultMonth,
      onMonthChange,
      selected,
      today,
      minDate,
      maxDate,
    });
    const year = month.getFullYear();
    const weekCount = fixedWeeks ? MAX_WEEKS_IN_GRID : getWeekCount(month, weekStartsOn);
    const bodyHeight = getCalendarBodyHeight(weekCount);
    const monthOptions = getMonthOptions(year, minDate, maxDate);
    const yearOptions = getYearOptions(
      minDate?.getFullYear() ?? year - DEFAULT_YEAR_OFFSET,
      maxDate?.getFullYear() ?? year + DEFAULT_YEAR_OFFSET,
    );

    const { view, yearButtonRef, monthButtonRef, toggleView, closeView, onViewKeyDown } =
      useDatePickerView({ disabled });

    const isNavigationDisabled = disabled || view !== "date";
    const isEditDisabled = disabled || readOnly;

    const isUnavailable = (date: Date) => {
      return isDateUnavailable(date, { minDate, maxDate, isDateDisabled });
    };

    const gridDates = getGridDates(month, weekStartsOn, weekCount);
    const { gridRef, onGridKeyDown, getCellProps, focusDate } = useCalendarKeyboard({
      month,
      gridDates,
      displayed,
      today,
      weekStartsOn,
      minDate,
      maxDate,
      isUnavailable,
      onMonthChange: setMonth,
    });

    const goToPreviousMonth = () => {
      setMonth(addMonths(month, -1));
    };

    const goToNextMonth = () => {
      setMonth(addMonths(month, 1));
    };

    const selectMonth = (next: string) => {
      setMonth(new Date(year, Number(next), 1));
      closeView();
    };

    const selectYear = (next: string) => {
      setMonth(new Date(Number(next), month.getMonth(), 1));
      closeView();
    };

    const selectDate = (date: Date) => {
      if (readOnly) return;

      setMonth(date);
      select(date);
      focusDate(date);
    };

    const goToday = () => {
      setMonth(today);
      select(today);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      onViewKeyDown(event);
    };

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        onKeyDown={handleKeyDown}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
          {formatYearMonthLabel(month)}
        </div>
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
                disabled={isNavigationDisabled || isFirstMonth}
                onClick={goToPreviousMonth}
              />
              <IconButton
                size='lg'
                condensed={false}
                icon='chevron-right'
                aria-label='다음 달'
                disabled={isNavigationDisabled || isLastMonth}
                onClick={goToNextMonth}
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
                today={isSameDay(date, today)}
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
              options={monthOptions}
              onSelect={selectMonth}
            />
          </div>
        )}
        {view === "year" && (
          <div className={styles.optionListArea}>
            <OptionList
              aria-label='연도 선택'
              height={bodyHeight}
              value={String(year)}
              options={yearOptions}
              onSelect={selectYear}
            />
          </div>
        )}
        {withActionBar && (
          <ActionBar
            onToday={goToday}
            onClear={clear}
            onApply={apply}
            todayDisabled={disabled || isUnavailable(today)}
            clearDisabled={isEditDisabled}
            applyDisabled={isEditDisabled || !hasPendingChange}
          />
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
