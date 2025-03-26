import InputArea from '../common/input/InputArea';
import Title from '../common/title/Title';

function TextField() {
  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>title</Title>
      <InputArea labelText='답변' maxLength={0} required={false} placeholder='' />
    </fieldset>
  );
}

export default TextField;
