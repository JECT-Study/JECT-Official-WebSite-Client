import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react';

import {
  StyledSelectWrapper,
  StyledSelectValue,
  StyledSelectIconWrapper,
} from './selectField.styles';
import type { SelectFieldProps } from './selectField.types';
import { Icon } from '../../Icon';
import { FormField } from '../shared/FormField';
import { useFormField } from '../shared/FormFieldContext';

type SelectFieldInputProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'style' | 'onClick'
> & {
  value?: string;
  placeholder?: string;
  dropdownIcon?: string;
  isOpen?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

const SelectFieldInput = forwardRef<HTMLDivElement, SelectFieldInputProps>(
  (
    {
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
    const { fieldId, style, validation, isDisabled, isReadOnly, isInteractive } = useFormField();
    const isPlaceholder = !value;
    const displayValue = value || placeholder;

    const handleClick = () => {
      if (isInteractive && onClick) {
        onClick();
      }
    };

    return (
      <>
        <StyledSelectWrapper
          ref={ref}
          id={fieldId}
          $style={style}
          $validation={validation}
          $disabled={isDisabled}
          $readOnly={isReadOnly}
          onClick={handleClick}
          role='combobox'
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
        {children}
      </>
    );
  },
);

SelectFieldInput.displayName = 'SelectFieldInput';

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
        <SelectFieldInput ref={ref} {...restProps} />
      </FormField>
    );
  },
);

SelectField.displayName = 'SelectField';
