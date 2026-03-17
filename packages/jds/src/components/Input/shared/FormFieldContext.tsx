import { createContext, useContext, useId, type ReactNode } from "react";

import type { InputStyle, InputValidation, InputInteraction } from "../input.types";
import { getInteractionStates } from "../input.types";

export interface FormFieldContextValue {
  fieldId: string;
  style: InputStyle;
  validation: InputValidation;
  interaction: InputInteraction;
  isDisabled: boolean;
  isReadOnly: boolean;
  isInteractive: boolean;
  label?: ReactNode;
  isWithInfoIcon?: boolean;
  helperText?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const useFormField = (): FormFieldContextValue => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within FormFieldProvider");
  }
  return context;
};

export interface FormFieldProviderProps {
  style?: InputStyle;
  validation?: InputValidation;
  interaction?: InputInteraction;
  label?: ReactNode;
  isWithInfoIcon?: boolean;
  helperText?: string;
  children: ReactNode;
}

export const FormFieldProvider = ({
  style = "outlined",
  validation = "none",
  interaction = "enabled",
  label,
  isWithInfoIcon,
  helperText,
  children,
}: FormFieldProviderProps) => {
  const fieldId = useId();
  const { isDisabled, isReadOnly, isInteractive } = getInteractionStates(interaction);

  const value: FormFieldContextValue = {
    fieldId,
    style,
    validation,
    interaction,
    isDisabled,
    isReadOnly,
    isInteractive,
    label,
    isWithInfoIcon,
    helperText,
  };

  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>;
};
