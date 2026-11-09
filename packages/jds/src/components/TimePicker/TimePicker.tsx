import { clsx } from "clsx";
import { Fragment, forwardRef, useRef, type KeyboardEvent } from "react";

import { ActionBar } from "./parts/ActionBar";
import { Column } from "./parts/Column";
import {
  COLUMN_ARIA_LABELS,
  DEFAULT_TIME_PICKER_LABEL,
  MIDNIGHT,
  type TimeColumnKind,
} from "./timePicker.constants";
import * as styles from "./timePicker.css";
import type { TimePickerProps } from "./timePicker.types";
import {
  getColumnKinds,
  getColumnOptions,
  getColumnValue,
  isSameTime,
  resolveColumnSelection,
  type TimeColumnContext,
} from "./timePicker.utils";
import { useTimeSelection } from "./useTimeSelection";
import { mergeRefs } from "../../hooks/mergeRefs";
import { Divider } from "../Divider";

const COLUMN_SELECTOR = '[role="listbox"]';

const COLUMN_OFFSET_BY_KEY: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
};

/**
 * @description 열마다 오전/오후, 시, 분, 초를 골라 시각 하나를 정하는 패널
 *
 * @remarks
 * 트리거와 팝오버는 포함하지 않습니다. 열마다 Tab 정지점이 있고, 열 안에서는 방향키로 이동하며 좌우 방향키로 옆 열에 포커스합니다.
 * @public
 * @name TimePicker
 * @tag div
 * @role group
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      format = "hh:mm",
      value,
      defaultValue = null,
      onChange,
      minuteStep = 5,
      secondStep = 5,
      minTime,
      maxTime,
      withActionBar = false,
      disabled = false,
      readOnly = false,
      className,
      onKeyDown,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      ...restProps
    },
    forwardedRef,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const { displayed, select, apply, hasPendingChange } = useTimeSelection({
      value,
      defaultValue,
      onChange,
      withActionBar,
      readOnly,
    });

    const context: TimeColumnContext = {
      base: displayed ?? minTime ?? MIDNIGHT,
      format,
      minuteStep,
      secondStep,
      minTime,
      maxTime,
    };

    const selectColumnValue = (kind: TimeColumnKind, next: number) => {
      const resolved = resolveColumnSelection(kind, next, context);
      if (resolved == null || isSameTime(resolved, displayed)) return;

      select(resolved);
    };

    const focusAdjacentColumn = (event: KeyboardEvent<HTMLDivElement>) => {
      const offset = COLUMN_OFFSET_BY_KEY[event.key];
      if (offset == null || !(event.target instanceof HTMLElement)) return;

      const columns = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(COLUMN_SELECTOR) ?? [],
      );
      const currentIndex = columns.indexOf(event.target);
      if (currentIndex < 0) return;

      event.preventDefault();
      columns[currentIndex + offset]?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      focusAdjacentColumn(event);
    };

    return (
      <div
        ref={mergeRefs(rootRef, forwardedRef)}
        {...restProps}
        role='group'
        aria-label={ariaLabel ?? (ariaLabelledby == null ? DEFAULT_TIME_PICKER_LABEL : undefined)}
        aria-labelledby={ariaLabelledby}
        aria-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <div className={styles.columns}>
          {getColumnKinds(format).map((kind, index) => (
            <Fragment key={kind}>
              {index > 0 && <Divider orientation='vertical' variant='dashed' decorative />}
              <Column
                aria-label={COLUMN_ARIA_LABELS[kind]}
                options={getColumnOptions(kind, context)}
                value={displayed == null ? null : getColumnValue(displayed, kind, format)}
                onSelect={next => selectColumnValue(kind, next)}
                disabled={disabled}
                readOnly={readOnly}
              />
            </Fragment>
          ))}
        </div>
        {withActionBar && (
          <ActionBar onApply={apply} applyDisabled={disabled || readOnly || !hasPendingChange} />
        )}
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";
