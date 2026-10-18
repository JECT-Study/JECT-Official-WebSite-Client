import { clsx } from "clsx";
import { forwardRef, useMemo, useRef, type KeyboardEvent } from "react";

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
 * 처음 그릴 때와 열 밖에서 선택이 바뀔 때 선택 항목을 맨 위로 스크롤합니다.
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
      ...restProps
    },
    forwardedRef,
  ) => {
    const selectedValue = value == null ? null : String(value);
    const selectedValues = useMemo(
      () => (selectedValue == null ? [] : [selectedValue]),
      [selectedValue],
    );
    const listRef = useRef<HTMLDivElement>(null);
    const { skipAlignFor } = useColumnScroll(listRef, selectedValue);

    const selectOption = (next: string) => {
      if (readOnly) return;

      skipAlignFor(next);
      onSelect(Number(next));
    };

    const { listboxRef, listboxId, behavior, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled,
      onSelect: selectOption,
      autoScrollToSelected: false,
    });

    const { onKeyDown: onListboxKeyDown, ...listboxProps } = getFocusableListboxProps();

    const activateEdge = (edge: "first" | "last") => {
      const enabled = options.filter(option => !option.disabled);
      const target = edge === "first" ? enabled[0] : enabled[enabled.length - 1];
      if (target == null) return;

      const targetValue = String(target.value);
      behavior.setActive(targetValue);
      document
        .getElementById(getOptionId(listboxId, targetValue))
        ?.scrollIntoView({ block: "nearest" });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) return;

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
      </div>
    );
  },
);

Column.displayName = "TimePicker.Column";
