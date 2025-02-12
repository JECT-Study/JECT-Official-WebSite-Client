import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isNegative: boolean;
  children?: ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ children, isNegative, disabled, ...props }, ref) => {
    return (
      <div
        className={`${disabled ? 'bg-surface-standard-dark' : 'bg-surface-embossed-dark'} ${isNegative ? (disabled ? 'border-feedback-trans-negative-dark' : 'border-feedback-negative-dark') : disabled ? 'border-border-trans-assistive-dark' : 'border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus-within:border-border-trans-hero-dark focus-within:hover:border-border-trans-hero-dark'} duration-faster gap-2xs radius-xs flex items-center border px-(--gap-md) py-(--gap-sm) ease-(--motion-fluent)`}
      >
        <input
          {...props}
          ref={ref}
          disabled={disabled}
          className={`${disabled ? 'placeholder:text-object-disabled-dark' : 'placeholder:text-object-assistive-dark'} caret-object-hero-dark text-object-hero-dark body-md grow outline-none`}
        />
        {children}
      </div>
    );
  },
);

export default InputField;
