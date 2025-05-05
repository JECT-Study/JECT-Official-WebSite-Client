import { useState, ChangeEvent, useCallback } from 'react';

import { useAuthFlow } from './context';

import NewTabLink from '@/components/apply/NewTabLink';
import CheckBox from '@/components/common/checkbox/CheckBox';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import { useApplyPinForm } from '@/hooks/useApplyPinForm';
import { RegisterMemberPayload, ResetPinPayload } from '@/types/apis/apply';
import { CreateSubmitHandler } from '@/utils/formHelpers';

export const PinStep = () => {
  const { state, handlePinSubmit, isResetPin, isLoading } = useAuthFlow();

  const [isPinHidden, setIsPinHidden] = useState(true);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const togglePinVisibility = useCallback(() => {
    setIsPinHidden(prev => !prev);
  }, []);

  const handleTermsChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  }, []);

  const onPinSubmit = useCallback(
    ({ pin }: RegisterMemberPayload | ResetPinPayload) => {
      handlePinSubmit(pin);
    },
    [handlePinSubmit],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useApplyPinForm();

  const handleFormSubmit = CreateSubmitHandler(handleSubmit, onPinSubmit);

  if (state.step !== 'PIN') {
    return null;
  }

  return (
    <form id='pinForm' className='gap-xs flex flex-col' onSubmit={handleFormSubmit}>
      <InputField
        type={isPinHidden ? 'password' : 'text'}
        labelText='PIN'
        isError={!!errors.pin}
        isSuccess={isValid}
        disabled={isLoading}
        helper={errors.pin?.message || ''}
        placeholder='본인 확인용 6자리 비밀번호를 설정해주세요'
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
      {!isResetPin && (
        <div className='gap-2xs mt-3 flex'>
          <div className='gap-2xs flex flex-1'>
            {isTermsChecked ? (
              <CheckBox
                id='terms-checkbox'
                checked
                onChange={handleTermsChange}
                labelText='[필수] 젝트 개인정보 수집 및 이용 동의'
              />
            ) : (
              <CheckBox
                id='terms-checkbox'
                onChange={handleTermsChange}
                labelText='[필수] 젝트 개인정보 수집 및 이용 동의'
              />
            )}{' '}
          </div>
          <NewTabLink href='https://cultured-phalange-7de.notion.site/JECT-1cf62a893ac581cba52beb59a1eca908'>
            <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
          </NewTabLink>
        </div>
      )}
    </form>
  );
};
