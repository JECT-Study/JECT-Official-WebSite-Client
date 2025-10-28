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
    const { isDisabled, isReadOnly, isInteractive } = getInteractionStates(interaction);
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
          <StyledSelectWrapper
            ref={ref}
            id={fieldId}
            $style={style}
            $validation={validation}
            $disabled={isDisabled}
            $readOnly={isReadOnly}
            onClick={handleClick}
            role='button'
            tabIndex={isDisabled || isReadOnly ? -1 : 0}
            aria-disabled={isDisabled}
            aria-readonly={isReadOnly}
            aria-expanded={isOpen}
            {...restProps}
          >
            <StyledSelectValue
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              $isPlaceholder={isPlaceholder}
            >
              {displayValue}
            </StyledSelectValue>

            <StyledSelectIconWrapper $disabled={isDisabled} $readOnly={isReadOnly}>
              <Icon name={dropdownIcon} size='md' />
            </StyledSelectIconWrapper>
          </StyledSelectWrapper>

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
        {children}
      </StyledFieldContainer>
    );
  },
);

SelectField.displayName = 'SelectField';
