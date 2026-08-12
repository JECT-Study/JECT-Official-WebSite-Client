import type { FieldStatus } from "./field.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface FieldContextValue {
  fieldId: string;
  labelId: string;
  /** Field.Label이 실제로 렌더되고 있는지 여부 */
  hasLabel: boolean;
  /** Field.Label이 mount/unmount될 때 호출된다. */
  onLabelMountChange: (mounted: boolean) => void;
  helperTextId: string;
  /** Field.HelperText가 실제로 렌더되고 있는지 여부 */
  hasHelperText: boolean;
  /** Field.HelperText가 mount/unmount될 때 호출된다. */
  onHelperTextMountChange: (mounted: boolean) => void;
  status: FieldStatus;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");
