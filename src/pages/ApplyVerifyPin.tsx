import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ApplyVerifyEmail from './ApplyVerifyEmail';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import { useApplyPinForm } from '@/hooks/useApplyPinForm';
import useCheckApplicationStatus from '@/hooks/useCheckApplicationStatus';
import useDeleteDraftMutation from '@/hooks/useDeleteDraftMutation';
import useDraftQuery from '@/hooks/useDraftQuery';
import { usePinLoginMutation } from '@/hooks/usePinLoginMutation';
import { useDialogActions } from '@/stores/dialogStore';
import { PinLoginPayload } from '@/types/apis/apply';
import { getDraftLocal } from '@/utils/draftUtils';
import { CreateSubmitHandler } from '@/utils/formHelpers';

interface ApplyVerifyPinProps {
  email: string;
}

function ApplyVerifyPin({ email }: ApplyVerifyPinProps) {
  const navigate = useNavigate();
  const [isResetPin, setIsResetPin] = useState(false);
  const [isPinHidden, setIsPinHidden] = useState(true);

  const {
    register: registerPin,
    handleSubmit: handleSubmitPin,
    setError: setPinError,
    formState: { errors: errorsPin, isValid: isPinValid },
  } = useApplyPinForm();

  const { mutate: pinLoginMutate, isPending: isPinLoginLoading } = usePinLoginMutation();
  const { mutate: deleteDraftMutate } = useDeleteDraftMutation();
  const { refetch: refetchDraftServer } = useDraftQuery(false);
  const { refetch: refetchCheckApplicationStatus } = useCheckApplicationStatus();
  const { openDialog } = useDialogActions();

  const rightIconFillColor =
    !isPinValid || isPinLoginLoading
      ? 'fill-accent-trans-hero-dark'
      : 'fill-object-static-inverse-hero-dark';

  const onPinSubmit = ({ pin }: PinLoginPayload) => {
    const payload = { email, pin };
    console.log('PIN 유효성 검사 통과, 로그인 API 요청 payload:', payload);

    pinLoginMutate(payload, {
      onSuccess: response => {
        console.log('PIN 로그인 성공:', response);

        if (response.status !== 'SUCCESS') {
          let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';

          switch (response.status) {
            case 'INVALID_CREDENTIALS':
              errorMessage = 'PIN이 올바르지 않습니다. 다시 확인해주세요.';
              break;
          }

          setPinError('pin', {
            type: 'manual',
            message: errorMessage,
          });
          return;
        }

        void refetchCheckApplicationStatus()
          .then(({ data }) => {
            if (data?.status === 'SUCCESS') {
              return refetchDraftServer();
            }

            void navigate(PATH.applyComplete);

            return null;
          })
          .then(result => {
            if (!result) return;

            const { data } = result;

            if (!getDraftLocal() && data?.status === 'TEMP_APPLICATION_NOT_FOUND') {
              return void navigate(PATH.applyRegistration);
            }

            if (getDraftLocal() || data?.status === 'SUCCESS') {
              openDialog({
                type: 'continueWriting',
                onPrimaryBtnClick: () => {
                  void navigate(PATH.applyRegistration, { state: { continue: true } });
                },
                onSecondaryBtnClick: () => {
                  deleteDraftMutate(null, {
                    onSuccess: () => {
                      void navigate(PATH.applyRegistration, { state: { continue: false } });
                    },
                  });
                },
              });
            }
          });
      },
      onError: error => {
        console.error('PIN 로그인 실패:', error);
        setPinError('pin', {
          type: 'manual',
          message: '로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
        });
      },
    });
  };

  const handlePinFormSubmit = CreateSubmitHandler<{ pin: string }, PinLoginPayload>(
    handleSubmitPin,
    onPinSubmit,
  );

  const togglePinVisibility = () => {
    setIsPinHidden(prev => !prev);
  };

  if (isResetPin) return <ApplyVerifyEmail isResetPin={isResetPin} />;

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.verifyPIN}</Title>
        <div className='gap-7xl flex flex-col'>
          <form id='pinForm' className='gap-xs flex flex-col' onSubmit={handlePinFormSubmit}>
            <InputField
              value={email}
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
              isError={!!errorsPin.pin}
              isSuccess={isPinValid}
              disabled={false}
              helper={errorsPin.pin ? errorsPin.pin.message : ''}
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
              {...registerPin('pin')}
            />
          </form>
          <div className='gap-3xs flex self-center *:last:cursor-pointer'>
            <Label hierarchy='weak' weight='normal' textColor='text-object-alternative-dark'>
              혹시 PIN을 잊어버리셨나요?
            </Label>
            <button className='*:underline' onClick={() => setIsResetPin(true)}>
              <Label hierarchy='weak' weight='normal' textColor='text-feedback-information-dark'>
                PIN 다시 설정하기
              </Label>
            </button>
          </div>
          <BlockButton
            type='submit'
            form='pinForm'
            disabled={!isPinValid || isPinLoginLoading}
            size='lg'
            style='solid'
            hierarchy='accent'
            rightIcon={<Icon name='forward' size='md' fillColor={rightIconFillColor} />}
          >
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </section>
    </div>
  );
}

export default ApplyVerifyPin;
