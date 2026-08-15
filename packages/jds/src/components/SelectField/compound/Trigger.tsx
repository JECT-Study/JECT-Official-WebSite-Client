import { clsx } from "clsx";
import { Popover } from "radix-ui";
import {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { FieldContent } from "../../Field";
import { useFieldContext } from "../../Field/Field.context";
import { Icon } from "../../Icon";
import { Listbox, useListbox, useSingleSelectState } from "../../Listbox";
import { SELECTION_KEYS } from "../../Listbox/listbox.constants";
import { useSelectFieldContext } from "../SelectField.context";
import * as styles from "../selectField.css";
import type { SelectFieldTriggerProps } from "../selectField.types";

import { getActiveDescendantContainerProps } from "@/hooks/useActiveDescendant";
import { getBodyClassName } from "@/utils/typography";

const OPENING_KEYS = ["ArrowDown", "ArrowUp", "Home", "End", ...SELECTION_KEYS];

export const SelectFieldTrigger = forwardRef<HTMLButtonElement, SelectFieldTriggerProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      variant = "label",
      placeholder,
      suffix,
      disabled: disabledFromProps,
      onClick: onClickFromProps,
      onKeyDown: onKeyDownFromProps,
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
      status,
      disabled: isDisabledFromCtx,
      readonly: isReadOnly,
    } = useFieldContext("SelectField.Trigger");

    const { isOpen, onOpenChange } = useSelectFieldContext("SelectField.Trigger");

    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const isInteractive = !isDisabled && !isReadOnly;

    const { selectedValue, selectedValues, select } = useSingleSelectState(
      value,
      defaultValue,
      onChange,
    );

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

    const selectedLabel = options.find(option => option.value === selectedValue)?.label;

    const activateSelectedRef = useRef(activateSelected);
    activateSelectedRef.current = activateSelected;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClickFromProps?.(e);
      if (isReadOnly) e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDownFromProps?.(e);
      if (e.defaultPrevented || !isInteractive) return;

      if (!isOpen) {
        if (OPENING_KEYS.includes(e.key)) {
          e.preventDefault();
          onOpenChange(true);
        }
        return;
      }

      if (e.altKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        onOpenChange(false);
        return;
      }

      onListboxKeyDown(e);

      if (SELECTION_KEYS.includes(e.key)) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    useLayoutEffect(() => {
      if (!isOpen) return;

      // Radix가 다음 커밋에서 팝업을 DOM에 추가하므로, 목록이 렌더링된 뒤 활성 항목과 스크롤을 맞춘다
      const frame = requestAnimationFrame(() => {
        activateSelectedRef.current();
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

    const describedByIds = [hasHelper ? helperId : undefined, describedByFromProps].filter(Boolean);
    const ariaInvalid = status === "error" ? true : (invalidFromProps ?? false);

    return (
      <>
        <Popover.Anchor asChild>
          <FieldContent>
            <Popover.Trigger asChild>
              <button
                {...restProps}
                ref={ref}
                type='button'
                id={fieldId}
                role='combobox'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-labelledby={hasLabel ? labelId : undefined}
                aria-activedescendant={isOpen ? activeId : undefined}
                aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
                aria-invalid={ariaInvalid}
                aria-readonly={isReadOnly || undefined}
                disabled={isDisabled}
                data-field-control=''
                data-readonly={isReadOnly || undefined}
                data-open={isOpen || undefined}
                className={clsx(styles.trigger, className)}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
              >
                <span
                  className={clsx(getBodyClassName({ size: "md" }), styles.value)}
                  data-placeholder={selectedLabel == null || undefined}
                >
                  {selectedLabel ?? placeholder}
                </span>
                {suffix}
                <Icon name='arrow-down-s-line' size='md' className={styles.indicator} />
              </button>
            </Popover.Trigger>
          </FieldContent>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            asChild
            align='start'
            sideOffset={4}
            collisionPadding={8}
            onOpenAutoFocus={e => e.preventDefault()}
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
                "aria-labelledby": hasLabel ? labelId : undefined,
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

SelectFieldTrigger.displayName = "SelectField.Trigger";
