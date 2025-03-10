import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isError?: boolean;
  children?: ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, isError = false, disabled, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          {
            'bg-surface-standard-dark': disabled,
            'bg-surface-embossed-dark': !disabled,
            'border-feedback-trans-negative-dark': isError && disabled,
            'border-feedback-negative-dark': isError && !disabled,
            'border-border-trans-assistive-dark': !isError && disabled,
            'border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus-within:border-border-trans-hero-dark focus-within:hover:border-border-trans-hero-dark':
              !isError && !disabled,
          },
          className,
          'duration-faster gap-2xs radius-xs flex items-center border px-(--gap-md) py-(--gap-sm) ease-(--motion-fluent)',
        )}
      >
        <input
          {...props}
          ref={ref}
          disabled={disabled}
          className={`body-md disabled:placeholder:text-object-disabled-dark placeholder:text-object-assistive-dark caret-object-hero-dark text-object-hero-dark grow outline-none read-only:cursor-default`}
        />
        {children}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
