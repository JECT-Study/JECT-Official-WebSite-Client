import type { ReactNode } from "react";

import {
  StyledLabelContainer,
  StyledLabelIcon,
  StyledFieldLabel,
  StyledInputColumn,
  StyledHelperText,
} from "./field.styles";
import { FormFieldProvider, useFormField } from "./FormFieldContext";
import type { FormFieldProviderProps } from "./FormFieldContext";

import { getLabelClassName } from "@/utils/typography";

interface FormFieldLabelProps {
  children?: ReactNode;
}

export const FormFieldLabel = ({ children }: FormFieldLabelProps) => {
  const { fieldId, label, isWithInfoIcon, isDisabled, isReadOnly } = useFormField();

  if (!label && !children) {
    return null;
  }

  return (
    <StyledLabelContainer>
      <StyledFieldLabel
        htmlFor={fieldId}
        className={getLabelClassName({ size: "sm" })}
        $disabled={isDisabled}
        $readOnly={isReadOnly}
      >
        {children || label}
      </StyledFieldLabel>
      {isWithInfoIcon && <StyledLabelIcon name='information-line' size='2xs' />}
    </StyledLabelContainer>
  );
};

interface FormFieldHelperTextProps {
  children?: ReactNode;
}

export const FormFieldHelperText = ({ children }: FormFieldHelperTextProps) => {
  const { helperText, validation, isDisabled, isReadOnly } = useFormField();

  if (!helperText && !children) {
    return null;
  }

  return (
    <StyledHelperText
      className={getLabelClassName({ size: "sm" })}
      $validation={validation}
      $disabled={isDisabled}
      $readOnly={isReadOnly}
    >
      {children || helperText}
    </StyledHelperText>
  );
};

interface FormFieldContentProps {
  children: ReactNode;
}

export const FormFieldContent = ({ children }: FormFieldContentProps) => {
  return <StyledInputColumn>{children}</StyledInputColumn>;
};

interface FormFieldProps extends Omit<FormFieldProviderProps, "children"> {
  children: ReactNode;
}

export const FormField = ({
  style,
  validation,
  interaction,
  label,
  isWithInfoIcon,
  helperText,
  children,
}: FormFieldProps) => {
  return (
    <FormFieldProvider
      style={style}
      validation={validation}
      interaction={interaction}
      label={label}
      isWithInfoIcon={isWithInfoIcon}
      helperText={helperText}
    >
      {children}
    </FormFieldProvider>
  );
};

FormField.Label = FormFieldLabel;
FormField.Content = FormFieldContent;
FormField.HelperText = FormFieldHelperText;
