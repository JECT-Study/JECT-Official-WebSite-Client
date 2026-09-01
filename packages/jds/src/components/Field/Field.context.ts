import type { FieldCounterState, FieldStatus } from "./field.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

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
  /** 컨트롤이 보고한 카운터 값. 보고가 없으면 null이고 Field.Counter는 렌더하지 않는다. */
  counter: FieldCounterState | null;
  /** 컨트롤이 현재 개수와 최대 개수를 보고할 때 호출된다. */
  onCounterChange: (counter: FieldCounterState | null) => void;
  /** Field.Counter가 실제로 렌더되고 있는지 여부 */
  hasCounter: boolean;
  /** Field.Counter가 mount/unmount될 때 호출된다. */
  onCounterMountChange: (mounted: boolean) => void;
  /** 컨트롤이 해석해 보고한 required. Field.Label이 required mark 렌더에 사용한다. */
  isControlRequired: boolean;
  onControlRequiredChange: (required: boolean) => void;
  status: FieldStatus;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");
