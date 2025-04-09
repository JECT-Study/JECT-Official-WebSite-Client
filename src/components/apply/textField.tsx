import { ChangeEvent } from 'react';

import InputArea from '../common/input/InputArea';
import Title from '../common/title/Title';

import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { Question } from '@/types/apis/application';

interface TextFieldProps {
  data: Question;
  onChange: (id: number, text: string) => void;
  value: string;
}

function TextField({ data, onChange, value }: TextFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(data.id, e.target.value);
  };

  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>{data.title}</Title>
      <InputArea
        labelText='답변'
        errorHelper={APPLY_MESSAGE.invalid.exceedText}
        maxLength={data.maxLength || undefined}
        required={data.isRequired}
        placeholder={data.inputHint}
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}

export default TextField;
