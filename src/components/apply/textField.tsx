import { ChangeEvent } from 'react';

import InputArea from '@/components/common/input/InputArea';
import Title from '@/components/common/title/Title';
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
        labelText={data.label}
        errorHelper={APPLY_MESSAGE.invalid.exceedText}
        maxLength={data.maxTextLength || undefined}
        required={data.isRequired}
        placeholder={data.inputHint}
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}

export default TextField;
