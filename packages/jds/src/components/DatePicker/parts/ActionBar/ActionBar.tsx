import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./actionBar.css";
import type { ActionBarProps } from "./actionBar.types";
import { LabelButton } from "../../../Button/LabelButton";

/**
 * @description DatePicker 하단에서 오늘, 지우기, 적용 버튼을 배치하는 파츠
 *
 * @remarks
 * 버튼을 비활성화할지는 판단하지 않습니다. 호출부가 `todayDisabled`, `clearDisabled`, `applyDisabled`로 넘깁니다.
 * @internal
 * @name ActionBar
 * @tag div
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      onToday,
      onClear,
      onApply,
      applyDisabled = false,
      todayDisabled = false,
      clearDisabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      <div className={styles.start}>
        <LabelButton hierarchy='tertiary' onClick={onToday} disabled={todayDisabled}>
          오늘
        </LabelButton>
        <LabelButton hierarchy='tertiary' onClick={onClear} disabled={clearDisabled}>
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
