import InputField from '../common/input/InputField';
import Title from '../common/title/Title';

function UrlField() {
  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>title</Title>
      <InputField
        labelText='URL'
        isSuccess={false}
        placeholder=''
        required={false}
        isError={false}
        helper=''
      />
    </fieldset>
  );
}

export default UrlField;
