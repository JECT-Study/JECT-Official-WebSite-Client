import { forwardRef, useId } from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledHelperText,
  StyledSelectWrapper,
  StyledSelectValue,
  StyledSelectIconWrapper,
} from './selectField.styles';
import type { SelectFieldProps } from './selectField.types';
import { Icon } from '../../Icon';
import { getInteractionStates } from '../input.types';

export const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
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
      placeholder = '플레이스 홀더 텍스트',
      dropdownIcon = 'arrow-down-s-fill',
      isOpen = false,
      onClick,
      children,
      ...restProps
    },
    ref,
  ) => {
    const fieldId = useId();
    const { disabled, readOnly, isInteractive } = getInteractionStates(interaction);
    const isPlaceholder = !value;
    const displayValue = value || placeholder;

    const handleClick = () => {
      if (isInteractive && onClick) {
        onClick();
      }
    };

    return (
      <StyledFieldContainer $layout={layout}>
        {label && (
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={fieldId}
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
          <StyledSelectWrapper
            ref={ref}
            id={fieldId}
            $style={style}
            $validation={validation}
            $disabled={disabled}
            $readOnly={readOnly}
            onClick={handleClick}
            role='button'
            tabIndex={disabled || readOnly ? -1 : 0}
            aria-disabled={disabled}
            aria-readonly={readOnly}
            aria-expanded={isOpen}
            {...restProps}
          >
            <StyledSelectValue
              $disabled={disabled}
              $readOnly={readOnly}
              $isPlaceholder={isPlaceholder}
            >
              {displayValue}
            </StyledSelectValue>

            <StyledSelectIconWrapper $disabled={disabled} $isOpen={isOpen}>
              <Icon name={dropdownIcon} size='md' />
            </StyledSelectIconWrapper>
          </StyledSelectWrapper>

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
        {children}
      </StyledFieldContainer>
    );
  },
);

SelectField.displayName = 'SelectField';
