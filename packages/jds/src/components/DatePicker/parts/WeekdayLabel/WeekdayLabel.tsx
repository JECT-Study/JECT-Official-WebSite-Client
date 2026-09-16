import { clsx } from "clsx";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import * as styles from "./weekdayLabel.css";
import type { WeekdayLabelProps } from "./weekdayLabel.types";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const WeekdayLabel = forwardRef<HTMLDivElement, WeekdayLabelProps>(
  ({ weekday, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      <span className={clsx(styles.label, getLabelClassName({ size: "sm", weight: "normal" }))}>
        {WEEKDAY_LABELS[weekday]}
      </span>
    </div>
  ),
);

WeekdayLabel.displayName = "DatePicker.WeekdayLabel";
