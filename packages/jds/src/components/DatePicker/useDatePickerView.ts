import { useRef, useState, type KeyboardEvent } from "react";

import type { DatePickerView } from "./datePicker.types";

interface UseDatePickerViewParams {
  disabled: boolean;
}

/**
 * @description 날짜, 월, 연도 보기 전환과 목록을 닫을 때의 포커스 복원을 관리합니다.
 *
 * @remarks
 * 목록을 닫으면 그 목록을 연 헤더 버튼으로 포커스를 돌려줍니다. `disabled`가 되면 날짜 보기로 돌아갑니다.
 * @returns 현재 `view`, 헤더 버튼에 연결할 `yearButtonRef`, `monthButtonRef`, 보기를 여닫는 `toggleView`, `closeView`와 Escape로 목록을 닫는 `onViewKeyDown`
 */
export const useDatePickerView = ({ disabled }: UseDatePickerViewParams) => {
  const [view, setView] = useState<DatePickerView>("date");
  const yearButtonRef = useRef<HTMLButtonElement>(null);
  const monthButtonRef = useRef<HTMLButtonElement>(null);

  if (disabled && view !== "date") {
    setView("date");
  }

  const toggleView = (next: DatePickerView) => {
    setView(current => (current === next ? "date" : next));
  };

  const closeView = () => {
    const triggerRef = view === "year" ? yearButtonRef : monthButtonRef;

    setView("date");
    triggerRef.current?.focus();
  };

  const onViewKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || view === "date") return;

    event.stopPropagation();
    event.preventDefault();
    closeView();
  };

  return { view, yearButtonRef, monthButtonRef, toggleView, closeView, onViewKeyDown };
};
