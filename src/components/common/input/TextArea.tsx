import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  isError?: boolean;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ isError = false, disabled, className, ...props }, ref) => {
    return (
      <textarea
        {...props}
        rows={1}
        ref={ref}
        disabled={disabled}
        className={clsx(
          {
            'border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus:border-border-trans-hero-dark':
              !disabled,
            'hover:border-border-trans-assistive-dark': disabled,
            'border-feedback-negative-dark hover:border-feedback-negative-dark focus:border-feedback-negative-dark':
              isError && !disabled,
          },
          'body-md radius-sm box-border min-h-[10.375rem] w-full border px-(--gap-xl) py-(--gap-lg)',
          'scroll resize-none outline-none',
          'duration-faster ease-(--motion-fluent)',
          'bg-surface-embossed-dark',
          'text-object-hero-dark disabled:text-object-disabled-dark',
          'placeholder:text-object-assistive-dark disabled:placeholder:text-object-disabled-dark',
          className,
        )}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
