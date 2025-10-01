import { ChangeEvent, forwardRef } from 'react';
import { RadioInput, RadioLabel, Visual } from './Radio.style';

export type RadioSize = 'lg' | 'md' | 'sm' | 'xs';

export interface RadioProps {
  isChecked: boolean;
  isDisabled?: boolean;
  size?: RadioSize;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ size = 'md', name, value, isChecked, onChange, isDisabled = false }, ref) => {
    return (
      <RadioLabel size={size}>
        <RadioInput
          ref={ref}
          type='radio'
          name={name}
          value={value}
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <Visual className='visual' aria-hidden='true' size={size} />
      </RadioLabel>
    );
  },
);

Radio.displayName = 'Radio';
