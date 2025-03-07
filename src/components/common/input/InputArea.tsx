import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import TextArea from './TextArea';

import Label from '@/components/common/label/Label';

interface InputAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  labelText: string;
}

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ labelText, maxLength, disabled, required, placeholder, onChange, ...props }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);

      if (onChange) onChange(e);
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [text]);

    return (
      <div className='gap-2xs flex flex-col'>
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
          ref={textareaRef}
          value={text}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
        />
        <div
          className={` ${disabled ? 'text-object-disabled-dark' : 'text-object-assistive-dark'} peer-focus:text-object-neutral-dark body-sm cursor-default self-end`}
        >
          {`${text.length}/${maxLength || 0}`}
        </div>
      </div>
    );
  },
);

export default InputArea;
