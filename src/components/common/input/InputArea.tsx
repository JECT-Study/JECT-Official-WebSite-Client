import clsx from 'clsx';
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
  errorHelper?: string;
}

const InputArea = ({
  labelText,
  errorHelper = '',
  maxLength = 0,
  disabled,
  required,
  placeholder,
  onChange,
  ...props
}: InputAreaProps) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (onChange) onChange(e);
  };
  console.log(text);
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
        disabled={disabled}
        required={required}
        isError={!!errorHelper}
      />
      <div className='flex justify-between'>
        <p
          className={`${disabled ? 'text-feedback-trans-negative-dark' : 'text-feedback-negative-dark'} body-sm`}
        >
          {errorHelper}
        </p>
        <div
          className={clsx(
            !!errorHelper && 'text-feedback-negative-dark!',
            disabled && 'text-object-disabled-dark',
            !disabled && 'text-object-assistive-dark',
            'peer-focus:text-object-neutral-dark body-sm cursor-default self-end',
          )}
        >
          {`${text.length}/${maxLength}`}
        </div>
      </div>
    </div>
  );
};

export default InputArea;
