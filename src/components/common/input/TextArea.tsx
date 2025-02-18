import { ComponentPropsWithoutRef, forwardRef } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<'textarea'>>(
  ({ disabled, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        className={`peer scroll radius-sm body-md bg-surface-embossed-dark border-border-trans-assistive-dark text-object-hero-dark disabled:placeholder:text-object-disabled-dark placeholder:text-object-assistive-dark disabled:hover:border-border-trans-assistive-dark hover:border-border-trans-neutral-dark focus:border-border-trans-hero-dark duration-faster box-border h-[10.375rem] w-full resize-none border px-(--gap-xl) py-(--gap-lg) ease-(--motion-fluent) outline-none`}
      />
    );
  },
);

export default TextArea;
