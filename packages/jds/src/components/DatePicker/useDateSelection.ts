import { useControllableState } from "hooks";
import { useState } from "react";

import { isSameDay } from "./datePicker.utils";

interface UseDateSelectionParams {
  value?: Date | null;
  defaultValue: Date | null;
  onChange?: (date: Date | null) => void;
  onApply?: (date: Date | null) => void;
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
  onApply,
  withActionBar,
  readOnly,
}: UseDateSelectionParams) => {
  const [selected, setSelected] = useControllableState<Date | null>(value, defaultValue, onChange);
  const [draft, setDraft] = useState<Date | null>(selected);
  const [syncedSelected, setSyncedSelected] = useState<Date | null>(selected);
  const [hasClearRequest, setHasClearRequest] = useState(false);

  if (!isSameDay(syncedSelected, selected)) {
    setSyncedSelected(selected);
    setDraft(selected);
    setHasClearRequest(false);
  }

  const select = (date: Date) => {
    if (readOnly) return;

    if (withActionBar) {
      setDraft(date);
      setHasClearRequest(false);

      return;
    }

    setSelected(date);
  };

  const clear = () => {
    if (readOnly) return;
    setDraft(null);
    setHasClearRequest(true);
  };

  const apply = () => {
    if (readOnly) return;
    setHasClearRequest(false);
    setSelected(draft);
    onApply?.(draft);
  };

  return {
    selected,
    displayed: withActionBar ? draft : selected,
    select,
    clear,
    apply,
    // onApply를 사용하는 연결에서는 빈 선택값과 별개로 외부 입력의 지우기를 확정할 수 있다.
    hasPendingChange: !isSameDay(draft, selected) || (onApply !== undefined && hasClearRequest),
  };
};
