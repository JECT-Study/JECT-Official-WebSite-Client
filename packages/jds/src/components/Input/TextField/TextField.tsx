import { forwardRef, type ChangeEvent, type ComponentPropsWithoutRef } from 'react';

import { StyledInputWrapper, StyledInput } from './textField.styles';
import type { TextFieldProps } from './textField.types';
import { FormField } from '../shared/FormField';
import { useFormField } from '../shared/FormFieldContext';

type TextFieldInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'style' | 'disabled' | 'readOnly'
> & {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ value, onChange, ...restProps }, ref) => {
    const { fieldId, style, validation, isDisabled, isReadOnly } = useFormField();

    return (
      <StyledInputWrapper
        $style={style}
        $validation={validation}
        $disabled={isDisabled}
        $readOnly={isReadOnly}
      >
        <StyledInput
          ref={ref}
          id={fieldId}
          $disabled={isDisabled}
          $readOnly={isReadOnly}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          {...restProps}
        />
      </StyledInputWrapper>
    );
  },
);

TextFieldInput.displayName = 'TextFieldInput';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      interaction = 'enabled',
      label,
      labelIcon,
      helperText,
      ...restProps
    },
    ref,
  ) => {
    return (
      <FormField
        style={style}
        layout={layout}
        validation={validation}
        interaction={interaction}
        label={label}
        labelIcon={labelIcon}
        helperText={helperText}
      >
        <TextFieldInput ref={ref} {...restProps} />
      </FormField>
    );
  },
);

TextField.displayName = 'TextField';
