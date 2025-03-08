import clsx from 'clsx';
import { forwardRef } from 'react';
import type { MouseEvent } from 'react';

import { CheckBoxProps } from './CheckBox.types';
import { CheckBoxIcon } from './CheckBoxIcon';

import Label from '@/components/common/label/Label';

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(function CheckBox(
  { id, isIndeterminate, checked, disabled, className, labelText, ...restProps },
  ref,
) {
  const baseStyles =
    'group relative outline-none radius-4xs before:absolute duration-faster ease-(--motion-fluent) before:inset-0 before:rounded-[inherit] inline-flex items-center justify-center border';

  const enabledStyles =
    checked || isIndeterminate
      ? 'bg-feedback-information-dark border-border-trans-normal-dark'
      : 'bg-object-static-inverse-hero-dark border-border-normal-dark';

  const disabledStyles =
    checked || isIndeterminate
      ? 'bg-feedback-trans-information-dark border-border-trans-assistive-dark'
      : 'bg-object-static-inverse-disabled-dark border-border-trans-assistive-dark';

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    if (restProps.onClick) {
      restProps.onClick(e);
    }
  };

  return (
    <div className={clsx('gap-2xs inline-flex items-center', className)}>
      <div
        className={clsx(
          baseStyles,
          disabled ? disabledStyles : enabledStyles,
          'focus-within:before:shadow-focus-visible group-hover:before:bg-[rgba(26,27,35,0.12)] group-active:before:bg-[rgba(26,27,35,0.12)]',
        )}
      >
        <div className='relative inline-flex items-center'>
          <CheckBoxIcon isIndeterminate={isIndeterminate} disabled={disabled} checked={checked} />
          <input
            id={id}
            ref={ref}
            onClick={handleClick}
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
