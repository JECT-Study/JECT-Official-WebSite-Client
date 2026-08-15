import { useCallback, useId, useLayoutEffect, useMemo, useRef, type KeyboardEvent } from "react";

import { SELECTION_KEYS } from "./listbox.constants";
import { getOptionId, hasSelectedOption, scrollSelectedOptionIntoView } from "./listbox.utils";
import type { ListboxBehaviorContextValue } from "./ListboxContext";

import { useActiveDescendant } from "@/hooks/useActiveDescendant";

interface UseListboxParams {
  selectedValues: string[];
  disabled: boolean;
  onSelect: (value: string) => void;
  autoScrollToSelected?: boolean;
}

export const useListbox = ({
  selectedValues,
  disabled,
  onSelect,
  autoScrollToSelected = true,
}: UseListboxParams) => {
  const shouldAutoScrollRef = useRef(true);

  const listboxId = useId();

  const isSelected = useCallback((v: string) => selectedValues.includes(v), [selectedValues]);

  const {
    containerRef: listboxRef,
    activeValue,
    setActiveValue,
    getEnabledValues,
    onKeyDown: onActiveDescendantKeyDown,
  } = useActiveDescendant<HTMLDivElement>({ disabled });

  const scrollToSelected = useCallback(() => {
    const el = listboxRef.current;
    if (el == null) return;

    scrollSelectedOptionIntoView(el);
  }, [listboxRef]);

  // 선택 항목은 DOM 조회로 확인하므로 별도의 의존성으로 추적할 수 없다.
  // 의존성 배열을 추가하면 항목이 늦게 렌더되는 시점과 동기화되지 않는다.
  useLayoutEffect(() => {
    if (!autoScrollToSelected || !shouldAutoScrollRef.current) return;

    const el = listboxRef.current;
    if (el == null || !hasSelectedOption(el)) return;

    shouldAutoScrollRef.current = false;

    scrollToSelected();
  });

  const activeId = activeValue != null ? getOptionId(listboxId, activeValue) : undefined;

  const activateSelected = useCallback(() => {
    const values = getEnabledValues();
    if (values.length === 0) return;

    setActiveValue(values.find(value => selectedValues.includes(value)) ?? values[0]);
  }, [getEnabledValues, selectedValues, setActiveValue]);

  const activateFirst = useCallback(() => {
    const values = getEnabledValues();
    if (values.length === 0) return;

    setActiveValue(values[0]);
  }, [getEnabledValues, setActiveValue]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      onActiveDescendantKeyDown(e);

      if (!SELECTION_KEYS.includes(e.key)) return;

      e.preventDefault();

      if (activeValue != null) onSelect(activeValue);
    },
    [activeValue, disabled, onActiveDescendantKeyDown, onSelect],
  );

  const onFocus = useCallback(() => {
    if (activeValue != null) return;

    activateSelected();
  }, [activateSelected, activeValue]);

  const getListboxProps = useCallback(
    () => ({
      id: listboxId,
      role: "listbox" as const,
      "aria-orientation": "vertical" as const,
      "aria-disabled": disabled || undefined,
    }),
    [listboxId, disabled],
  );

  const getFocusableListboxProps = useCallback(
    () => ({
      ...getListboxProps(),
      tabIndex: disabled ? -1 : 0,
      "aria-activedescendant": activeId,
      onKeyDown,
      onFocus,
    }),
    [getListboxProps, disabled, activeId, onKeyDown, onFocus],
  );

  const contextValue = useMemo<ListboxBehaviorContextValue>(
    () => ({
      listboxId,
      disabled,
      isSelected,
      activeValue,
      select: onSelect,
      setActive: setActiveValue,
    }),
    [listboxId, disabled, isSelected, activeValue, onSelect, setActiveValue],
  );

  return {
    listboxRef,
    listboxId,
    contextValue,
    activeId,
    activateSelected,
    activateFirst,
    scrollToSelected,
    onKeyDown,
    getListboxProps,
    getFocusableListboxProps,
  };
};
