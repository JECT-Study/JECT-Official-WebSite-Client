import type { IconSize } from "components";
import { pxToRem, type LabelSize } from "utils";

import type { CheckboxSize } from "./checkbox.types";

export const checkboxSizeMap: Record<
  CheckboxSize,
  { visual: string; icon: IconSize; label: LabelSize; helper: LabelSize }
> = {
  lg: { visual: pxToRem(20), icon: "md", label: "lg", helper: "sm" },
  md: { visual: pxToRem(18), icon: "sm", label: "md", helper: "sm" },
  sm: { visual: pxToRem(16), icon: "xs", label: "sm", helper: "xs" },
  xs: { visual: pxToRem(14), icon: "2xs", label: "xs", helper: "xs" },
};
