import { ComponentPropsWithoutRef, forwardRef } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  ({ disabled, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        className={`
          peer scroll border radius-sm body-md box-border h-[10.375rem] w-full px-(--gap-xl) py-(--gap-lg)
          bg-surface-embossed-dark border-border-trans-assistive-dark text-object-hero-dark
          disabled:placeholder:text-object-disabled-dark placeholder:text-object-assistive-dark
          disabled:hover:border-border-trans-assistive-dark 
          hover:border-border-trans-neutral-dark focus:border-border-trans-hero-dark 
          duration-faster ease-(--motion-fluent) resize-none`}
      />
    );
  },
);

export default TextArea;
