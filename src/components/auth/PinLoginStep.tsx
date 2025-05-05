import { useState, useCallback } from 'react';

import { useAuthFlow } from './context';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import { useApplyPinForm } from '@/hooks/useApplyPinForm';
import { CreateSubmitHandler } from '@/utils/formHelpers';

export const PinLoginStep = () => {
  const [isPinHidden, setIsPinHidden] = useState(true);

  const { state, handlePinSubmit: handlePinLogin, isLoading } = useAuthFlow();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useApplyPinForm();

  const onPinFormSubmit = useCallback(
    ({ pin }: { pin: string }) => {
      handlePinLogin(pin);
    },
    [handlePinLogin],
  );

  const handleFormSubmit = CreateSubmitHandler(handleSubmit, onPinFormSubmit);

  const togglePinVisibility = () => {
    setIsPinHidden(prev => !prev);
  };

  return (
    <form id='pinLoginForm' className='gap-xs flex flex-col' onSubmit={handleFormSubmit}>
      <InputField
        value={state.email}
        type='email'
        labelText='이메일'
        isError={false}
        isSuccess={false}
        disabled={true}
        helper=''
      >
        <BlockButton
          size='lg'
          style='solid'
          hierarchy='secondary'
          className='h-full'
          disabled={true}
        >
          인증 완료됨
        </BlockButton>
      </InputField>
      <InputField
        type={isPinHidden ? 'password' : 'text'}
        labelText='PIN'
        isError={!!errors.pin}
        isSuccess={isValid}
        disabled={isLoading}
        helper={errors.pin ? errors.pin.message : ''}
        placeholder='설정하셨던 6자리 비밀번호를 입력해주세요'
        InputChildren={
          <span onClick={togglePinVisibility} className='cursor-pointer'>
            <Icon
              name={isPinHidden ? 'visible' : 'invisible'}
              size='md'
              fillColor='fill-object-neutral-dark'
            />
          </span>
        }
        {...register('pin')}
      />
    </form>
  );
};
