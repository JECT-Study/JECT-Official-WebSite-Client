import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { DatePickerProps } from "../DatePicker";
import type { FieldProps } from "../Field";

export type DateFieldProps = FieldProps;

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
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  /**
   * 입력이 포커스를 잃을 때 호출한다. 이 콜백 뒤에 부분 입력을 확정하므로 이전 확정값을 읽을 수 있다.
   * 날짜 검증에는 onChange가 전달하는 확정값을 사용한다.
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
  /** 달력에서 선택할 수 있는 가장 이른 날짜. 직접 입력한 값은 제한하지 않는다. */
  minDate?: DatePickerProps["minDate"];
  /** 달력에서 선택할 수 있는 가장 늦은 날짜. 직접 입력한 값은 제한하지 않는다. */
  maxDate?: DatePickerProps["maxDate"];
  /** 날짜마다 호출되며, true를 반환한 날짜는 달력에서 선택할 수 없다. */
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
