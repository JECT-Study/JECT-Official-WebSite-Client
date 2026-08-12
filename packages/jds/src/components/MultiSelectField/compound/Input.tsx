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
import { useFieldContext } from "../../Field/Field.context";
import { Listbox, useListbox, useMultiSelectState } from "../../Listbox";
import { useMultiSelectFieldContext } from "../MultiSelectField.context";
import * as styles from "../multiSelectField.css";
import type { MultiSelectFieldInputProps } from "../multiSelectField.types";

import { mergeRefs } from "@/hooks/mergeRefs";
import { getActiveDescendantContainerProps } from "@/hooks/useActiveDescendant";
import { getBodyClassName } from "@/utils/typography";

const MOVE_KEYS = ["ArrowDown", "ArrowUp"];

const isSameText = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

const toSearchKey = (text: string) => disassemble(text.toLowerCase());

export const MultiSelectFieldInput = forwardRef<HTMLInputElement, MultiSelectFieldInputProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      maxValues,
      name,
      form,
      variant = "control",
      allowCustomValue = false,
      placeholder,
      suffix,
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      onKeyDown: onKeyDownFromProps,
      onBlur: onBlurFromProps,
      onMouseDown: onMouseDownFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      labelId,
      hasLabel,
      helperId,
      hasHelper,
      counterId,
      hasCounter,
      onControlRequiredChange,
      status,
      disabled: isDisabledFromCtx,
      readonly: isReadOnlyFromCtx,
      required: isRequiredFromCtx,
    } = useFieldContext("MultiSelectField.Input");

    const { isOpen, onOpenChange, onHasPopupContentChange, onCounterChange } =
      useMultiSelectFieldContext("MultiSelectField.Input");

    const contentRef = useRef<HTMLDivElement>(null);

    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const isReadOnly = readOnlyFromProps ?? isReadOnlyFromCtx;
    const isRequired = requiredFromProps ?? isRequiredFromCtx;

    useLayoutEffect(() => {
      onControlRequiredChange(isRequired);
      return () => onControlRequiredChange(false);
    }, [isRequired, onControlRequiredChange]);

    const isInteractive = !isDisabled && !isReadOnly;

    const { selectedValues, toggle, remove } = useMultiSelectState(value, defaultValue, onChange);

    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");

    const trimmedQuery = query.trim();
    const isAtMax = maxValues != null && selectedValues.length >= maxValues;

    const visibleOptions = useMemo(() => {
      if (trimmedQuery === "") return options;

      const queryKey = toSearchKey(trimmedQuery);
      return options.filter(option => toSearchKey(option).includes(queryKey));
    }, [options, trimmedQuery]);

    const isCreatable =
      allowCustomValue &&
      !isAtMax &&
      trimmedQuery !== "" &&
      !options.some(option => isSameText(option, trimmedQuery)) &&
      !selectedValues.some(selected => isSameText(selected, trimmedQuery));

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
      activateSelected,
      activateFirst,
      scrollToSelected,
      onKeyDown: onListboxKeyDown,
      getListboxProps,
    } = useListbox({
      selectedValues,
      disabled: isDisabled,
      onSelect: handleSelect,
      autoScrollToSelected: false,
    });

    const { activeValue } = contextValue;

    const hasPopupContent = visibleOptions.length > 0 || isCreatable;

    useEffect(() => {
      onHasPopupContentChange(hasPopupContent);
      return () => onHasPopupContentChange(false);
    }, [hasPopupContent, onHasPopupContentChange]);

    const selectedCount = selectedValues.length;

    useLayoutEffect(() => {
      if (maxValues == null) return;

      onCounterChange({ current: selectedCount, max: maxValues });
      return () => onCounterChange(null);
    }, [selectedCount, maxValues, onCounterChange]);

    const activateRef = useRef<() => void>(() => {});

    useLayoutEffect(() => {
      activateRef.current = () => {
        if (trimmedQuery === "") activateSelected();
        else activateFirst();
      };
    }, [trimmedQuery, activateSelected, activateFirst]);

    useLayoutEffect(() => {
      if (!isOpen) return;

      // Radix가 다음 커밋에서 팝업을 DOM에 추가하므로, 목록이 렌더링된 뒤 활성 항목과 스크롤을 맞춘다
      const frame = requestAnimationFrame(() => {
        activateRef.current();
        scrollToSelected();
      });
      return () => cancelAnimationFrame(frame);
    }, [isOpen, scrollToSelected]);

    const previousQueryRef = useRef(query);

    useEffect(() => {
      if (previousQueryRef.current === query) return;

      previousQueryRef.current = query;
      if (isOpen) activateRef.current();
    }, [isOpen, query]);

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
      if (!e.defaultPrevented && !allowCustomValue) setQuery("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive || e.nativeEvent.isComposing) return;

      if (e.key === "Escape") {
        if (isOpen) e.preventDefault();
        onOpenChange(false);
        return;
      }

      if (e.key === "Backspace" && query === "") {
        if (selectedValues.length === 0) return;
        e.preventDefault();
        remove(selectedValues[selectedValues.length - 1]);
        return;
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
        onOpenChange(false);
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

    const describedByIds = [
      hasHelper ? helperId : undefined,
      hasCounter ? counterId : undefined,
      describedByFromProps,
    ].filter(Boolean);
    const ariaInvalid = status === "error" ? true : (invalidFromProps ?? false);

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
              aria-labelledby={hasLabel ? labelId : undefined}
              aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
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
              variant={variant}
              listboxRef={listboxRef}
              listboxProps={{
                ...getListboxProps(),
                ...getActiveDescendantContainerProps(),
                "aria-labelledby": hasLabel ? labelId : undefined,
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {isCreatable && (
                <Listbox.CustomValue value={trimmedQuery} caption='입력한 값 새로 추가' />
              )}
              {visibleOptions.map(option => (
                <Listbox.Option
                  key={option}
                  value={option}
                  disabled={isAtMax && !selectedValues.includes(option)}
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox>
          </Popover.Content>
        </Popover.Portal>
      </>
    );
  },
);

MultiSelectFieldInput.displayName = "MultiSelectField.Input";
