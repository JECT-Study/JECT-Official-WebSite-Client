import { useCallback, useId, useLayoutEffect, useMemo, useRef, type KeyboardEvent } from "react";

import { SELECTION_KEYS } from "./listbox.constants";
import { getOptionId, scrollSelectedOptionIntoView } from "./listbox.utils";
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

  useLayoutEffect(() => {
    if (!autoScrollToSelected || !shouldAutoScrollRef.current) return;

    const el = listboxRef.current;
    if (el == null || el.childElementCount === 0) return;

    shouldAutoScrollRef.current = false;

    scrollToSelected();
  }, [listboxRef, scrollToSelected, autoScrollToSelected]);

  const activeId = activeValue != null ? getOptionId(listboxId, activeValue) : undefined;

  const activateSelected = useCallback(() => {
    const values = getEnabledValues();
    if (values.length === 0) return;

    setActiveValue(values.find(value => selectedValues.includes(value)) ?? values[0]);
  }, [getEnabledValues, selectedValues, setActiveValue]);

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
    scrollToSelected,
    onKeyDown,
    getListboxProps,
    getFocusableListboxProps,
  };
};
