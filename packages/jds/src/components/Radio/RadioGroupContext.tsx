import { createContext, useContext } from "react";

import type { RadioAlign, RadioSize, RadioStyle } from "./radio.types";

interface RadioGroupContextValue {
  radioSize?: RadioSize;
  radioStyle?: RadioStyle;
  radioAlign?: RadioAlign;
  isDisabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroupProvider = RadioGroupContext.Provider;

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  return context;
};
