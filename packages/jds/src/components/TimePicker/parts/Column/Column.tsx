import { clsx } from "clsx";
import {
  forwardRef,
  useMemo,
  useRef,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import * as styles from "./column.css";
import type { ColumnProps } from "./column.types";
import { mergeRefs } from "../../../../hooks/mergeRefs";
import { useListbox } from "../../../Listbox";
import { getOptionId } from "../../../Listbox/listbox.utils";
import { useColumnScroll } from "../../useColumnScroll";
import { Item } from "../Item";

const EDGE_KEYS: Record<string, "first" | "last"> = {
  PageUp: "first",
  PageDown: "last",
};

/**
 * @description TimePicker에서 한 단위(오전/오후, 시, 분, 초)를 고르는 세로 목록
 *
 * @remarks
 * 포커스는 열에 두고 방향키, Home, End, PageUp, PageDown으로 활성 항목을 옮긴 뒤 Enter, Space로 고릅니다.
 * 선택 항목은 항상 맨 위로 스크롤하고, 이미 선택된 항목을 다시 골라도 맨 위로 되돌립니다. 끝 여백을 두어 마지막 항목도 맨 위까지 올라옵니다.
 * 고를 수 있는 항목이 없으면 `disabled`처럼 포커스를 받지 않습니다. 키보드로 포커스하면 활성 항목이 보이도록 스크롤합니다.
 * @internal
 * @name Column
 * @tag div
 * @role listbox
 */
export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      options,
      value,
      onSelect,
      disabled = false,
      readOnly = false,
      className,
      onKeyDown,
      onMouseDown,
      ...restProps
    },
    forwardedRef,
  ) => {
    const selectedValue = value == null ? null : String(value);
    const selectedValues = useMemo(
      () => (selectedValue == null ? [] : [selectedValue]),
      [selectedValue],
    );
    const isColumnDisabled = disabled || options.every(option => option.disabled);
    const listRef = useRef<HTMLDivElement>(null);
    const { alignSelected } = useColumnScroll(listRef, selectedValue, options.length);

    const selectOption = (next: string) => {
      if (readOnly) return;

      if (next === selectedValue) alignSelected();
      onSelect(Number(next));
    };

    const { listboxRef, listboxId, behavior, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled: isColumnDisabled,
      onSelect: selectOption,
      autoScrollToSelected: false,
    });

    const { onKeyDown: onListboxKeyDown, ...listboxProps } = getFocusableListboxProps();

    const revealOption = (optionValue: string) => {
      listRef.current
        ?.querySelector(`#${CSS.escape(getOptionId(listboxId, optionValue))}`)
        ?.scrollIntoView({ block: "nearest" });
    };

    const getInitialActiveValue = () => {
      const enabled = options.filter(option => !option.disabled);
      const target = enabled.find(option => String(option.value) === selectedValue) ?? enabled[0];

      return target == null ? null : String(target.value);
    };

    const activateEdge = (edge: "first" | "last") => {
      const enabled = options.filter(option => !option.disabled);
      const target = edge === "first" ? enabled[0] : enabled[enabled.length - 1];
      if (target == null) return;

      const targetValue = String(target.value);
      behavior.setActive(targetValue);
      revealOption(targetValue);
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      const target = behavior.activeValue ?? getInitialActiveValue();
      if (target == null) return;

      behavior.setActive(target);
      if (event.currentTarget.matches(":focus-visible")) revealOption(target);
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(event);
      if (isColumnDisabled) event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isColumnDisabled) return;

      const edge = EDGE_KEYS[event.key];
      if (edge == null) {
        onListboxKeyDown(event);

        return;
      }

      event.preventDefault();
      activateEdge(edge);
    };

    return (
      <div
        ref={mergeRefs(listboxRef, listRef, forwardedRef)}
        {...restProps}
        {...listboxProps}
        aria-readonly={readOnly || undefined}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        data-part='root'
        className={clsx(styles.root, className)}
      >
        {options.map(option => {
          const optionValue = String(option.value);
          const isDisabled = disabled || option.disabled;

          return (
            <Item
              key={optionValue}
              id={getOptionId(listboxId, optionValue)}
              value={optionValue}
              label={option.label}
              selected={optionValue === selectedValue}
              active={behavior.activeValue === optionValue}
              disabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;

                behavior.setActive(optionValue);
                selectOption(optionValue);
              }}
            />
          );
        })}
        <div aria-hidden className={styles.endSpacer} />
      </div>
    );
  },
);

Column.displayName = "TimePicker.Column";
