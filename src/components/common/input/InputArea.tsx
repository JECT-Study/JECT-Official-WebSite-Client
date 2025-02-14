import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react';

import Label from '../Label';
import TextArea from './TextArea';

interface InputAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  labelText: string;
}

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
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
          textColor={`${disabled ? 'text-object-assistive-dark' : 'text-object-neutral-dark'}`}
        >
          {labelText}
        </Label>
        <TextArea
          {...props}
          ref={ref}
          value={text}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
        />
        <div
          className={`
            ${disabled ? 'text-object-disabled-dark' : 'text-object-assistive-dark'} 
            peer-focus:text-object-neutral-dark body-sm cursor-default self-end`
          }>
          {`${text.length}/${maxLength || 0}`}
        </div>
      </div>
    );
  },
);

export default InputArea;
