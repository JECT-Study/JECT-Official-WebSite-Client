import { createContext, useContext } from "react";
import type { RadioGroupState } from "react-stately";

import type { RadioSize, RadioVariant } from "./radio.types";

export interface RadioConfigContextValue {
  size: RadioSize;
  variant: RadioVariant;
  disabled: boolean;
  state?: RadioGroupState;
}

const RadioConfigContext = createContext<RadioConfigContextValue | null>(null);

export const RadioConfigProvider = RadioConfigContext.Provider;

export const useRadioConfig = () => useContext(RadioConfigContext);

export interface RadioItemContextValue {
  labelId: string;
  helperId: string;
  hasHelper: boolean;
  onHelperMountChange: (mounted: boolean) => void;
}

const RadioItemContext = createContext<RadioItemContextValue | null>(null);

export const RadioItemProvider = RadioItemContext.Provider;

export const useRadioItem = () => useContext(RadioItemContext);
