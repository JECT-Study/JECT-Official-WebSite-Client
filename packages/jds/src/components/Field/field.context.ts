import type { FieldCounterState, FieldStatus } from "./field.types";

import { createCtxProvider, createOptionalCtxProvider } from "@/hooks/createCtxProvider";

export interface FieldContextValue {
  fieldId: string;
  labelId: string;
  /** Field.Label이 실제로 렌더되고 있는지 여부 */
  hasLabel: boolean;
  /** Field.Label이 mount/unmount될 때 호출된다. */
  onLabelMountChange: (mounted: boolean) => void;
  helperId: string;
  /** Field.Helper가 실제로 렌더되고 있는지 여부 */
  hasHelper: boolean;
  /** Field.Helper가 mount/unmount될 때 호출된다. */
  onHelperMountChange: (mounted: boolean) => void;
  counterId: string;
  /** 컨트롤이 현재 개수와 최대 개수를 보고할 때 호출된다. */
  onCounterChange: (counter: FieldCounterState | null) => void;
  /** Counter 자리에 요소가 렌더되고 있는지 여부 */
  hasCounter: boolean;
  /** Counter 자리를 차지한 요소의 id. 비어 있으면 null */
  counterOwnerId: string | null;
  /**
   * Counter 자리에 렌더할 요소가 등록할 때 호출되며, 해제 함수를 반환한다.
   * Counter 자리에는 하나만 렌더되므로 먼저 등록한 요소가 자리를 차지한다.
   */
  onCounterRegister: (registrationId: string) => () => void;
  /** 컨트롤이 해석해 보고한 required. Field.Label이 required mark 렌더에 사용한다. */
  isControlRequired: boolean;
  onControlRequiredChange: (required: boolean) => void;
  status: FieldStatus;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");

// 카운터 값은 입력마다 바뀌므로 Field 컨텍스트에서 분리한다.
export const [FieldCounterValueProvider, useFieldCounterValue] =
  createOptionalCtxProvider<FieldCounterState>("FieldCounterValue");
