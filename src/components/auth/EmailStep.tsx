import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthFlow } from './context';

import BlockButton from '@/components/common/button/BlockButton';
import InputField from '@/components/common/input/InputField';
import { PATH } from '@/constants/path';
import { useApplyEmailForm } from '@/hooks/useApplyEmailForm';
import { useCheckEmailExistsMutation } from '@/hooks/useCheckEmailExistMutation';
import { useEmailAuthCodeMutation } from '@/hooks/useEmailAuthCodeMutation';
import { useToastActions } from '@/stores/toastStore';
import { Email } from '@/types/apis/apply';
import { handleError } from '@/utils/errorLogger';
import { CreateSubmitHandler } from '@/utils/formHelpers';

export const EmailStep = () => {
  const { state, dispatch, templateType, isRedirectExisting, startCooldown } = useAuthFlow();
  const { addToast } = useToastActions();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useApplyEmailForm();

  const currentEmail = watch('email');

  useEffect(() => {
    if (currentEmail && state.email && currentEmail !== state.email && state.step !== 'EMAIL') {
      dispatch({ type: 'INVALIDATE_AUTH_CODE' });
    }
  }, [currentEmail, state.email, state.step, dispatch]);

  const emailButtonText = useMemo(() => {
    if (state.step === 'EMAIL') return '인증번호 받기';
    if (state.isAuthCodeExpired || !state.isCooldownActive) return '인증번호 재발송';
    return '인증번호 발송됨';
  }, [state.step, state.isAuthCodeExpired, state.isCooldownActive]);

  const { mutate: checkEmail } = useCheckEmailExistsMutation();
  const { mutate: sendEmailCode, isPending: isEmailLoading } = useEmailAuthCodeMutation();

  const onEmailSubmit = useCallback(
    ({ email }: Email) => {
      dispatch({ type: 'SET_EMAIL', payload: email });

      checkEmail(
        { email },
        {
          onSuccess: ({ data: exists }) => {
            if (exists && isRedirectExisting && templateType === 'AUTH_CODE') {
              void navigate(PATH.login, { state: { email } });
              return;
            }
            sendEmailCode(
              { email, template: templateType },
              {
                onSuccess: () => {
                  if (state.step === 'EMAIL') {
                    dispatch({ type: 'NEXT_STEP' });
                  }
                  dispatch({ type: 'SET_AUTH_CODE_EXPIRED', payload: false });
                  addToast('인증번호를 발송했어요. 1분 뒤에 다시 요청하실 수 있어요.', 'normal');
                  startCooldown();
                },
                onError: err => handleError(err, '이메일 인증 코드 발송 실패'),
              },
            );
          },
          onError: err => handleError(err, '이메일 존재 여부 확인 실패'),
        },
      );
    },
    [
      dispatch,
      checkEmail,
      isRedirectExisting,
      templateType,
      sendEmailCode,
      navigate,
      state.step,
      addToast,
      startCooldown,
    ],
  );

  const handleEmailFormSubmit = CreateSubmitHandler(handleSubmit, onEmailSubmit);

  return (
    <form id='emailForm' className='flex flex-col' onSubmit={handleEmailFormSubmit}>
      <InputField
        type='email'
        labelText='이메일'
        isError={!!errors.email}
        isSuccess={!errors.email}
        helper={errors.email?.message || ''}
        placeholder='enjoyject@google.com'
        {...register('email')}
      >
        <BlockButton
          type='submit'
          size='lg'
          style='solid'
          hierarchy='secondary'
          className='h-full'
          disabled={
            !isValid ||
            isEmailLoading ||
            (state.isCooldownActive && (!currentEmail || currentEmail === state.email))
          }
        >
          {emailButtonText}
        </BlockButton>
      </InputField>
    </form>
  );
};
