import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./actionBar.css";
import type { ActionBarProps } from "./actionBar.types";
import { LabelButton } from "../../../Button/LabelButton";

/**
 * @description TimePicker 하단에서 적용 버튼을 배치하는 파츠
 *
 * @remarks
 * 버튼을 비활성화할지는 판단하지 않습니다. 호출부가 `applyDisabled`로 넘깁니다.
 * @internal
 * @name ActionBar
 * @tag div
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  ({ onApply, applyDisabled = false, className, ...restProps }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        {...restProps}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        <LabelButton hierarchy='accent' onClick={onApply} disabled={applyDisabled}>
          적용
        </LabelButton>
      </div>
    );
  },
);

ActionBar.displayName = "TimePicker.ActionBar";
