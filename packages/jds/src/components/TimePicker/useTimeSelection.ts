import { useControllableState } from "hooks";
import { useState } from "react";

import type { TimeValue } from "./timePicker.types";
import { isSameTime } from "./timePicker.utils";

interface UseTimeSelectionParams {
  value?: TimeValue | null;
  defaultValue: TimeValue | null;
  onChange?: (value: TimeValue) => void;
  withActionBar: boolean;
  readOnly: boolean;
}

/**
 * @description 선택된 시각을 제어, 비제어 방식으로 관리하고 액션 바의 임시 선택을 함께 다룹니다.
 *
 * @remarks
 * `withActionBar`이면 `select`는 임시 선택만 바꾸고 `apply`를 호출해야 확정됩니다. `readOnly`이면 `select`는 아무것도 바꾸지 않습니다.
 * @returns 화면에 선택으로 보일 `displayed`, 선택을 바꾸는 `select`, `apply`와 확정 전 변경이 있는지 나타내는 `hasPendingChange`
 */
export const useTimeSelection = ({
  value,
  defaultValue,
  onChange,
  withActionBar,
  readOnly,
}: UseTimeSelectionParams) => {
  const notifyChange = (next: TimeValue | null) => {
    if (next == null) return;
    onChange?.(next);
  };

  const [selected, setSelected] = useControllableState<TimeValue | null>(
    value,
    defaultValue,
    notifyChange,
  );
  const [draft, setDraft] = useState<TimeValue | null>(selected);
  const [syncedSelected, setSyncedSelected] = useState<TimeValue | null>(selected);

  if (!isSameTime(syncedSelected, selected)) {
    setSyncedSelected(selected);
    setDraft(selected);
  }

  const select = (time: TimeValue) => {
    if (readOnly) return;

    if (withActionBar) {
      setDraft(time);
      return;
    }

    setSelected(time);
  };

  const apply = () => {
    setSelected(draft);
  };

  return {
    displayed: withActionBar ? draft : selected,
    select,
    apply,
    hasPendingChange: !isSameTime(draft, selected),
  };
};
