import { clsx } from "clsx";
import { useControllableState } from "hooks";
import { forwardRef, useRef, useState, type KeyboardEvent } from "react";

import * as styles from "./datePicker.css";
import { YEAR_RANGE_RADIUS, type DatePickerProps, type DatePickerView } from "./datePicker.types";
import {
  addMonths,
  getGridDates,
  getMonthOptions,
  getWeekCount,
  getYearOptions,
  isSameDay,
  startOfMonth,
} from "./datePicker.utils";
import { ActionBar } from "./parts/ActionBar";
import { Calendar, getCalendarBodyHeight } from "./parts/Calendar";
import { Cell } from "./parts/Cell";
import { Header } from "./parts/Header";
import { OptionList } from "./parts/OptionList";
import { IconButton } from "../Button/IconButton";
import { LabelButton } from "../Button/LabelButton";
import { Divider } from "../Divider";

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue = null,
      onChange,
      defaultMonth,
      weekStartsOn = 1,
      withActionBar = false,
      minYear,
      maxYear,
      className,
      onKeyDown,
      ...restProps
    },
    forwardedRef,
  ) => {
    const [selected, setSelected] = useControllableState<Date | null>(
      value,
      defaultValue,
      onChange,
    );
    const [month, setMonth] = useState(() => startOfMonth(defaultMonth ?? selected ?? new Date()));
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
    const year = month.getFullYear();
    const bodyHeight = getCalendarBodyHeight(getWeekCount(month, weekStartsOn));

    const toggleView = (next: DatePickerView) =>
      setView(current => (current === next ? "date" : next));

    const closeView = () => {
      setView("date");
      (view === "year" ? yearButtonRef : monthButtonRef).current?.focus();
    };

    const selectDate = (date: Date) => {
      if (withActionBar) {
        setDraft(date);

        return;
      }

      setSelected(date);
    };

    const goToday = () => {
      const today = new Date();

      setMonth(startOfMonth(today));
      setDraft(today);
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
                onClick={() => toggleView("year")}
              >
                {`${year}년`}
              </LabelButton>
              <LabelButton
                ref={monthButtonRef}
                size='lg'
                suffixIcon='chevron-down'
                aria-expanded={view === "month"}
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
                disabled={view !== "date"}
                onClick={() => setMonth(addMonths(month, -1))}
              />
              <IconButton
                size='lg'
                condensed={false}
                icon='chevron-right'
                aria-label='다음 달'
                disabled={view !== "date"}
                onClick={() => setMonth(addMonths(month, 1))}
              />
            </>
          }
        />
        <Divider variant='dashed' decorative />
        {view === "date" && (
          <Calendar weekStartsOn={weekStartsOn}>
            {getGridDates(month, weekStartsOn).map(date => (
              <Cell
                key={date.toISOString()}
                date={date}
                status={
                  isSameDay(date, displayed)
                    ? "selected"
                    : isSameDay(date, new Date())
                      ? "current"
                      : "normal"
                }
                outsideMonth={date.getMonth() !== month.getMonth()}
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
              options={getMonthOptions(year)}
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
                minYear ?? year - YEAR_RANGE_RADIUS,
                maxYear ?? year + YEAR_RANGE_RADIUS,
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
            applyDisabled={isSameDay(draft, selected)}
          />
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
