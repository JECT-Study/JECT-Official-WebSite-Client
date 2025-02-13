import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError: boolean;
  children?: ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, isError, disabled, className, ...props }, ref) => {
    return (
      <div
        className={
          clsx( {
            'bg-surface-standard-dark': disabled,
            'bg-surface-embossed-dark': !disabled,
            'border-feedback-trans-negative-dark': isError && disabled,
            'border-feedback-negative-dark' :  isError && !disabled,
            'border-border-trans-assistive-dark': !isError && disabled,
            'border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus-within:border-border-trans-hero-dark focus-within:hover:border-border-trans-hero-dark': !isError && !disabled,
          },
        className,
        'duration-faster gap-2xs radius-xs flex items-center border px-(--gap-md) py-(--gap-sm) ease-(--motion-fluent)'
        )}
      >
        <input
          {...props}
          ref={ref}
          disabled={disabled}
          className={`
            body-md grow outline-none
            disabled:placeholder:text-object-disabled-dark 
            placeholder:text-object-assistive-dark 
            caret-object-hero-dark 
            text-object-hero-dark 
          `}
        />
        {children}
      </div>
    );
  },
);

export default Input;
