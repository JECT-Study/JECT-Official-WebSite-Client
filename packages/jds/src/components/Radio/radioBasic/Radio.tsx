import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { RadioInput, RadioLabel, RadioSpan } from './Radio.style';

export type RadioSize = 'lg' | 'md' | 'sm' | 'xs';

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  radioSize?: RadioSize;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ radioSize = 'md', ...props }, ref) => {
    return (
      <RadioLabel radioSize={radioSize}>
        <RadioInput ref={ref} type='radio' {...props} />
        <RadioSpan className='visual' aria-hidden='true' radioSize={radioSize} />
      </RadioLabel>
    );
  },
);

Radio.displayName = 'Radio';
