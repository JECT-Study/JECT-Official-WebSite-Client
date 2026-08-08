import { useControllableState } from "hooks";
import { useCallback, useId, useLayoutEffect, useMemo, useRef, type KeyboardEvent } from "react";

import { SELECTION_KEYS } from "./listbox.constants";
import type { OptionVariant, SelectionMode, SelectOption } from "./listbox.types";
import { getOptionId, scrollSelectedOptionIntoView } from "./listbox.utils";
import type { ListboxContextValue } from "./ListboxContext";

import { useActiveDescendant } from "@/hooks/useActiveDescendant";

interface UseListboxParams {
  mode: SelectionMode;
  variant: OptionVariant;
  options: SelectOption[];
  value?: string | string[] | null;
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled: boolean;
  autoScrollToSelected?: boolean;
}

export const useListbox = ({
  mode,
  variant,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  autoScrollToSelected = true,
}: UseListboxParams) => {
  const shouldAutoScrollRef = useRef(true);

  const listboxId = useId();

  const [selection, setSelection] = useControllableState<string | string[] | null | undefined>(
    value,
    defaultValue ?? (mode === "multiple" ? [] : undefined),
    onChange as ((value: string | string[] | null | undefined) => void) | undefined,
  );

  const selectedValues = useMemo<string[]>(() => {
    if (selection == null) return [];
    return Array.isArray(selection) ? selection : [selection];
  }, [selection]);

  const isSelected = useCallback((v: string) => selectedValues.includes(v), [selectedValues]);

  const select = useCallback(
    (v: string) => {
      if (mode === "multiple") {
        setSelection(prev => {
          const arr = Array.isArray(prev) ? prev : [];
          return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
        });
      } else {
        setSelection(v);
      }
    },
    [mode, setSelection],
  );

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

      if (activeValue != null) select(activeValue);
    },
    [activeValue, disabled, onActiveDescendantKeyDown, select],
  );

  const onFocus = useCallback(() => {
    if (activeValue != null) return;

    activateSelected();
  }, [activateSelected, activeValue]);

  const getListboxProps = useCallback(
    () => ({
      id: listboxId,
      role: "listbox" as const,
      "aria-multiselectable": mode === "multiple" ? true : undefined,
      "aria-orientation": "vertical" as const,
      "aria-disabled": disabled || undefined,
    }),
    [listboxId, mode, disabled],
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

  const contextValue = useMemo<ListboxContextValue>(
    () => ({
      listboxId,
      disabled,
      variant,
      mode,
      isSelected,
      activeValue,
      select,
      setActive: setActiveValue,
    }),
    [listboxId, disabled, variant, mode, isSelected, activeValue, select, setActiveValue],
  );

  return {
    listboxRef,
    listboxId,
    contextValue,
    selectedValues,
    activeId,
    activateSelected,
    scrollToSelected,
    onKeyDown,
    getListboxProps,
    getFocusableListboxProps,
  };
};
