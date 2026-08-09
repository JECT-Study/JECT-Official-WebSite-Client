import { useCallback, useId, useLayoutEffect, useMemo, useRef, type KeyboardEvent } from "react";

import { SELECTION_KEYS } from "./listbox.constants";
import type { SelectOption } from "./listbox.types";
import { getOptionId, scrollSelectedOptionIntoView } from "./listbox.utils";
import type { ListboxBehaviorContextValue } from "./ListboxContext";

import { useActiveDescendant } from "@/hooks/useActiveDescendant";

interface UseListboxParams {
  options: SelectOption[];
  selectedValues: string[];
  disabled: boolean;
  onSelect: (value: string) => void;
  autoScrollToSelected?: boolean;
}

export const useListbox = ({
  options,
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
    activeValue: rawActiveValue,
    setActiveValue,
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
    if (el == null || options.length === 0) return;

    shouldAutoScrollRef.current = false;

    scrollToSelected();
  }, [listboxRef, options.length, scrollToSelected, autoScrollToSelected]);

  const activeValue = useMemo(() => {
    if (rawActiveValue == null) return null;

    const option = options.find(o => o.value === rawActiveValue);
    return option != null && !option.disabled ? rawActiveValue : null;
  }, [options, rawActiveValue]);

  const activeId = activeValue != null ? getOptionId(listboxId, activeValue) : undefined;

  const activateSelected = useCallback(() => {
    const enabledOptions = options.filter(option => !option.disabled);
    if (enabledOptions.length === 0) return;

    const selected = enabledOptions.find(option => selectedValues.includes(option.value));
    setActiveValue(selected?.value ?? enabledOptions[0].value);
  }, [options, selectedValues, setActiveValue]);

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
