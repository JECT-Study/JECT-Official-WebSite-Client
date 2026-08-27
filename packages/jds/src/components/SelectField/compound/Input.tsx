import { clsx } from "clsx";
import { disassemble } from "es-hangul";
import { Popover } from "radix-ui";
import {
  forwardRef,
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

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { Icon } from "../../Icon";
import { Listbox, useListbox, useSingleSelectState } from "../../Listbox";
import { SELECTION_KEYS } from "../../Listbox/listbox.constants";
import { useSelectFieldContext } from "../SelectField.context";
import * as styles from "../selectField.css";
import type { SelectFieldInputProps } from "../selectField.types";

import { getActiveDescendantContainerProps } from "@/hooks/useActiveDescendant";
import { getBodyClassName } from "@/utils/typography";

const MOVE_KEYS = ["ArrowDown", "ArrowUp"];
const NAVIGATION_KEYS = [...MOVE_KEYS, "Home", "End"];
const OPENING_KEYS = [...NAVIGATION_KEYS, ...SELECTION_KEYS];

const toSearchKey = (text: string) => disassemble(text.toLowerCase());

export const SelectFieldInput = forwardRef<HTMLInputElement, SelectFieldInputProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      name,
      form,
      variant = "label",
      searchable = false,
      placeholder,
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
    } = useFieldControl("SelectField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const { isOpen, onOpenChange, onHasPopupContentChange } =
      useSelectFieldContext("SelectField.Input");

    const contentRef = useRef<HTMLDivElement>(null);

    const isInteractive = !isDisabled && !isReadOnly;

    const { selectedValue, selectedValues, select } = useSingleSelectState(
      value,
      defaultValue,
      onChange,
    );

    const selectedLabel = options.find(option => option.value === selectedValue)?.label;

    // 검색 중일 때만 값을 갖는다. null이면 선택한 옵션의 표시명을 표시한다.
    const [query, setQuery] = useState<string | null>(null);
    const trimmedQuery = query?.trim() ?? "";

    const visibleOptions = useMemo(() => {
      if (trimmedQuery === "") return options;

      const queryKey = toSearchKey(trimmedQuery);
      return options.filter(option => toSearchKey(option.label).includes(queryKey));
    }, [options, trimmedQuery]);

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
      onSelect: select,
      autoScrollToSelected: false,
    });

    const { activeValue } = contextValue;

    const hasPopupContent = visibleOptions.length > 0;

    useEffect(() => {
      onHasPopupContentChange(hasPopupContent);
      return () => onHasPopupContentChange(false);
    }, [hasPopupContent, onHasPopupContentChange]);

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

    const closeAndReset = () => {
      onOpenChange(false);
      setQuery(null);
    };

    const popupContextValue = useMemo(
      () => ({
        ...contextValue,
        select: (optionValue: string) => {
          contextValue.select(optionValue);
          onOpenChange(false);
          setQuery(null);
        },
      }),
      [contextValue, onOpenChange],
    );

    const openIfInteractive = () => {
      if (isInteractive && !isOpen) onOpenChange(true);
    };

    const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      onMouseDownFromProps?.(e);
      if (e.defaultPrevented) return;

      if (searchable) openIfInteractive();
      else if (isInteractive) onOpenChange(!isOpen);
    };

    const handleContentMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || !isInteractive) return;

      if (searchable) openIfInteractive();
      else onOpenChange(!isOpen);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!searchable) return;

      setQuery(e.target.value);
      openIfInteractive();
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlurFromProps?.(e);

      if (contentRef.current?.contains(e.relatedTarget)) return;

      onOpenChange(false);
      if (!e.defaultPrevented) setQuery(null);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive || e.nativeEvent.isComposing) return;

      if (e.key === "Escape") {
        if (isOpen || query != null) e.preventDefault();
        closeAndReset();
        return;
      }

      const openingKeys = searchable ? MOVE_KEYS : OPENING_KEYS;
      const listboxKeys = searchable ? MOVE_KEYS : NAVIGATION_KEYS;
      const selectionKeys = searchable ? ["Enter"] : SELECTION_KEYS;

      if (!isOpen) {
        if (openingKeys.includes(e.key)) {
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

      if (listboxKeys.includes(e.key)) {
        onListboxKeyDown(e);
        return;
      }

      if (selectionKeys.includes(e.key) && activeValue != null) {
        e.preventDefault();
        select(activeValue);
        closeAndReset();
      }
    };

    return (
      <>
        <Popover.Anchor asChild>
          <FieldContent
            ref={contentRef}
            data-open={isOpen || undefined}
            data-disabled={isDisabled || undefined}
            onMouseDown={handleContentMouseDown}
          >
            <input
              {...restProps}
              ref={ref}
              id={fieldId}
              type='text'
              role='combobox'
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              aria-controls={isOpen ? listboxId : undefined}
              aria-activedescendant={isOpen ? activeId : undefined}
              aria-autocomplete={searchable ? "list" : undefined}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              aria-invalid={ariaInvalid}
              // searchable=false가 타이핑을 막기 위해 native readonly를 사용하므로,
              // 스크린 리더에 읽기 전용으로 전달되지 않도록 항상 aria-readonly를 명시한다.
              aria-readonly={isReadOnly}
              aria-required={isRequired || undefined}
              autoComplete='off'
              disabled={isDisabled}
              readOnly={isReadOnly || !searchable}
              placeholder={placeholder}
              value={query ?? selectedLabel ?? ""}
              data-field-control=''
              data-readonly={isReadOnly || undefined}
              className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
            />
            {suffix != null && <span className={styles.suffix}>{suffix}</span>}
            <Icon name='chevron-down' size='md' className={styles.indicator} />
            {name != null && (
              <input
                type='hidden'
                name={name}
                value={selectedValue ?? ""}
                form={form}
                disabled={isDisabled}
              />
            )}
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
              context={popupContextValue}
              selectionMode='single'
              variant={variant}
              listboxRef={listboxRef}
              listboxProps={{
                ...getListboxProps(),
                ...getActiveDescendantContainerProps(),
                "aria-label": ariaLabel,
                "aria-labelledby": ariaLabelledBy,
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {visibleOptions.map(option => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  caption={option.caption}
                  suffix={option.suffix}
                  disabled={option.disabled}
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox>
          </Popover.Content>
        </Popover.Portal>
      </>
    );
  },
);

SelectFieldInput.displayName = "SelectField.Input";
