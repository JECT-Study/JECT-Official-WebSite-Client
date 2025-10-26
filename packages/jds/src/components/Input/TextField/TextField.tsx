import { forwardRef, useId } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputWrapper,
  StyledInput,
  StyledHelperText,
  StyledInputColumn,
} from './textField.styles';
import type { TextFieldProps } from './textField.types';
import { Icon } from '../../Icon';

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
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='sm'
              weight='normal'
              $disabled={disabled}
              $readOnly={readOnly}
              $layout={layout}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='2xs' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
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
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

TextField.displayName = 'TextField';
