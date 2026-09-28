import { clsx } from "clsx";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import * as styles from "./cell.css";
import type { CellProps } from "./cell.types";

const dateLabelFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * @description DatePicker 격자의 날짜 한 칸
 *
 * @remarks
 * 오늘이면서 선택된 날짜는 `status="selected"`와 `today`를 함께 넘깁니다. 모습은 선택 상태를 따르고 `aria-current`는 유지됩니다.
 * @internal
 * @name Cell
 * @tag button
 * @role gridcell
 */
export const Cell = forwardRef<HTMLButtonElement, CellProps>(
  (
    {
      date,
      status = "normal",
      outsideMonth = false,
      today = false,
      disabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const isInactive = disabled || outsideMonth;

    return (
      <button
        ref={forwardedRef}
        type='button'
        aria-label={dateLabelFormatter.format(date)}
        {...restProps}
        role='gridcell'
        disabled={isInactive}
        aria-selected={status === "selected" || undefined}
        aria-current={today ? "date" : undefined}
        data-disabled={isInactive || undefined}
        data-part='root'
        className={clsx(styles.root({ status, outsideMonth, disabled }), className)}
      >
        <span className={clsx(styles.label, getLabelClassName({ size: "md", weight: "normal" }))}>
          {date.getDate()}
        </span>
      </button>
    );
  },
);

Cell.displayName = "DatePicker.Cell";
