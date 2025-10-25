import { Icon } from 'components';
import type { TextFieldProps } from 'components';
import { forwardRef, useId } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputWrapper,
  StyledInput,
  StyledHelperText,
} from './textField.styles';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      disabled = false,
      readOnly = false,
      label,
      labelIcon,
      helperText,
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();

    return (
      <StyledFieldContainer $layout={layout}>
        {label && (
          <StyledLabelContainer>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='sm'
              weight='normal'
              $disabled={disabled}
              $readOnly={readOnly}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='sm' />}
          </StyledLabelContainer>
        )}

        <StyledInputWrapper
          $style={style}
          $validation={validation}
          $disabled={disabled}
          $readOnly={readOnly}
        >
          <StyledInput
            ref={ref}
            id={inputId}
            $disabled={disabled}
            $readOnly={readOnly}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            {...restProps}
          />
        </StyledInputWrapper>

        {helperText && (
          <StyledHelperText
            as='span'
            size='sm'
            weight='normal'
            $validation={validation}
            $disabled={disabled}
            $readOnly={readOnly}
          >
            {helperText}
          </StyledHelperText>
        )}
      </StyledFieldContainer>
    );
  },
);

TextField.displayName = 'TextField';
