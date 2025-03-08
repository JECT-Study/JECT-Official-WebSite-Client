import clsx from 'clsx';
import { forwardRef } from 'react';

import { CheckBoxProps } from './CheckBox.types';
import { CheckBoxIcon } from './CheckBoxIcon';

import Label from '@/components/common/label/Label';

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(function CheckBox(
  { id, isIndeterminate, checked, disabled, className, labelText, ...restProps },
  ref,
) {
  const baseStyles = 'group radius-4xs inline-flex items-center justify-center border';

  const enabledStyles =
    checked || isIndeterminate
      ? 'bg-feedback-information-dark border-border-trans-normal-dark'
      : 'bg-object-static-inverse-hero-dark border-border-normal-dark';

  const disabledStyles =
    checked || isIndeterminate
      ? 'bg-feedback-trans-information-dark border-border-trans-assistive-dark'
      : 'bg-object-static-inverse-disabled-dark border-border-trans-assistive-dark';

  return (
    <div className={clsx('gap-2xs inline-flex items-center', className)}>
      <div
        className={clsx(
          baseStyles,
          disabled ? disabledStyles : enabledStyles,
          'transition-faster-fluent-hover transition-faster-fluent-active transition-faster-fluent-focus',
        )}
      >
        <div className='relative inline-flex items-center'>
          <CheckBoxIcon isIndeterminate={isIndeterminate} disabled={disabled} checked={checked} />
          <input
            id={id}
            ref={ref}
            className={clsx(
              'absolute top-0 left-0 h-full w-full opacity-0',
              !disabled && 'cursor-pointer',
            )}
            type='checkbox'
            checked={checked}
            disabled={disabled}
            {...restProps}
          />
        </div>
      </div>
      {!!labelText && (
        <div className={clsx(!!id && !disabled && 'cursor-pointer')}>
          <Label htmlFor={id} hierarchy='weak' textColor='text-object-neutral-dark' weight='normal'>
            {labelText}
          </Label>
        </div>
      )}
    </div>
  );
});

export default CheckBox;
