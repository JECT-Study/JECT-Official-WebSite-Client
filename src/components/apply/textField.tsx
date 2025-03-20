import { ChangeEvent } from 'react';

import InputArea from '../common/input/InputArea';
import Title from '../common/title/Title';

import { Question } from '@/types/apis/question';

interface TextFieldProps {
  data: Question;
  onChange: (id: number, text: string) => void;
}

function TextField({ data, onChange }: TextFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(data.id, e.target.value);
  };

  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>{data.title}</Title>
      <InputArea
        labelText='답변'
        maxLength={data.maxLength || undefined}
        required={data.isRequired}
        placeholder={data.inputHint}
        onChange={handleChange}
      />
    </fieldset>
  );
}

export default TextField;
