import type { RadioSize, RadioVariant } from "./radio.types";

import { createOptionalCtxProvider } from "@/hooks/createCtxProvider";

export interface RadioConfigContextValue {
  size: RadioSize;
  variant: RadioVariant;
  disabled: boolean;
  stretched: boolean;
}

export const [RadioConfigProvider, useRadioConfig] =
  createOptionalCtxProvider<RadioConfigContextValue>("RadioConfig");

export interface RadioItemContextValue {
  labelId: string;
  helperId: string;
  hasHelper: boolean;
  onHelperMountChange: (mounted: boolean) => void;
}

export const [RadioItemProvider, useRadioItem] =
  createOptionalCtxProvider<RadioItemContextValue>("RadioItem");
