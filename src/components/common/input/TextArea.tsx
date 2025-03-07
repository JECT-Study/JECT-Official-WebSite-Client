import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<'textarea'>>(
  ({ disabled, ...props }, ref) => {
    return (
      <textarea
        {...props}
        rows={1}
        ref={ref}
        disabled={disabled}
        className={clsx(
          'body-md radius-sm box-border min-h-[10.375rem] w-full px-(--gap-xl) py-(--gap-lg)',
          'peer scroll resize-none outline-none',
          'duration-faster ease-(--motion-fluent)',
          'bg-surface-embossed-dark',
          'border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus:border-border-trans-hero-dark disabled:hover:border-border-trans-assistive-dark border',
          'text-object-hero-dark disabled:text-object-disabled-dark',
          'placeholder:text-object-assistive-dark disabled:placeholder:text-object-disabled-dark',
        )}
      />
    );
  },
);

export default TextArea;
