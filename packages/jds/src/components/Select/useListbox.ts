import { useControllableState } from "hooks";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import type { SelectionMode } from "./select.types";
import { getOptionId } from "./select.utils";

interface UseListboxParams {
  mode: SelectionMode;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled: boolean;
}

export const useListbox = ({ mode, value, defaultValue, onChange, disabled }: UseListboxParams) => {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const listboxRef = useRef<HTMLDivElement | null>(null);

  const listboxId = useId();

  useEffect(() => {
    const el = listboxRef.current;
    if (el == null) return;

    const selected = el.querySelector<HTMLElement>('[aria-selected="true"]');
    if (selected == null) return;

    const listRect = el.getBoundingClientRect();
    const optionRect = selected.getBoundingClientRect();

    if (optionRect.top < listRect.top) {
      el.scrollTop += optionRect.top - listRect.top;
    } else if (optionRect.bottom > listRect.bottom) {
      el.scrollTop += optionRect.bottom - listRect.bottom;
    }
  }, []);

  const [selection, setSelection] = useControllableState<string | string[] | undefined>(
    value,
    defaultValue ?? (mode === "multiple" ? [] : undefined),
    onChange as ((value: string | string[] | undefined) => void) | undefined,
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

  const activeId = activeValue != null ? getOptionId(listboxId, activeValue) : undefined;

  const getEnabledOptionNodes = useCallback((): HTMLElement[] => {
    const el = listboxRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>('[role="option"]')).filter(
      node => node.getAttribute("aria-disabled") !== "true",
    );
  }, []);

  const moveActive = useCallback(
    (dir: "next" | "prev" | "first" | "last") => {
      const nodes = getEnabledOptionNodes();
      if (nodes.length === 0) return;

      const values = nodes.map(node => node.getAttribute("data-value") ?? "");
      const current = activeValue != null ? values.indexOf(activeValue) : -1;

      let idx: number;
      if (dir === "first") idx = 0;
      else if (dir === "last") idx = nodes.length - 1;
      else if (dir === "next") idx = current < 0 ? 0 : (current + 1) % nodes.length;
      else idx = current <= 0 ? nodes.length - 1 : current - 1;

      setActiveValue(values[idx]);
      nodes[idx].scrollIntoView({ block: "nearest" });
    },
    [activeValue, getEnabledOptionNodes],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          moveActive("next");
          break;
        case "ArrowUp":
          e.preventDefault();
          moveActive("prev");
          break;
        case "Home":
          e.preventDefault();
          moveActive("first");
          break;
        case "End":
          e.preventDefault();
          moveActive("last");
          break;
        case "Enter":
        case " ":
          if (activeValue != null) {
            e.preventDefault();
            select(activeValue);
          }
          break;
      }
    },
    [activeValue, disabled, moveActive, select],
  );

  const onFocus = useCallback(() => {
    if (activeValue != null) return;
    const nodes = getEnabledOptionNodes();
    if (nodes.length === 0) return;
    const values = nodes.map(node => node.getAttribute("data-value") ?? "");
    setActiveValue(values.find(v => selectedValues.includes(v)) ?? values[0]);
  }, [activeValue, getEnabledOptionNodes, selectedValues]);

  const getListboxProps = useCallback(
    () => ({
      id: listboxId,
      role: "listbox" as const,
      "aria-multiselectable": mode === "multiple" ? true : undefined,
      "aria-orientation": "vertical" as const,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : 0,
      "aria-activedescendant": activeId,
      onKeyDown,
      onFocus,
    }),
    [listboxId, mode, disabled, activeId, onKeyDown, onFocus],
  );

  return {
    listboxRef,
    listboxId,
    isSelected,
    select,
    activeValue,
    setActive: setActiveValue,
    getListboxProps,
  };
};
