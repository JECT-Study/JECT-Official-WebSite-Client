import { clsx } from "clsx";
import { Popover } from "radix-ui";
import {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
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
const OPENING_KEYS = [...MOVE_KEYS, "Home", "End", ...SELECTION_KEYS];

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

    const { isOpen, onOpenChange } = useSelectFieldContext("SelectField.Input");

    const contentRef = useRef<HTMLDivElement>(null);

    const isInteractive = !isDisabled && !isReadOnly;

    const { selectedValue, selectedValues, select } = useSingleSelectState(
      value,
      defaultValue,
      onChange,
    );

    const selectedLabel = options.find(option => option.value === selectedValue)?.label;

    const {
      listboxRef,
      listboxId,
      contextValue,
      activeId,
      activateSelected,
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

    const activateRef = useRef<() => void>(() => {});
    activateRef.current = activateSelected;

    useLayoutEffect(() => {
      if (!isOpen) return;

      // Radix가 다음 커밋에서 팝업을 DOM에 추가하므로, 목록이 렌더링된 뒤 활성 항목과 스크롤을 맞춘다
      const frame = requestAnimationFrame(() => {
        activateRef.current();
        scrollToSelected();
      });
      return () => cancelAnimationFrame(frame);
    }, [isOpen, scrollToSelected]);

    const popupContextValue = useMemo(
      () => ({
        ...contextValue,
        select: (optionValue: string) => {
          contextValue.select(optionValue);
          onOpenChange(false);
        },
      }),
      [contextValue, onOpenChange],
    );

    const handleContentMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || !isInteractive) return;

      onOpenChange(true);
    };

    const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      onMouseDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive) return;

      onOpenChange(!isOpen);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlurFromProps?.(e);

      if (contentRef.current?.contains(e.relatedTarget)) return;
      if (e.defaultPrevented) return;

      onOpenChange(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive || e.nativeEvent.isComposing) return;

      if (e.key === "Escape") {
        if (isOpen) e.preventDefault();
        onOpenChange(false);
        return;
      }

      if (!isOpen) {
        if (OPENING_KEYS.includes(e.key)) {
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

      onListboxKeyDown(e);

      if (SELECTION_KEYS.includes(e.key) && activeValue != null) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    return (
      <>
        <Popover.Anchor asChild>
          <FieldContent
            ref={contentRef}
            data-open={isOpen || undefined}
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
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              aria-invalid={ariaInvalid}
              // 목록에서만 값을 고르므로 타이핑을 막되, 스크린 리더에 읽기 전용으로
              // 전달되지 않도록 항상 aria-readonly를 명시한다.
              aria-readonly={isReadOnly}
              aria-required={isRequired || undefined}
              autoComplete='off'
              disabled={isDisabled}
              readOnly
              placeholder={placeholder}
              value={selectedLabel ?? ""}
              data-field-control=''
              data-readonly={isReadOnly || undefined}
              className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
            />
            {suffix}
            <Icon name='arrow-down-s-line' size='md' className={styles.indicator} />
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
              {options.map(option => (
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
