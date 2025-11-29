import { createContext, useContext, useId, type ReactNode } from "react";

import type { IconName } from "../../Icon/Icon.types";
import type { InputStyle, InputLayout, InputValidation, InputInteraction } from "../input.types";
import { getInteractionStates } from "../input.types";

export interface FormFieldContextValue {
  fieldId: string;
  style: InputStyle;
  layout: InputLayout;
  validation: InputValidation;
  interaction: InputInteraction;
  isDisabled: boolean;
  isReadOnly: boolean;
  isInteractive: boolean;
  label?: string;
  labelIcon?: IconName;
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
  layout?: InputLayout;
  validation?: InputValidation;
  interaction?: InputInteraction;
  label?: string;
  labelIcon?: IconName;
  helperText?: string;
  children: ReactNode;
}

export const FormFieldProvider = ({
  style = "outlined",
  layout = "vertical",
  validation = "none",
  interaction = "enabled",
  label,
  labelIcon,
  helperText,
  children,
}: FormFieldProviderProps) => {
  const fieldId = useId();
  const { isDisabled, isReadOnly, isInteractive } = getInteractionStates(interaction);

  const value: FormFieldContextValue = {
    fieldId,
    style,
    layout,
    validation,
    interaction,
    isDisabled,
    isReadOnly,
    isInteractive,
    label,
    labelIcon,
    helperText,
  };

  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>;
};
