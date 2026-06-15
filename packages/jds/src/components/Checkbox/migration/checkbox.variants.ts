import type { IconSize } from "components";
import { pxToRem, type LabelSize } from "utils";

import type { CheckboxSize } from "./checkbox.types";

export const checkboxSizeMap: Record<CheckboxSize, { sizeRem: string; iconSize: IconSize }> = {
  lg: { sizeRem: pxToRem(20), iconSize: "md" },
  md: { sizeRem: pxToRem(18), iconSize: "sm" },
  sm: { sizeRem: pxToRem(16), iconSize: "xs" },
  xs: { sizeRem: pxToRem(14), iconSize: "2xs" },
};

export const checkboxHelperSizeMap: Record<CheckboxSize, LabelSize> = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "xs",
};
