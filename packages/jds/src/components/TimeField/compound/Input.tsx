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

import { TimeFieldPicker } from "./Picker";
import { IconButton } from "../../Button/IconButton";
import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import type { TimeValue } from "../../TimePicker";
import { toSeconds } from "../../TimePicker/timePicker.utils";
import { useTimeFieldContext } from "../timeField.context";
import * as styles from "../timeField.css";
import type {
  TimeFieldInputError,
  TimeFieldInputProps,
  TimeFieldInputState,
} from "../timeField.types";
import {
  createTimeSegmentRules,
  normalizeTimeValue,
  TIME_PLACEHOLDER,
  valueToTime,
} from "../timeField.utils";
import { useSegmentedInput } from "../useSegmentedInput";

import { mergeRefs } from "@/hooks/mergeRefs";
import { useControllableState } from "@/hooks/useControllableState";
import { getBodyClassName } from "@/utils/typography";

const FORMAT_HINT =
  "오전 또는 오후, 시, 분 순서로 입력합니다. 좌우 방향키로 항목을 옮기고 위아래 방향키로 값을 바꿉니다.";
const PICKER_HINT = "Alt와 아래 방향키를 함께 누르면 시간 선택이 열립니다.";

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

// 입력은 분까지만 다루므로 범위의 초는 버리고 비교한다.
const toMinuteSeconds = (time: TimeValue) => toSeconds({ ...time, second: 0 });

