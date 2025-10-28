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
import { getInteractionStates } from '../input.types';

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
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();
    const { isDisabled, isReadOnly } = getInteractionStates(interaction);

    return (
      <StyledFieldContainer $layout={layout}>
        {label && (
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='sm'
              weight='normal'
              $disabled={isDisabled}
              $readOnly={isReadOnly}
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
            $disabled={isDisabled}
            $readOnly={isReadOnly}
          >
            <StyledInput
              ref={ref}
              id={inputId}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              value={value}
              onChange={onChange}
              disabled={isDisabled}
              readOnly={isReadOnly}
              {...restProps}
            />
          </StyledInputWrapper>

          {helperText && (
            <StyledHelperText
              as='span'
              size='sm'
              weight='normal'
              $validation={validation}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
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
