import { useControllableState } from "hooks";
import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";

import type { SelectionMode } from "./select.types";

interface UseListboxParams {
  mode: SelectionMode;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled: boolean;
}

export function useListbox({ mode, value, defaultValue, onChange, disabled }: UseListboxParams) {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const optionIds = useRef(new Map<string, string>());
  const listboxRef = useRef<HTMLDivElement | null>(null);

  const listboxId = useId();

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

  const registerOption = useCallback((v: string, id: string) => {
    optionIds.current.set(v, id);
    return () => {
      optionIds.current.delete(v);
    };
  }, []);

  const activeId = activeValue != null ? optionIds.current.get(activeValue) : undefined;

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
    [activeValue, moveActive, select],
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
    registerOption,
    getListboxProps,
  };
}
