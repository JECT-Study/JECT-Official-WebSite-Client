import { Icon } from 'components';
import { forwardRef, useId } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputWrapper,
  StyledInput,
  StyledHelperText,
  StyledInputRow,
} from './textField.styles';
import type { TextFieldButtonProps } from './textField.types';

export const TextFieldButton = forwardRef<HTMLInputElement, TextFieldButtonProps>(
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
      button,
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
              size='md'
              weight='bold'
              $disabled={disabled}
              $readOnly={readOnly}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='sm' />}
          </StyledLabelContainer>
        )}

        <StyledInputRow>
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
          {button}
        </StyledInputRow>

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

TextFieldButton.displayName = 'TextField.Button';
