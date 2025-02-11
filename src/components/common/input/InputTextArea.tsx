import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';

import Label from '../Label';

interface InputTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  maxLength: number;
}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ labelText, maxLength, disabled, required, placeholder, onChange, ...props }, ref) => {
    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);

      if (onChange) onChange(e);
    };

    return (
      <div className='gap-2xs flex w-[35rem] flex-col'>
        <Label
          hierarchy='normal'
          weight='normal'
          isRequired={required}
          textColor={`${disabled ? 'text-object-assistive-dark  ' : 'text-object-neutral-dark'}`}
        >
          {labelText}
        </Label>
        <textarea
          placeholder={placeholder}
          ref={ref}
          onChange={handleChange}
          value={text}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          className={`${disabled ? 'placeholder:text-object-disabled-dark' : 'placeholder:text-object-assistive-dark hover:border-border-trans-neutral-dark'} peer bg-surface-embossed-dark border-border-trans-assistive-dark radius-sm body-md text-object-hero-dark scroll focus:border-border-trans-hero-dark box-border h-[10.375rem] w-full resize-none border px-(--gap-xl) py-(--gap-lg)`}
          {...props}
        />

        <div
          className={`${disabled ? 'text-object-disabled-dark' : 'text-object-assistive-dark'} peer-focus:text-object-neutral-dark body-sm cursor-default self-end`}
        >{`${text.length}/${maxLength}`}</div>
      </div>
    );
  },
);

export default InputTextArea;
