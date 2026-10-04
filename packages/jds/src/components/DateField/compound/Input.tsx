import { clsx } from "clsx";
import { forwardRef, useEffect, useRef, type SyntheticEvent } from "react";
import { visuallyHidden } from "utils";

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import * as styles from "../dateField.css";
import type { DateFieldInputProps } from "../dateField.types";
import { DATE_PLACEHOLDER, DATE_SEGMENT_RULES } from "../dateField.utils";
import { useSegmentedInput } from "../useSegmentedInput";

import { mergeRefs } from "@/hooks/mergeRefs";
import { useControllableState } from "@/hooks/useControllableState";
import { getBodyClassName } from "@/utils/typography";

const FORMAT_HINT =
  "연, 월, 일 순서로 입력합니다. 좌우 방향키로 항목을 옮기고 위아래 방향키로 값을 바꿉니다.";

// 소비처 핸들러를 먼저 호출하고, 기본 동작을 막았다면 내부 처리를 건너뛴다.
const composeHandler =
  <E extends SyntheticEvent>(external: ((e: E) => void) | undefined, internal: (e: E) => void) =>
  (e: E) => {
    external?.(e);
    if (!e.defaultPrevented) internal(e);
  };

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 날짜 입력을 렌더한다.
 * 보이는 input은 "2026.07.25" 같은 표시 문자열만 갖고, `name`을 지정하면 "YYYY-MM-DD" 값을 hidden input으로 전송한다.
 * controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`) 방식을 지원한다.
 */
export const DateFieldInput = forwardRef<HTMLInputElement, DateFieldInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      suffix,
      name,
      form,
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      onFocus: onFocusFromProps,
      onBlur: onBlurFromProps,
      onMouseDown: onMouseDownFromProps,
      onKeyDown: onKeyDownFromProps,
      onCompositionEnd: onCompositionEndFromProps,
      onPaste: onPasteFromProps,
      onCut: onCutFromProps,
      onDrop: onDropFromProps,
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
    } = useFieldControl("DateField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const [dateValue, setDateValue] = useControllableState<string>(
      value,
      defaultValue ?? "",
      onChange,
    );

    const { displayValue, isEmpty, resetSegments, handlers } = useSegmentedInput({
      inputRef,
      rules: DATE_SEGMENT_RULES,
      value: dateValue,
      onValueChange: setDateValue,
      isEditable: !isDisabled && !isReadOnly,
    });

    const defaultValueRef = useRef(defaultValue ?? "");

    useEffect(() => {
      const formElement = inputRef.current?.form;
      if (formElement == null) return;

      // reset 기본 동작이 끝난 다음 태스크에서 값을 되돌린다. 소비처의 초기화 취소 여부도 이 시점에 확인할 수 있다.
      const handleReset = (e: Event) => {
        setTimeout(() => {
          if (e.defaultPrevented) return;

          setDateValue(defaultValueRef.current);
          resetSegments(defaultValueRef.current);
        }, 0);
      };

      formElement.addEventListener("reset", handleReset);
      return () => formElement.removeEventListener("reset", handleReset);
    }, [setDateValue, resetSegments]);

    const formatHintId = `${fieldId}-format`;

    return (
      <FieldContent data-disabled={isDisabled || undefined}>
        <input
          {...restProps}
          ref={mergeRefs(ref, inputRef)}
          id={fieldId}
          type='text'
          inputMode='numeric'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          form={form}
          placeholder={DATE_PLACEHOLDER}
          value={displayValue}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={[ariaDescribedBy, formatHintId].filter(Boolean).join(" ")}
          aria-invalid={ariaInvalid}
          aria-required={isRequired || undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-field-control=''
          data-readonly={isReadOnly || undefined}
          data-empty={isEmpty || undefined}
          className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
          onChange={handlers.onChange}
          onFocus={composeHandler(onFocusFromProps, handlers.onFocus)}
          onBlur={composeHandler(onBlurFromProps, handlers.onBlur)}
          onMouseDown={composeHandler(onMouseDownFromProps, handlers.onMouseDown)}
          onKeyDown={composeHandler(onKeyDownFromProps, handlers.onKeyDown)}
          onCompositionEnd={composeHandler(onCompositionEndFromProps, handlers.onCompositionEnd)}
          onPaste={composeHandler(onPasteFromProps, handlers.onPaste)}
          onCut={composeHandler(onCutFromProps, handlers.onCut)}
          onDrop={composeHandler(onDropFromProps, handlers.onDrop)}
        />
        <span id={formatHintId} className={visuallyHidden}>
          {FORMAT_HINT}
        </span>
        {suffix != null && <span className={styles.suffix}>{suffix}</span>}
        {name != null && (
          <input type='hidden' name={name} form={form} value={dateValue} disabled={isDisabled} />
        )}
      </FieldContent>
    );
  },
);

DateFieldInput.displayName = "DateField.Input";
