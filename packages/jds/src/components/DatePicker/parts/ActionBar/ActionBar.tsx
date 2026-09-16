import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./actionBar.css";
import type { ActionBarProps } from "./actionBar.types";
import { LabelButton } from "../../../Button/LabelButton";

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  ({ onToday, onClear, onApply, applyDisabled = false, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      <div className={styles.start}>
        <LabelButton hierarchy='tertiary' onClick={onToday}>
          오늘
        </LabelButton>
        <LabelButton hierarchy='tertiary' onClick={onClear}>
          지우기
        </LabelButton>
      </div>
      <div className={styles.end}>
        <LabelButton hierarchy='accent' onClick={onApply} disabled={applyDisabled}>
          적용
        </LabelButton>
      </div>
    </div>
  ),
);

ActionBar.displayName = "DatePicker.ActionBar";
