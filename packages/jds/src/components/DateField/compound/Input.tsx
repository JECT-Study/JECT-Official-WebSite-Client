import { clsx } from "clsx";
import { Popover } from "radix-ui";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import { visuallyHidden } from "utils";

import { DateFieldPicker } from "./Picker";
import { IconButton } from "../../Button/IconButton";
import { isDateOutOfRange } from "../../DatePicker/datePicker.utils";
import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { getDateFieldErrorMessage, useDateFieldContext } from "../dateField.context";
import * as styles from "../dateField.css";
import type {
  DateFieldInputError,
  DateFieldInputProps,
  DateFieldInputState,
} from "../dateField.types";
import {
  DATE_PLACEHOLDER,
  DATE_SEGMENT_RULES,
  normalizeDateValue,
  valueToDate,
} from "../dateField.utils";
import { useSegmentedInput } from "../useSegmentedInput";

import { mergeRefs } from "@/hooks/mergeRefs";
import { useControllableState } from "@/hooks/useControllableState";
import { getBodyClassName } from "@/utils/typography";

const FORMAT_HINT =
  "연, 월, 일 순서로 입력합니다. 좌우 방향키로 항목을 옮기고 위아래 방향키로 값을 바꿉니다.";
const PICKER_HINT = "Alt와 아래 방향키를 함께 누르면 달력이 열립니다.";

