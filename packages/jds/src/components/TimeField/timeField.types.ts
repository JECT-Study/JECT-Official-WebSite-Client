import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps, FieldStatus } from "../Field";
import type { TimePickerProps } from "../TimePicker";

export interface TimeFieldProps extends Omit<FieldProps, "status"> {
  /**
   * @description 유효성 검사 결과. Time field는 기본과 오류만 사용합니다.
   * @default "default"
   */
  status?: Exclude<FieldStatus, "success">;
}

/**
 * TimeField가 판단하는 오류 종류.
 * incomplete와 invalid는 시각이 만들어지지 않은 입력이다. 필드를 벗어나거나 폼을 제출하면 TimeField가 사용처의 status와 Helper 문구 대신 "유효한 시각을 입력해 주세요."와 error 상태를 보여 준다.
 * 폼 값은 빈 문자열이 되므로 제출을 막으려면 사용처가 error를 확인해야 한다.
 * required, outOfRange, stepMismatch는 required, minTime, maxTime, minuteStep으로 사용처가 정한 규칙의 오류다. 문구와 보여줄 시점은 사용처가 정한다.
 */
export type TimeFieldInputError =
  | "required"
  | "incomplete"
  | "invalid"
  | "outOfRange"
  | "stepMismatch";

/** 현재 편집 내용과 유효성. value는 현재 입력이 유효할 때만 시각을 갖는다. */
export interface TimeFieldInputState {
  inputValue: string;
  value: string;
  error: TimeFieldInputError | null;
}

interface TimeFieldInputBaseProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  | "id"
  | "type"
  | "min"
  | "max"
  | "step"
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
  /** 필수 입력 여부. 비어 있으면 error가 "required"가 된다. */
  required?: boolean;
  /** 부분 입력, 시각 제한, 필수 빈 값을 포함한 현재 상태를 마운트와 변경 시 알린다. */
  onInputStateChange?: (state: TimeFieldInputState) => void;
  /**
   * 입력칸, 시간 선택 버튼, 시간 선택을 포함한 필드 전체에서 포커스가 벗어날 때 한 번 호출한다.
   * 필드 안에서 포커스가 옮겨 갈 때는 호출하지 않는다.
   * 부분 입력을 확정하고 onChange를 부른 뒤에 호출하므로 React Hook Form의 field.onBlur를 그대로 연결할 수 있다.
   */
  onBlur?: () => void;
  /** 시간 선택 버튼 오른쪽에 배치되는 부가 요소 (예: Kbd) */
  suffix?: ReactNode;
  /**
   * @description 시간 선택 버튼 표시 여부. 끄면 직접 입력만 할 수 있다.
   * @default true
   */
  withPicker?: boolean;
  /**
   * @description 시간 선택에 적용 버튼을 표시한다. 켜면 적용을 눌러야 선택이 확정되고 시간 선택이 닫힌다.
   * @default false
   */
  withActionBar?: TimePickerProps["withActionBar"];
  /**
   * @description 분 목록과 위아래 방향키의 간격. 간격에 맞지 않는 분을 직접 입력하면 오류다.
   * @default 5
   */
  minuteStep?: TimePickerProps["minuteStep"];
  /** 직접 입력과 시간 선택에 적용되는 가장 이른 시각. 초는 무시한다. */
  minTime?: TimePickerProps["minTime"];
  /** 직접 입력과 시간 선택에 적용되는 가장 늦은 시각. 초는 무시한다. */
  maxTime?: TimePickerProps["maxTime"];
}

interface TimeFieldInputControlledProps {
  /**
   * 마지막으로 확정된 "HH:mm" 값. 완성된 시각이 없으면 빈 문자열이다.
   * 부분 입력은 내부에서 유지하므로 같은 빈 문자열을 다시 넘겨도 지워지지 않는다.
   * 부분 입력까지 초기화하려면 form.reset() 또는 Input의 key 변경을 사용한다.
   */
  value: string;
  defaultValue?: never;
  /** 확정값이 바뀔 때 호출한다. 숫자마다 호출되지 않으며, 기존 시각 재입력 중에는 이전 확정값을 유지한다. */
  onChange: (value: string) => void;
}

interface TimeFieldInputUncontrolledProps {
  value?: never;
  /** 최초 마운트의 "HH:mm" 초기값이자 폼 reset 기준. 이후 prop 변경은 반영하지 않는다. */
  defaultValue?: string;
  /** 확정값이 바뀔 때 호출한다. 숫자마다 호출되지 않으며, 기존 시각 재입력 중에는 이전 확정값을 유지한다. */
  onChange?: (value: string) => void;
}

export type TimeFieldInputProps = TimeFieldInputBaseProps &
  (TimeFieldInputControlledProps | TimeFieldInputUncontrolledProps);
