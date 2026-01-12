import { createContext, useContext } from "react";

import type { RadioSize } from "./radio.types";

interface RadioContextValue {
  radioSize?: RadioSize;
  isDisabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export const RadioProvider = RadioContext.Provider;

export const useRadioContext = () => {
  const context = useContext(RadioContext);

  return context;
};
