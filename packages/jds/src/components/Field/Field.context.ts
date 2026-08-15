import type { FieldStatus } from "./field.types";

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
  status: FieldStatus;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");
