import type { ReactNode } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledHelperText,
} from './field.styles';
import { FormFieldProvider, useFormField } from './FormFieldContext';
import type { FormFieldProviderProps } from './FormFieldContext';
import { Icon } from '../../Icon';

interface FormFieldLabelProps {
  children?: ReactNode;
}

export const FormFieldLabel = ({ children }: FormFieldLabelProps) => {
  const { fieldId, label, labelIcon, layout, isDisabled, isReadOnly } = useFormField();

  if (!label && !children) {
    return null;
  }

  return (
    <StyledLabelContainer $layout={layout}>
      <StyledFieldLabel
        as='label'
        htmlFor={fieldId}
        size='sm'
        weight='normal'
        $disabled={isDisabled}
        $readOnly={isReadOnly}
        $layout={layout}
      >
        {children || label}
      </StyledFieldLabel>
      {labelIcon && <Icon name={labelIcon} size='2xs' />}
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
      as='span'
      size='sm'
      weight='normal'
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
  return (
    <StyledInputColumn>
      {children}
      <FormFieldHelperText />
    </StyledInputColumn>
  );
};

interface FormFieldProps extends FormFieldProviderProps {
  children: ReactNode;
}

export const FormField = ({
  style,
  layout,
  validation,
  interaction,
  label,
  labelIcon,
  helperText,
  children,
}: FormFieldProps) => {
  return (
    <FormFieldProvider
      style={style}
      layout={layout}
      validation={validation}
      interaction={interaction}
      label={label}
      labelIcon={labelIcon}
      helperText={helperText}
    >
      <StyledFieldContainer $layout={layout || 'vertical'}>
        <FormFieldLabel />
        <FormFieldContent>{children}</FormFieldContent>
      </StyledFieldContainer>
    </FormFieldProvider>
  );
};

FormField.Label = FormFieldLabel;
FormField.Content = FormFieldContent;
FormField.HelperText = FormFieldHelperText;
