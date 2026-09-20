import { clsx } from "clsx";
import { useControllableState } from "hooks";
import { forwardRef, useState } from "react";

import * as styles from "./datePicker.css";
import type { DatePickerProps } from "./datePicker.types";
import { addMonths, getGridDates, isSameDay, startOfMonth } from "./datePicker.utils";
import { ActionBar } from "./parts/ActionBar";
import { Calendar } from "./parts/Calendar";
import { Cell } from "./parts/Cell";
import { Header } from "./parts/Header";
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
      onYearClick,
      onMonthClick,
      className,
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

    const [draft, setDraft] = useState<Date | null>(selected);
    const [syncedSelected, setSyncedSelected] = useState<Date | null>(selected);

    if (!isSameDay(syncedSelected, selected)) {
      setSyncedSelected(selected);
      setDraft(selected);
    }

    const displayed = withActionBar ? draft : selected;

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

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <Header.Root>
          <Header.Titles>
            <LabelButton size='lg' suffixIcon='chevron-down' onClick={onYearClick}>
              {`${month.getFullYear()}년`}
            </LabelButton>
            <LabelButton size='lg' suffixIcon='chevron-down' onClick={onMonthClick}>
              {`${month.getMonth() + 1}월`}
            </LabelButton>
          </Header.Titles>
          <Header.Navigation>
            <IconButton
              size='lg'
              condensed={false}
              icon='chevron-left'
              aria-label='이전 달'
              onClick={() => setMonth(addMonths(month, -1))}
            />
            <IconButton
              size='lg'
              condensed={false}
              icon='chevron-right'
              aria-label='다음 달'
              onClick={() => setMonth(addMonths(month, 1))}
            />
          </Header.Navigation>
        </Header.Root>
        <Divider variant='dashed' decorative />
        <Calendar.Root>
          <Calendar.Weekdays weekStartsOn={weekStartsOn} />
          <Calendar.Grid>
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
          </Calendar.Grid>
        </Calendar.Root>
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
