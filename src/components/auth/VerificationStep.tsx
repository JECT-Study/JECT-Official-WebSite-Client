import { useCallback, useMemo } from 'react';

import { useAuthFlow } from './context';

import LabelButton from '@/components/common/button/LabelButton';
import InputField from '@/components/common/input/InputField';
import { useApplyAuthCodeForm } from '@/hooks/useApplyAuthCodeForm';
import { useVerificationEmailCodeMutation } from '@/hooks/useVerificationEmailCodeMutation';
import { VerificationEmailCodePayload } from '@/types/apis/apply';
import { handleError } from '@/utils/errorLogger';
import { CreateSubmitHandler } from '@/utils/formHelpers';

export const VerificationStep = () => {
  const { state, dispatch, templateType } = useAuthFlow();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useApplyAuthCodeForm();
  const authCodeValue = watch('authCode');

  const { mutate: verifyEmailCode, isPending: isVerifying } = useVerificationEmailCodeMutation();

  const onVerificationSubmit = useCallback(
    ({ authCode }: VerificationEmailCodePayload) => {
      verifyEmailCode(
        {
          payload: { email: state.email, authCode },
          queryParams: { template: templateType },
        },
        {
          onSuccess: response => {
            if (response.status !== 'SUCCESS') {
              let message = '오류가 발생했습니다. 다시 시도해주세요.';
              if (response.status === 'INVALID_AUTH_CODE') {
                message = '인증번호가 올바르지 않아요. 다시 확인해주세요.';
              }
              if (response.status === 'NOT_FOUND_AUTH_CODE') {
                message = '인증번호 유효 시간이 초과되었어요.';
                dispatch({ type: 'INVALIDATE_AUTH_CODE' });
              }
              setError('authCode', { type: 'manual', message });
              return;
            }
            dispatch({ type: 'COMPLETE_VERIFICATION' });

            if (state.step === 'VERIFICATION') {
              dispatch({ type: 'NEXT_STEP' });
            }
          },
          onError: err => {
            handleError(err, '인증번호 확인 요청 실패');
            setError('authCode', {
              type: 'manual',
              message: '인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
            });
          },
        },
      );
    },
    [verifyEmailCode, state.email, state.step, templateType, dispatch, setError],
  );

  const handleFormSubmit = CreateSubmitHandler(handleSubmit, onVerificationSubmit);

  const helperText = useMemo(() => {
    if (errors.authCode) return errors.authCode.message;
    if (state.verificationComplete) return '인증이 완료되었어요';
    return '';
  }, [errors.authCode, state.verificationComplete]);

  const verificationButton = useMemo(() => {
    if (!authCodeValue) return null;
    return (
      <LabelButton
        type='submit'
        size='md'
        hierarchy='accent'
        disabled={!isValid || isVerifying || state.verificationComplete}
      >
        {state.verificationComplete ? '인증 완료됨' : '인증하기'}
      </LabelButton>
    );
  }, [authCodeValue, isValid, isVerifying, state.verificationComplete]);

  if (state.step === 'EMAIL') return null;

  return (
    <form id='verificationForm' className='gap-xs flex flex-col' onSubmit={handleFormSubmit}>
      <InputField
        labelText='인증번호'
        isError={!!errors.authCode}
        isSuccess={!errors.authCode && authCodeValue?.length === 6}
        disabled={state.verificationComplete}
        helper={helperText}
        placeholder='이메일 주소로 발송된 인증번호 6자리를 입력해주세요'
        InputChildren={verificationButton}
        {...register('authCode')}
      />
    </form>
  );
};
