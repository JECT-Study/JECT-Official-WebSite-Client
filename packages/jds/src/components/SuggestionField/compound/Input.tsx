import { clsx } from "clsx";
import { disassemble } from "es-hangul";
import { Popover } from "radix-ui";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { ContentBadge } from "../../Badge";
import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { useFieldCounter } from "../../Field/useFieldCounter";
import { Listbox, useListbox, useMultiSelectState } from "../../Listbox";
import { useSuggestionFieldContext } from "../SuggestionField.context";
import * as styles from "../suggestionField.css";
import type { SuggestionFieldInputProps } from "../suggestionField.types";

import { mergeRefs } from "@/hooks/mergeRefs";
import { getActiveDescendantContainerProps } from "@/hooks/useActiveDescendant";
import { getBodyClassName } from "@/utils/typography";

const MOVE_KEYS = ["ArrowDown", "ArrowUp"];

const EMPTY_SUGGESTIONS: string[] = [];

const isSameText = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

const toSearchKey = (text: string) => disassemble(text.toLowerCase());

export const SuggestionFieldInput = forwardRef<HTMLInputElement, SuggestionFieldInputProps>(
  (
    {
      suggestions = EMPTY_SUGGESTIONS,
      value,
      defaultValue,
      onChange,
      maxValues,
      name,
      form,
      placeholder,
      acceptValueOnBlur = true,
      suffix,
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      onKeyDown: onKeyDownFromProps,
      onBlur: onBlurFromProps,
      onMouseDown: onMouseDownFromProps,
      "aria-label": ariaLabelFromProps,
      "aria-labelledby": labelledByFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      isDisabled,
      isReadOnly,
      isRequired,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaInvalid,
    } = useFieldControl("SuggestionField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const { isOpen, onOpenChange, onHasPopupContentChange } =
      useSuggestionFieldContext("SuggestionField.Input");

    const contentRef = useRef<HTMLDivElement>(null);

    const isInteractive = !isDisabled && !isReadOnly;

    const { selectedValues, toggle, remove } = useMultiSelectState(value, defaultValue, onChange);

    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");

    const trimmedQuery = query.trim();
    const isAtMax = maxValues != null && selectedValues.length >= maxValues;

    // 제안은 아직 추가하지 않은 값만 남긴다. 선택한 항목은 제안 목록에서 사라진다.
    // 최대 개수에 도달하면 남은 제안을 선택할 수 없으므로 목록을 비운다.
    const visibleSuggestions = useMemo(() => {
      if (isAtMax) return EMPTY_SUGGESTIONS;

      const remaining = suggestions.filter(
        suggestion => !selectedValues.some(selected => isSameText(selected, suggestion)),
      );
      if (trimmedQuery === "") return remaining;

      const queryKey = toSearchKey(trimmedQuery);
      return remaining.filter(suggestion => toSearchKey(suggestion).includes(queryKey));
    }, [isAtMax, suggestions, selectedValues, trimmedQuery]);

    const isQueryAcceptable =
      !isAtMax &&
      trimmedQuery !== "" &&
      !selectedValues.some(selected => isSameText(selected, trimmedQuery));

    const isCreatable =
      isQueryAcceptable && !suggestions.some(suggestion => isSameText(suggestion, trimmedQuery));

    const handleSelect = useCallback(
      (next: string) => {
        toggle(next);
        setQuery("");
      },
      [toggle],
    );

    const {
      listboxRef,
      listboxId,
      contextValue,
      activeId,
      activateFirst,
      onKeyDown: onListboxKeyDown,
      getListboxProps,
    } = useListbox({
      selectedValues,
      disabled: isDisabled,
      onSelect: handleSelect,
      autoScrollToSelected: false,
    });

    const { activeValue, setActive } = contextValue;

    const hasPopupContent = visibleSuggestions.length > 0 || isCreatable;

    useEffect(() => {
      onHasPopupContentChange(hasPopupContent);
      return () => onHasPopupContentChange(false);
    }, [hasPopupContent, onHasPopupContentChange]);

    useFieldCounter(
      "SuggestionField.Input",
      maxValues == null ? null : { current: selectedValues.length, max: maxValues },
    );

    const activateRef = useRef<() => void>(() => {});

    useLayoutEffect(() => {
      activateRef.current = () => {
        if (trimmedQuery === "") setActive(null);
        else activateFirst();
      };
    }, [trimmedQuery, activateFirst, setActive]);

    useLayoutEffect(() => {
      if (!isOpen) return;

      // Radix가 다음 커밋에서 팝업을 DOM에 추가하므로, 목록이 렌더링된 뒤 활성 항목을 맞춘다
      const frame = requestAnimationFrame(() => activateRef.current());
      return () => cancelAnimationFrame(frame);
    }, [isOpen]);

    const previousQueryRef = useRef(query);

    useEffect(() => {
      if (previousQueryRef.current === query) return;

      previousQueryRef.current = query;
      if (isOpen) activateRef.current();
    }, [isOpen, query]);

    const closeAndReset = () => {
      onOpenChange(false);
      setQuery("");
    };

    const handleContentMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || !isInteractive) return;

      onOpenChange(true);
    };

    const openIfInteractive = () => {
      if (isInteractive && !isOpen) onOpenChange(true);
    };

    const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      onMouseDownFromProps?.(e);
      if (e.defaultPrevented) return;

      openIfInteractive();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      openIfInteractive();
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlurFromProps?.(e);

      if (contentRef.current?.contains(e.relatedTarget)) return;

      onOpenChange(false);
      if (e.defaultPrevented) return;

      if (acceptValueOnBlur && isQueryAcceptable) toggle(trimmedQuery);
      setQuery("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive || e.nativeEvent.isComposing) return;

      if (e.key === "Escape") {
        if (isOpen || query !== "") e.preventDefault();
        closeAndReset();
        return;
      }

      if (e.key === "Backspace" && query === "") {
        if (selectedValues.length === 0) return;
        e.preventDefault();
        remove(selectedValues[selectedValues.length - 1]);
        return;
      }

      if (e.key === "Enter" && query !== "") {
        e.preventDefault();
        if (!isOpen && isQueryAcceptable) handleSelect(trimmedQuery);
      }

      if (!isOpen) {
        if (MOVE_KEYS.includes(e.key)) {
          e.preventDefault();
          onOpenChange(true);
        }
        return;
      }

      if (e.altKey && MOVE_KEYS.includes(e.key)) {
        e.preventDefault();
        closeAndReset();
        return;
      }

      if (MOVE_KEYS.includes(e.key)) {
        onListboxKeyDown(e);
        return;
      }

      if (e.key === "Enter" && activeValue != null) {
        e.preventDefault();
        handleSelect(activeValue);
      }
    };

    return (
      <>
        <Popover.Anchor asChild>
          <FieldContent
            ref={contentRef}
            className={styles.content}
            onMouseDown={handleContentMouseDown}
          >
            {selectedValues.map(selected => (
              <ContentBadge
                key={selected}
                size='sm'
                hierarchy='primary'
                badgeStyle='outlined'
                isMuted={isDisabled}
                className={styles.tag}
                {...(isInteractive
                  ? {
                      withIconButton: true,
                      onIconClick: () => {
                        remove(selected);
                        inputRef.current?.focus();
                      },
                    }
                  : { withIconButton: false })}
              >
                {selected}
              </ContentBadge>
            ))}
            <input
              {...restProps}
              ref={mergeRefs(ref, inputRef)}
              id={fieldId}
              type='text'
              role='combobox'
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              aria-controls={isOpen ? listboxId : undefined}
              aria-activedescendant={isOpen ? activeId : undefined}
              aria-autocomplete='list'
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              aria-invalid={ariaInvalid}
              aria-readonly={isReadOnly || undefined}
              aria-required={isRequired || undefined}
              autoComplete='off'
              disabled={isDisabled}
              readOnly={isReadOnly}
              placeholder={selectedValues.length === 0 ? placeholder : undefined}
              value={query}
              data-field-control=''
              data-readonly={isReadOnly || undefined}
              className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
            />
            {suffix != null && <span className={styles.suffix}>{suffix}</span>}
            {name != null &&
              selectedValues.map(selected => (
                <input
                  key={selected}
                  type='hidden'
                  name={name}
                  value={selected}
                  form={form}
                  disabled={isDisabled}
                />
              ))}
          </FieldContent>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            asChild
            align='start'
            sideOffset={4}
            collisionPadding={8}
            onOpenAutoFocus={e => e.preventDefault()}
            onCloseAutoFocus={e => e.preventDefault()}
            onInteractOutside={e => {
              if (contentRef.current?.contains(e.target as Node)) e.preventDefault();
            }}
          >
            <Listbox
              role='presentation'
              className={styles.popup}
              context={contextValue}
              selectionMode='multiple'
              variant='label'
              listboxRef={listboxRef}
              listboxProps={{
                ...getListboxProps(),
                ...getActiveDescendantContainerProps(),
                "aria-label": ariaLabel,
                "aria-labelledby": ariaLabelledBy,
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {isCreatable && (
                <Listbox.CustomValue value={trimmedQuery} caption='입력한 값 새로 추가' />
              )}
              {visibleSuggestions.map(suggestion => (
                <Listbox.Option key={suggestion} value={suggestion}>
                  {suggestion}
                </Listbox.Option>
              ))}
            </Listbox>
          </Popover.Content>
        </Popover.Portal>
      </>
    );
  },
);

SuggestionFieldInput.displayName = "SuggestionField.Input";
