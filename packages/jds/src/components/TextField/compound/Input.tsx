import { clsx } from "clsx";
import { forwardRef, useRef } from "react";

import { IconButton } from "../../Button/IconButton";
import { FieldContent, FieldKbd } from "../../Field";
import * as fieldStyles from "../../Field/field.css";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextLengthCounter } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";
import type { TextFieldInputProps } from "../textField.types";

import { mergeRefs } from "@/hooks/mergeRefs";
import { getBodyClassName } from "@/utils/typography";

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      prefix,
      kbd,
      withClearButton = false,
      action,
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
      "aria-label": ariaLabelFromProps,
      "aria-labelledby": labelledByFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      value,
      defaultValue,
      onChange,
      maxLength,
      placeholder,
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
    } = useFieldControl("TextField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCountedChange = useTextLengthCounter<HTMLInputElement>("TextField.Input", {
      value,
      defaultValue,
      maxLength,
      onChange,
    });

    const isInteractive = !isDisabled && !isReadOnly;

    // 값이 있는지는 렌더 시점에 판단하지 않고 CSS의 :placeholder-shown으로 판단한다.
    const hasClearButton = withClearButton && isInteractive;
    const hasTrailing = hasClearButton || action != null || kbd != null;
    const isClearButtonOnly = hasClearButton && action == null && kbd == null;

    const handleClear = () => {
      const input = inputRef.current;
      if (input == null) return;

      // controlled와 uncontrolled 모두 onChange로 빈 값을 전달하도록, native setter로 값을 바꾼 뒤 input 이벤트를 발생시킨다.
      // React는 자체 setter를 거치지 않은 값 변경을 감지해 onChange를 호출한다.
      Reflect.set(HTMLInputElement.prototype, "value", "", input);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    };

    return (
      <FieldContent>
        {prefix != null && (
          <span className={clsx(fieldStyles.contentSlot, styles.affix)}>{prefix}</span>
        )}
        <input
          {...restProps}
          ref={mergeRefs(ref, inputRef)}
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleCountedChange}
          maxLength={maxLength}
          // :placeholder-shown은 placeholder 속성이 있어야 매칭되므로, 지우기 버튼을 쓰면서 placeholder가 없으면 공백을 넣는다.
          placeholder={hasClearButton && !placeholder ? " " : placeholder}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired || undefined}
          data-field-control=''
          // native :read-only는 readonly를 지원하지 않는 input type에서도 매칭되므로, 해석된 상태를 data 속성으로 내려준다.
          data-readonly={isReadOnly || undefined}
          className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
        />
        {hasTrailing && (
          <span
            className={clsx(
              fieldStyles.contentTrailing,
              isClearButtonOnly && styles.clearButtonOnlyTrailing,
            )}
          >
            {hasClearButton && (
              <IconButton
                hierarchy='tertiary'
                size='md'
                icon='x'
                aria-label='입력 내용 지우기'
                className={clsx(fieldStyles.contentAction, styles.clearButton)}
                // 누르는 순간 입력칸에서 포커스가 빠지면 지우기 전 값으로 blur가 먼저 발생하므로, 포커스를 입력칸에 유지한다.
                onMouseDown={e => e.preventDefault()}
                onClick={handleClear}
              />
            )}
            {action != null && (
              <span className={clsx(fieldStyles.contentAction, styles.affix)}>{action}</span>
            )}
            {kbd != null && <FieldKbd keys={kbd} disabled={isDisabled} />}
          </span>
        )}
      </FieldContent>
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
