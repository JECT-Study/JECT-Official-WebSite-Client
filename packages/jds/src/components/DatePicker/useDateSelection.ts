import { useControllableState } from "hooks";
import { useState } from "react";

import { isSameDay } from "./datePicker.utils";

interface UseDateSelectionParams {
  value?: Date | null;
  defaultValue: Date | null;
  onChange?: (date: Date | null) => void;
  withActionBar: boolean;
  readOnly: boolean;
}

/**
 * @description 선택된 날짜를 제어, 비제어 방식으로 관리하고 액션 바의 임시 선택을 함께 다룹니다.
 *
 * @remarks
 * `withActionBar`이면 `select`는 임시 선택만 바꾸고 `apply`를 호출해야 확정됩니다. `readOnly`이면 `select`는 아무것도 바꾸지 않습니다.
 * @returns 확정된 `selected`, 화면에 선택으로 보일 `displayed`, 선택을 바꾸는 `select`, `clear`, `apply`와 확정 전 변경이 있는지 나타내는 `hasPendingChange`
 */
export const useDateSelection = ({
  value,
  defaultValue,
  onChange,
  withActionBar,
  readOnly,
}: UseDateSelectionParams) => {
  const [selected, setSelected] = useControllableState<Date | null>(value, defaultValue, onChange);
  const [draft, setDraft] = useState<Date | null>(selected);
  const [syncedSelected, setSyncedSelected] = useState<Date | null>(selected);

  if (!isSameDay(syncedSelected, selected)) {
    setSyncedSelected(selected);
    setDraft(selected);
  }

  const select = (date: Date) => {
    if (readOnly) return;

    if (withActionBar) {
      setDraft(date);

      return;
    }

    setSelected(date);
  };

  const clear = () => {
    setDraft(null);
  };

  const apply = () => {
    setSelected(draft);
  };

  return {
    selected,
    displayed: withActionBar ? draft : selected,
    select,
    clear,
    apply,
    hasPendingChange: !isSameDay(draft, selected),
  };
};
