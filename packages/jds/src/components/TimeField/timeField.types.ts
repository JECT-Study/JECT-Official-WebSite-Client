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
  /** 최초 필드 이탈, 적용 버튼 확정, 네이티브 검증 실패 전에는 error가 있어도 표시하지 않는다. */
  isErrorVisible: boolean;
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
  /** 필수 입력 여부. 최초 오류는 숨기며 필드 이탈이나 폼 제출 시 표시한다. */
  required?: boolean;
  /** 부분 입력, 시각 제한, 필수 빈 값을 포함한 현재 상태를 마운트와 변경 시 알린다. */
  onInputStateChange?: (state: TimeFieldInputState) => void;
  /**
   * 입력이 포커스를 잃을 때 호출한다. 이 콜백 뒤에 부분 입력을 확정하므로 이전 확정값을 읽을 수 있다.
   * 현재 입력의 유효성은 onInputStateChange로 확인한다.
   * preventDefault()는 포커스가 이동한 상태에서 내부 blur 처리만 건너뛰게 한다.
   */
  onBlur?: ComponentPropsWithoutRef<"input">["onBlur"];
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
