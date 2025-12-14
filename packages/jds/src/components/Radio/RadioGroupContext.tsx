import { createContext, useContext } from "react";

interface RadioGroupContextValue {
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
