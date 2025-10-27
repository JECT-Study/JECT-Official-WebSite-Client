import { forwardRef, useId } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputWrapper,
  StyledInput,
  StyledHelperText,
  StyledInputRow,
  StyledInputColumn,
} from './textField.styles';
import type { TextFieldButtonProps } from './textField.types';
import { Icon } from '../../Icon';

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
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='md'
              weight='bold'
              $disabled={disabled}
              $readOnly={readOnly}
              $layout={layout}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='sm' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledInputRow $style={style} $layout={layout}>
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
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

TextFieldButton.displayName = 'TextField.Button';
