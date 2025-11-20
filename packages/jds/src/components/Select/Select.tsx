import type { SelectProps, SelectContextType } from 'components';
import { Label } from 'components';
import { createContext, forwardRef, useContext } from 'react';

import {
  StyledSelectContainer,
  StyledSelectLabelWrapper,
  StyledSelectItemsWrapper,
} from './select.styles';

export const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select 자식 컴포넌트는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.');
  }
  return context;
};

const createCheckboxHandlers = (props: Extract<SelectProps, { variant: 'checkbox' }>) => {
  const { value, onChange: onChangeHandler } = props;

  return {
    value,
    onChange: (itemValue: string) => {
      const newValue = value.includes(itemValue)
        ? value.filter(v => v !== itemValue)
        : [...value, itemValue];
      onChangeHandler(newValue);
    },
    isSelected: (itemValue: string) => value.includes(itemValue),
    role: 'listbox' as const,
    isMultiselectable: true as const,
  };
};

const createListHandlers = (props: Extract<SelectProps, { variant?: 'list' }>) => {
  const { value, onChange } = props;

  return {
    value,
    onChange,
    isSelected: (itemValue: string) => value === itemValue,
    role: 'listbox' as const,
    isMultiselectable: undefined,
  };
};

const createRadioHandlers = (props: Extract<SelectProps, { variant: 'radio' }>) => {
  const { value, onChange } = props;

  return {
    value,
    onChange,
    isSelected: (itemValue: string) => value === itemValue,
    role: 'radiogroup' as const,
    isMultiselectable: undefined,
  };
};

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const { size = 'md', label, children } = props;
  const variant = props.variant ?? 'list';

  const getVariantHandlers = () => {
    switch (variant) {
      case 'checkbox':
        return createCheckboxHandlers(props as Extract<SelectProps, { variant: 'checkbox' }>);
      case 'radio':
        return createRadioHandlers(props as Extract<SelectProps, { variant: 'radio' }>);
      case 'list':
      default:
        return createListHandlers(props as Extract<SelectProps, { variant?: 'list' }>);
    }
  };

  const { value, onChange, isSelected, role, isMultiselectable } = getVariantHandlers();

  const contextValue: SelectContextType = {
    value,
    variant,
    size,
    onChange,
    isSelected,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <StyledSelectContainer>
        {label && (
          <StyledSelectLabelWrapper>
            <Label as='span' size='sm' weight='normal' color='inherit'>
              {label}
            </Label>
          </StyledSelectLabelWrapper>
        )}
        <StyledSelectItemsWrapper ref={ref} role={role} aria-multiselectable={isMultiselectable}>
          {children}
        </StyledSelectItemsWrapper>
      </StyledSelectContainer>
    </SelectContext.Provider>
  );
});

Select.displayName = 'Select';
