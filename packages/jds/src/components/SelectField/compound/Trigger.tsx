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

import { useFieldContext } from "../../Field/Field.context";
import { Icon } from "../../Icon";
import { Listbox, useListbox } from "../../Listbox";
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
      helperTextId,
      hasHelperText,
      status,
      disabled: isDisabledFromCtx,
      readonly: isReadOnly,
    } = useFieldContext("SelectField.Trigger");

    const { isOpen, onOpenChange } = useSelectFieldContext("SelectField.Trigger");

    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const isInteractive = !isDisabled && !isReadOnly;

    const {
      listboxRef,
      listboxId,
      contextValue,
      selectedValues,
      activeId,
      activateSelected,
      scrollToSelected,
      onKeyDown: onListboxKeyDown,
      getListboxProps,
    } = useListbox({
      mode: "single",
      variant,
      options,
      value,
      defaultValue,
      onChange: onChange as ((value: string | string[]) => void) | undefined,
      disabled: isDisabled,
      scrollToSelectedOnMount: false,
    });

    const selectedLabel = options.find(option => option.value === selectedValues[0])?.label;

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

      activateSelectedRef.current();

      // Radix가 available-height를 반영한 뒤에야 스크롤 영역이 생기므로 다음 프레임에서 실행
      const frame = requestAnimationFrame(() => scrollToSelected());
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

    const describedByIds = [hasHelperText ? helperTextId : undefined, describedByFromProps].filter(
      Boolean,
    );
    const ariaInvalid = status === "error" ? true : (invalidFromProps ?? false);

    return (
      <>
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
            aria-labelledby={labelId}
            aria-activedescendant={isOpen ? activeId : undefined}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
            aria-invalid={ariaInvalid}
            aria-readonly={isReadOnly || undefined}
            disabled={isDisabled}
            data-interaction-target=''
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
              options={options}
              listboxRef={listboxRef}
              listboxProps={{
                ...getListboxProps(),
                ...getActiveDescendantContainerProps(),
                "aria-labelledby": labelId,
              }}
              onMouseDown={e => e.preventDefault()}
            />
          </Popover.Content>
        </Popover.Portal>
      </>
    );
  },
);

SelectFieldTrigger.displayName = "SelectField.Trigger";