const isTimeOutOfRange = (time: TimeValue, minTime?: TimeValue, maxTime?: TimeValue) => {
  const seconds = toMinuteSeconds(time);
  if (minTime !== undefined && seconds < toMinuteSeconds(minTime)) return true;
  if (maxTime !== undefined && seconds > toMinuteSeconds(maxTime)) return true;
  return false;
};

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 시각 입력, 시간 선택 버튼을 렌더한다.
 * 시간 선택에서 고른 시각은 입력값에 반영하고, 입력한 시각은 시간 선택에서 선택된 상태로 보여 준다.
 * 보이는 input은 "오후 09:30" 같은 표시 문자열만 갖고, `name`을 지정하면 "HH:mm" 값을 hidden input으로 전송한다.
 * controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`) 방식을 지원한다.
 * `onChange`는 확정값 변경만 알린다. `onBlur`는 입력칸, 시간 선택 버튼, 시간 선택을 하나의 필드로 보고 필드를 벗어날 때 한 번 부른다.
 * 시각이 만들어지지 않은 입력(incomplete, invalid)은 필드를 벗어나거나 폼을 제출할 때 루트에 알려 TimeField가 문구를 보여 준다.
 * 부분 입력까지 지우려면 폼을 초기화하거나 Input을 다시 마운트한다.
 */
export const TimeFieldInput = forwardRef<HTMLInputElement, TimeFieldInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onInputStateChange,
      suffix = null,
      withPicker = true,
      withActionBar = false,
      minuteStep = 5,
      minTime,
      maxTime,
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
    } = useFieldControl("TimeField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });
    const { onInputErrorVisibleChange } = useTimeFieldContext("TimeField.Input");

    const defaultValueRef = useRef(defaultValue ?? "");
    const warnedExternalValuesRef = useRef(new Set<string>());
    const inputRef = useRef<HTMLInputElement>(null);
    const fieldContentRef = useRef<HTMLDivElement>(null);
    const pickerContentRef = useRef<HTMLDivElement>(null);
    const pickerTriggerRef = useRef<HTMLButtonElement>(null);
    const fieldExitCheckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isPickerOpenedFromInputRef = useRef(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    // 필드 안(입력칸, 시간 선택 버튼, 시간 선택)에 포커스가 있는 동안 true다. 벗어날 때 onBlur를 한 번만 부르는 데 쓴다.
    const isFocusWithinFieldRef = useRef(false);
    const onBlurRef = useRef(onBlurFromProps);
    onBlurRef.current = onBlurFromProps;
    const closeReasonRef = useRef<"select" | "outside" | null>(null);
    const onInputStateChangeRef = useRef(onInputStateChange);
    onInputStateChangeRef.current = onInputStateChange;

    const isEditable = !isDisabled && !isReadOnly;

    useEffect(() => {
      if (!isEditable || !withPicker) setIsPickerOpen(false);
    }, [isEditable, withPicker]);

    const [timeValue, setTimeValue] = useControllableState<string>(
      value,
      defaultValue ?? "",
      onChange,
    );

    useEffect(() => {
      if (process.env.NODE_ENV !== "development") return;

      // 내부 draft와 마운트 이후의 defaultValue 변경은 경고 대상이 아니다.
      const externalValue = value ?? defaultValueRef.current;
      if (externalValue === "" || normalizeTimeValue(externalValue) !== "") return;

      const propName = value !== undefined ? "value" : "defaultValue";
      const warningKey = `${propName}:${externalValue}`;
      if (warnedExternalValuesRef.current.has(warningKey)) return;
      warnedExternalValuesRef.current.add(warningKey);

      console.warn(
        `TimeField.Input의 ${propName}를 해석할 수 없습니다. 유효한 HH:mm 형식의 시각 또는 빈 문자열을 전달해주세요. 해석할 수 없는 값은 빈 입력과 빈 제출값으로 처리합니다.`,
      );
    }, [value]);

    const rules = useMemo(() => createTimeSegmentRules(minuteStep), [minuteStep]);

    // 완성된 시각의 오류를 한 곳에서 판정하고, 확정 허용 여부도 같은 결과에서 파생한다.
    const getTimeValueError = useCallback(
      (nextValue: string): TimeFieldInputError | null => {
        const time = valueToTime(nextValue);
        if (time === null) return "invalid";
        if (isTimeOutOfRange(time, minTime, maxTime)) return "outOfRange";
        if (time.minute % minuteStep !== 0) return "stepMismatch";
        return null;
      },
      [minTime, maxTime, minuteStep],
    );

    const isValueAllowed = useCallback(
      (nextValue: string): boolean => getTimeValueError(nextValue) === null,
      [getTimeValueError],
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
      rules,
      value: timeValue,
      onValueChange: setTimeValue,
      isEditable,
      isValueAllowed,
    });

    let error: TimeFieldInputError | null = null;
    if (inputStatus === "empty") error = isRequired ? "required" : null;
    else if (inputStatus === "incomplete") error = "incomplete";
    else if (inputStatus === "invalid") error = "invalid";
    else error = getTimeValueError(draftValue);

    const currentValue = error === null ? draftValue : "";
    const inputState = useMemo<TimeFieldInputState>(
      () => ({ inputValue, value: currentValue, error }),
      [inputValue, currentValue, error],
    );

    useLayoutEffect(() => {
      onInputStateChangeRef.current?.(inputState);
    }, [inputState]);

    // 시각이 만들어지지 않은 입력은 필드를 벗어나거나 폼을 제출할 때 보여 주고, 고치면 바로 숨긴다.
    // 숨긴 뒤 다시 틀리면 다시 벗어나거나 제출할 때까지 기다린다.
    const isInputError = error === "incomplete" || error === "invalid";
    const isInputErrorRef = useRef(isInputError);
    isInputErrorRef.current = isInputError;
    const [isInputErrorRevealed, setIsInputErrorRevealed] = useState(false);
    const isInputErrorVisible = isInputErrorRevealed && isInputError;

    // useEffect에서 숨기면 그 갱신이 다음 키 입력보다 늦게 처리될 수 있어, 다시 틀린 입력에 문구가 바로 보인다.
    useLayoutEffect(() => {
      if (!isInputError) setIsInputErrorRevealed(false);
    }, [isInputError]);

    useLayoutEffect(() => {
      onInputErrorVisibleChange(isInputErrorVisible);
      return () => onInputErrorVisibleChange(false);
    }, [isInputErrorVisible, onInputErrorVisibleChange]);

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
        if (isFocusWithinField || !isFocusWithinFieldRef.current) return;

        isFocusWithinFieldRef.current = false;
        if (isInputErrorRef.current) setIsInputErrorRevealed(true);
        onBlurRef.current?.();
      }, 0);
    };

    const handleFieldFocus = () => {
      isFocusWithinFieldRef.current = true;
    };

    const handleFieldBlur = (event: FocusEvent<HTMLElement>) => {
      scheduleFieldExitCheck(event.currentTarget.ownerDocument);
    };

    // 시간 선택이 닫힐 때는 포커스가 잠시 body에 있다가 버튼이나 입력으로 돌아온다.
    // 이 blur에서 판단하면 돌아오기 전의 body를 보고 필드 이탈로 오인하므로, 닫힌 뒤 handlePickerCloseAutoFocus에서 판단한다.
    const handlePickerBlur = (event: FocusEvent<HTMLElement>) => {
      if (event.relatedTarget === null) return;
      handleFieldBlur(event);
    };

    // ↓는 값을 줄이는 데 쓰므로 시간 선택은 Alt와 함께 눌렀을 때 연다.
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
      // Portal의 시간 선택에는 부모 fieldset의 native 비활성이 전파되지 않는다.
      if (input === null || input.matches(":disabled")) {
        setIsPickerOpen(false);
        return;
      }

      resetSegments(nextValue);
      // 적용 버튼이 없으면 열마다 바로 반영되므로 오전/오후, 시, 분을 이어서 고를 수 있게 열어 둔다.
      if (!withActionBar) return;

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

    const resetStateRef = useRef({ resetSegments });
    resetStateRef.current = { resetSegments };

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
        }, 0);
        resetTimers.add(timeoutId);
      };

      // 입력칸에서 Enter로 제출하면 필드를 벗어나지 않으므로 제출 시점에도 입력 오류를 보여 준다.
      const handleSubmit = () => {
        if (isInputErrorRef.current) setIsInputErrorRevealed(true);
      };

      formElement.addEventListener("reset", handleReset);
      formElement.addEventListener("submit", handleSubmit);
      return () => {
        formElement.removeEventListener("reset", handleReset);
        formElement.removeEventListener("submit", handleSubmit);
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
            onFocus={handleFieldFocus}
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
              placeholder={TIME_PLACEHOLDER}
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
              // 필드 이탈 판단은 FieldContent로 버블링되는 blur에서 한다.
              onBlur={handlers.onBlur}
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
                  condensed
                  icon='clock-3'
                  aria-label='시간 선택'
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
          <TimeFieldPicker
            contentRef={pickerContentRef}
            onBlur={handlePickerBlur}
            value={currentValue}
            onSelect={handlePickerSelect}
            onCloseAutoFocus={handlePickerCloseAutoFocus}
            onInteractOutside={() => {
              closeReasonRef.current = "outside";
            }}
            withActionBar={withActionBar}
            minuteStep={minuteStep}
            minTime={minTime}
            maxTime={maxTime}
          />
        )}
      </Popover.Root>
    );
  },
);

TimeFieldInput.displayName = "TimeField.Input";
