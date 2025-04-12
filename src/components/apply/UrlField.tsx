import { ChangeEvent, useState } from 'react';

import InputField from '../common/input/InputField';
import Title from '../common/title/Title';

import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { Question } from '@/types/apis/question';
import { validateUrlDetail, validateUrlStartHttp } from '@/utils/validateUrl';

interface UrlFieldProps {
  data: Question;
  onChange: (id: number, text: string) => void;
  value: string;
}

function UrlField({ data, onChange, value }: UrlFieldProps) {
  const [text, setText] = useState(value ?? '');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setText(url);
    setIsError(!validateUrlStartHttp(url));
    onChange(data.id, url);
  };

  const handlerBlur = () => {
    setIsError(!validateUrlDetail(text));
  };

  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>{data.title}</Title>
      <InputField
        labelText={data.label}
        isSuccess={false}
        placeholder={data.inputHint}
        required={data.isRequired}
        isError={isError}
        helper={isError ? APPLY_MESSAGE.invalid.url : ''}
        onChange={handleChange}
        onBlur={handlerBlur}
        value={text}
      />
    </fieldset>
  );
}

export default UrlField;
