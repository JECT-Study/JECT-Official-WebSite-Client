import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { DatePickerProps } from "../DatePicker";
import type { FieldProps } from "../Field";

export type DateFieldProps = FieldProps;

export type DateFieldInputError =
  | "required"
  | "incomplete"
  | "invalid"
  | "outOfRange"
  | "disabledDate";

/** 현재 편집 내용과 유효성. value는 현재 입력이 유효할 때만 날짜를 갖는다. */
export interface DateFieldInputState {
  inputValue: string;
  value: string;
  error: DateFieldInputError | null;
  /** 최초 필수 빈 값은 error가 있어도 오류를 표시하지 않는다. */
  isErrorVisible: boolean;
}

interface DateFieldInputBaseProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  | "id"
  | "type"
  | "min"
  | "max"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onChangeCapture"
  | "onInput"
  | "onInputCapture"
  | "onBeforeInput"
  | "onBeforeInputCapture"
  | "minLength"
  | "maxLength"
  | "onBlur"
  | "prefix"
  | "required"
  | "placeholder"
  | "inputMode"
  | "autoComplete"
  | "autoCorrect"
  | "spellCheck"
> {
  /** 필수 입력 여부. 최초 오류는 숨기며 폼 제출 시 검증한다. */
  required?: boolean;
  /** 부분 입력, 날짜 제한, 필수 빈 값을 포함한 현재 상태를 마운트와 변경 시 알린다. */
  onInputStateChange?: (state: DateFieldInputState) => void;
  /**
   * 입력이 포커스를 잃을 때 호출한다. 이 콜백 뒤에 부분 입력을 확정하므로 이전 확정값을 읽을 수 있다.
   * 현재 입력의 유효성은 onInputStateChange로 확인한다.
   * preventDefault()는 포커스가 이동한 상태에서 내부 blur 처리만 건너뛰게 한다.
   */
  onBlur?: ComponentPropsWithoutRef<"input">["onBlur"];
  /** 달력 버튼 오른쪽에 배치되는 부가 요소 (예: Kbd) */
  suffix?: ReactNode;
  /**
   * @description 달력 버튼 표시 여부. 끄면 직접 입력만 할 수 있다.
   * @default true
   */
  withPicker?: boolean;
  /**
   * @description 달력에 오늘, 지우기, 적용 버튼을 표시한다. 켜면 적용을 눌러야 달력 선택이 확정된다.
   * @default false
   */
  withActionBar?: DatePickerProps["withActionBar"];
  /** 직접 입력과 달력 선택에 적용되는 가장 이른 날짜. */
  minDate?: DatePickerProps["minDate"];
  /** 직접 입력과 달력 선택에 적용되는 가장 늦은 날짜. */
  maxDate?: DatePickerProps["maxDate"];
  /** true를 반환한 날짜는 직접 입력 시 오류이며 달력에서도 선택할 수 없다. */
  isDateDisabled?: DatePickerProps["isDateDisabled"];
}

interface DateFieldInputControlledProps {
  /**
   * 마지막으로 확정된 "YYYY-MM-DD" 값. 완성된 날짜가 없으면 빈 문자열이다.
   * 부분 입력은 내부에서 유지하므로 같은 빈 문자열을 다시 넘겨도 지워지지 않는다.
   * 부분 입력까지 초기화하려면 form.reset() 또는 Input의 key 변경을 사용한다.
   */
  value: string;
  defaultValue?: never;
  /** 확정값이 바뀔 때 호출한다. 숫자마다 호출되지 않으며, 기존 날짜 재입력 중에는 이전 확정값을 유지한다. */
  onChange: (value: string) => void;
}

interface DateFieldInputUncontrolledProps {
  value?: never;
  /** 최초 마운트의 "YYYY-MM-DD" 초기값이자 폼 reset 기준. 이후 prop 변경은 반영하지 않는다. */
  defaultValue?: string;
  /** 확정값이 바뀔 때 호출한다. 숫자마다 호출되지 않으며, 기존 날짜 재입력 중에는 이전 확정값을 유지한다. */
  onChange?: (value: string) => void;
}

export type DateFieldInputProps = DateFieldInputBaseProps &
  (DateFieldInputControlledProps | DateFieldInputUncontrolledProps);
