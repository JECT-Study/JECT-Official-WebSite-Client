import { forwardRef, TextareaHTMLAttributes } from 'react';

const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ disabled, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        className={`${disabled ? 'placeholder:text-object-disabled-dark' : 'placeholder:text-object-assistive-dark hover:border-border-trans-neutral-dark'} peer bg-surface-embossed-dark border-border-trans-assistive-dark radius-sm body-md text-object-hero-dark scroll focus:border-border-trans-hero-dark box-border h-[10.375rem] w-full resize-none border px-(--gap-xl) py-(--gap-lg)`}
      />
    );
  },
);

export default TextAreaField;
