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

export const Cell = forwardRef<HTMLButtonElement, CellProps>(
  (
    { date, status = "normal", outsideMonth = false, disabled = false, className, ...restProps },
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
        aria-current={status === "current" ? "date" : undefined}
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