// 소비처 핸들러를 먼저 호출하고, 기본 동작을 막았다면 내부 처리를 건너뛴다.
const composeHandler =
  <TEvent extends SyntheticEvent>(
    external: ((event: TEvent) => void) | undefined,
    internal: (event: TEvent) => void,
  ) =>
  (event: TEvent) => {
    external?.(event);
    if (!event.defaultPrevented) internal(event);
  };

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 날짜 입력, 달력 버튼을 렌더한다.
 * 달력에서 고른 날짜는 입력값에 반영하고, 입력한 날짜는 달력에서 선택된 상태로 보여 준다.
 * 보이는 input은 "2026.07.25" 같은 표시 문자열만 갖고, `name`을 지정하면 "YYYY-MM-DD" 값을 hidden input으로 전송한다.
 * controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`) 방식을 지원한다.
 * `onChange`는 확정값 변경만 알린다. blur에서는 소비처 핸들러 이후 부분 입력을 확정한다.
 * 부분 입력까지 지우려면 폼을 초기화하거나 Input을 다시 마운트한다.
 */
export const DateFieldInput = forwardRef<HTMLInputElement, DateFieldInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onInputStateChange,
      suffix = null,
      withPicker = true,
      withActionBar = false,
      minDate,
      maxDate,
      isDateDisabled,
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
      onInvalid: onInvalidFromProps,
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

    const defaultValueRef = useRef(defaultValue ?? "");
    const warnedExternalValuesRef = useRef(new Set<string>());
    const inputRef = useRef<HTMLInputElement>(null);
    const fieldContentRef = useRef<HTMLDivElement>(null);
    const pickerContentRef = useRef<HTMLDivElement>(null);
    const pickerTriggerRef = useRef<HTMLButtonElement>(null);
    const fieldExitCheckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isPickerOpenedFromInputRef = useRef(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isErrorDisplayEnabled, setIsErrorDisplayEnabled] = useState(false);
    const closeReasonRef = useRef<"select" | "outside" | null>(null);
    const { onInputStateChange: reportInputState } = useDateFieldContext("DateField.Input");
    const onInputStateChangeRef = useRef(onInputStateChange);
    onInputStateChangeRef.current = onInputStateChange;

    const isEditable = !isDisabled && !isReadOnly;

    useEffect(() => {
      if (!isEditable || !withPicker) setIsPickerOpen(false);
    }, [isEditable, withPicker]);

    const [dateValue, setDateValue] = useControllableState<string>(
      value,
      defaultValue ?? "",
      onChange,
    );
    const normalizedValue = normalizeDateValue(dateValue);

    useEffect(() => {
      if (process.env.NODE_ENV !== "development") return;

      // 내부 draft와 마운트 이후의 defaultValue 변경은 경고 대상이 아니다.
      const externalValue = value ?? defaultValueRef.current;
      if (externalValue === "" || normalizeDateValue(externalValue) !== "") return;

      const propName = value !== undefined ? "value" : "defaultValue";
      const warningKey = `${propName}:${externalValue}`;
      if (warnedExternalValuesRef.current.has(warningKey)) return;
      warnedExternalValuesRef.current.add(warningKey);

      console.warn(
        `DateField.Input의 ${propName}를 해석할 수 없습니다. 유효한 YYYY-MM-DD 형식의 날짜 또는 빈 문자열을 전달해주세요. 해석할 수 없는 값은 빈 입력과 빈 제출값으로 처리합니다.`,
      );
    }, [value]);

    // 완성된 날짜의 오류를 한 곳에서 판정하고, 확정 허용 여부도 같은 결과에서 파생한다.
    const getDateValueError = useCallback(
      (nextValue: string): DateFieldInputError | null => {
        const date = valueToDate(nextValue);
        if (date === null) return "invalid";
        if (isDateOutOfRange(date, minDate, maxDate)) return "outOfRange";
        if (isDateDisabled?.(date) === true) return "disabledDate";
        return null;
      },
      [minDate, maxDate, isDateDisabled],
    );

    const isValueAllowed = useCallback(
      (nextValue: string): boolean => getDateValueError(nextValue) === null,
      [getDateValueError],
    );

    const {
      displayValue,
      isEmpty,
      inputValue,
      draftValue,
      inputStatus,
      resetSegments,
      focusActiveSegment,
      handlers,
    } = useSegmentedInput({
      inputRef,
      rules: DATE_SEGMENT_RULES,
      value: dateValue,
      onValueChange: setDateValue,
      isEditable,
      isValueAllowed,
    });

    let error: DateFieldInputError | null = null;
    if (inputStatus === "empty") error = isRequired ? "required" : null;
    else if (inputStatus === "incomplete") error = "incomplete";
    else if (inputStatus === "invalid") error = "invalid";
    else error = getDateValueError(draftValue);

    const isErrorVisible = error !== null && isErrorDisplayEnabled;
    const currentValue = error === null ? draftValue : "";
    const inputState = useMemo<DateFieldInputState>(
      () => ({ inputValue, value: currentValue, error, isErrorVisible }),
      [inputValue, currentValue, error, isErrorVisible],
    );
    const lastValidValueRef = useRef(isValueAllowed(normalizedValue) ? normalizedValue : "");

    useLayoutEffect(() => {
      inputRef.current?.setCustomValidity(getDateFieldErrorMessage(error));
      reportInputState(inputState);
      onInputStateChangeRef.current?.(inputState);
      if (currentValue !== "") lastValidValueRef.current = currentValue;
    }, [inputState, error, currentValue, reportInputState]);

    useLayoutEffect(() => () => reportInputState(null), [reportInputState]);

    const cancelFieldExitCheck = useCallback(() => {
      if (fieldExitCheckTimerRef.current === null) return;
      clearTimeout(fieldExitCheckTimerRef.current);
      fieldExitCheckTimerRef.current = null;
    }, []);

    useEffect(() => cancelFieldExitCheck, [cancelFieldExitCheck]);

    const scheduleFieldExitCheck = (ownerDocument: Document) => {
      cancelFieldExitCheck();

      // 팝업이 닫힌 뒤의 포커스 복원까지 기다려 입력, 버튼, Portal을 하나의 필드로 판단한다.
      fieldExitCheckTimerRef.current = setTimeout(() => {
        fieldExitCheckTimerRef.current = null;
        const focusedElement = ownerDocument.activeElement;
        const isFocusWithinField =
          fieldContentRef.current?.contains(focusedElement) === true ||
          pickerContentRef.current?.contains(focusedElement) === true;
        if (!isFocusWithinField) setIsErrorDisplayEnabled(true);
      }, 0);
    };

    const handleFieldBlur = (event: FocusEvent<HTMLElement>) => {
      if (!event.defaultPrevented) scheduleFieldExitCheck(event.currentTarget.ownerDocument);
    };

    // ↓는 값을 줄이는 데 쓰므로 달력은 Alt와 함께 눌렀을 때 연다.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const isOpenPickerKey =
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.key === "ArrowDown";
      if (isOpenPickerKey && withPicker && isEditable) {
        event.preventDefault();
        isPickerOpenedFromInputRef.current = true;
        closeReasonRef.current = null;
        setIsPickerOpen(true);
        return;
      }

      handlers.onKeyDown(event);
    };

    const handlePickerSelect = (nextValue: string) => {
      const input = inputRef.current;
      // Portal의 달력에는 부모 fieldset의 native 비활성이 전파되지 않는다.
      if (input === null || input.matches(":disabled")) {
        setIsPickerOpen(false);
        return;
      }

      resetSegments(nextValue);
      setIsErrorDisplayEnabled(true);
      closeReasonRef.current = "select";
      setIsPickerOpen(false);
    };

    const handlePickerCloseAutoFocus = (event: Event) => {
      const input = inputRef.current;
      const trigger = pickerTriggerRef.current;
      const ownerDocument = input?.ownerDocument ?? trigger?.ownerDocument;
      // 포커스를 가진 팝업이 제거되면 blur가 발생하지 않을 수도 있다.
      if (ownerDocument !== undefined) scheduleFieldExitCheck(ownerDocument);

      if (closeReasonRef.current === "outside") {
        event.preventDefault();
        return;
      }
      if (closeReasonRef.current === "select") {
        event.preventDefault();
        focusActiveSegment();
        return;
      }
      // 소비처가 이미 포커스를 옮겼다면 그 위치를 유지한다.
      if (
        ownerDocument &&
        ownerDocument.activeElement !== null &&
        ownerDocument.activeElement !== ownerDocument.body
      ) {
        event.preventDefault();
        return;
      }
      if (!isPickerOpenedFromInputRef.current && trigger !== null && !trigger.matches(":disabled"))
        return;

      // readonly에서는 버튼이 비활성화되고 withPicker=false에서는 제거된다.
      event.preventDefault();
      focusActiveSegment();
    };

    const resetStateRef = useRef({ resetSegments, isValueAllowed });
    resetStateRef.current = { resetSegments, isValueAllowed };

    useEffect(() => {
      const formElement = inputRef.current?.form ?? null;
      if (formElement === null) return;

      const resetTimers = new Set<ReturnType<typeof setTimeout>>();

      // reset 기본 동작이 끝난 다음 태스크에서 값을 되돌린다. 소비처의 초기화 취소 여부도 이 시점에 확인할 수 있다.
      const handleReset = (event: Event) => {
        const timeoutId = setTimeout(() => {
          resetTimers.delete(timeoutId);
          // cleanup 전에 필드가 제거되거나 다른 폼에 연결되어도 이전 초기화를 적용하지 않는다.
          if (event.defaultPrevented || inputRef.current?.form !== formElement) return;

          cancelFieldExitCheck();
          resetStateRef.current.resetSegments(defaultValueRef.current);
          setIsErrorDisplayEnabled(false);
          lastValidValueRef.current = resetStateRef.current.isValueAllowed(defaultValueRef.current)
            ? defaultValueRef.current
            : "";
        }, 0);
        resetTimers.add(timeoutId);
      };

      formElement.addEventListener("reset", handleReset);
      return () => {
        formElement.removeEventListener("reset", handleReset);
        resetTimers.forEach(timeoutId => clearTimeout(timeoutId));
      };
    }, [form, cancelFieldExitCheck]);

    const formatHintId = `${fieldId}-format`;

    return (
      <Popover.Root
        open={isPickerOpen && isEditable && withPicker}
        onOpenChange={open => {
          if (open) closeReasonRef.current = null;
          setIsPickerOpen(open);
        }}
      >
        <Popover.Anchor asChild>
          <FieldContent
            ref={fieldContentRef}
            onBlur={handleFieldBlur}
            data-disabled={isDisabled || undefined}
          >
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
              aria-invalid={isErrorVisible || ariaInvalid}
              aria-required={isRequired || undefined}
              disabled={isDisabled}
              readOnly={isReadOnly}
              onInvalid={composeHandler(onInvalidFromProps, event => {
                event.preventDefault();
                setIsErrorDisplayEnabled(true);
                focusActiveSegment();
              })}
              data-field-control=''
              data-readonly={isReadOnly || undefined}
              data-empty={isEmpty || undefined}
              className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
              onChange={handlers.onChange}
              onFocus={composeHandler(onFocusFromProps, handlers.onFocus)}
              onBlur={composeHandler(onBlurFromProps, event => {
                handlers.onBlur(event);
                handleFieldBlur(event);
              })}
              onMouseDown={composeHandler(onMouseDownFromProps, handlers.onMouseDown)}
              onKeyDown={composeHandler(onKeyDownFromProps, handleKeyDown)}
              onCompositionEnd={composeHandler(
                onCompositionEndFromProps,
                handlers.onCompositionEnd,
              )}
              onPaste={composeHandler(onPasteFromProps, handlers.onPaste)}
              onCut={composeHandler(onCutFromProps, handlers.onCut)}
              onDrop={composeHandler(onDropFromProps, handlers.onDrop)}
            />
            <span id={formatHintId} className={visuallyHidden}>
              {withPicker ? `${FORMAT_HINT} ${PICKER_HINT}` : FORMAT_HINT}
            </span>
            {withPicker && (
              <Popover.Trigger asChild>
                <IconButton
                  ref={pickerTriggerRef}
                  onClick={() => {
                    if (!isPickerOpen) isPickerOpenedFromInputRef.current = false;
                  }}
                  hierarchy='tertiary'
                  size='md'
                  icon='calendar-days'
                  aria-label='날짜 선택'
                  disabled={!isEditable}
                  className={styles.pickerButton}
                />
              </Popover.Trigger>
            )}
            {suffix !== null && <span className={styles.suffix}>{suffix}</span>}
            {name !== undefined && (
              <input
                type='hidden'
                name={name}
                form={form}
                value={currentValue}
                disabled={isDisabled}
              />
            )}
          </FieldContent>
        </Popover.Anchor>
        {withPicker && (
          <DateFieldPicker
            contentRef={pickerContentRef}
            onBlur={handleFieldBlur}
            value={currentValue}
            defaultMonth={valueToDate(lastValidValueRef.current) ?? undefined}
            onSelect={handlePickerSelect}
            onCloseAutoFocus={handlePickerCloseAutoFocus}
            onInteractOutside={() => {
              closeReasonRef.current = "outside";
            }}
            withActionBar={withActionBar}
            minDate={minDate}
            maxDate={maxDate}
            isDateDisabled={isDateDisabled}
          />
        )}
      </Popover.Root>
    );
  },
);

DateFieldInput.displayName = "DateField.Input";
