import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewTabLink from '@/components/apply/NewTabLink';
import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import CheckBox from '@/components/common/checkbox/CheckBox';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import { useApplyEmailForm } from '@/hooks/useApplyEmailForm';
import { useApplyPinForm } from '@/hooks/useApplyPinForm';
import { useApplyVerificationEmailCodeForm } from '@/hooks/useApplyVerificationEmailCodeForm';
import { useCheckEmailExistsMutation } from '@/hooks/useCheckEmailExistMutation';
import { useEmailAuthCodeMutation } from '@/hooks/useEmailAuthCodeMutation';
import { usePinLoginMutation } from '@/hooks/usePinLoginMutation';
import { useVerificationEmailCodeMutation } from '@/hooks/useVerificationEmailCodeMutation';
import { Email, PinLoginPayload, VerificationEmailCodePayload } from '@/types/apis/apply';
import { CreateSubmitHandler } from '@/utils/formHelpers';

interface ApplyVerifyEmailProps {
  isResetPin?: boolean;
  setIsNewApplicant?: (value: boolean | ((isNewApplicant: boolean) => boolean)) => void;
  setUserEmail?: (email: string) => void;
}

function ApplyVerifyEmail({
  isResetPin = false,
  setIsNewApplicant,
  setUserEmail,
}: ApplyVerifyEmailProps) {
  const navigate = useNavigate();
  const [storedEmail, setStoredEmail] = useState('');
  const [isPinHidden, setIsPinHidden] = useState(true);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [isReVerification] = useState(isResetPin);
  const [step, setStep] = useState(1);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isValid: isEmailValid },
  } = useApplyEmailForm();

  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
    setError: setVerificationError,
    watch: watchVerification,
    formState: { errors: errorsVerification, isValid: isVerificationValid },
  } = useApplyVerificationEmailCodeForm();

  const {
    register: registerPin,
    handleSubmit: handleSubmitPin,
    formState: { errors: errorsPin, isValid: isPinValid },
  } = useApplyPinForm();

  const { mutate: checkEmailMutate, isPending: isCheckingEmail } = useCheckEmailExistsMutation();
  const { mutate: emailMutate, isPending: isEmailLoading } = useEmailAuthCodeMutation();
  const { mutate: verifyEmailCodeMutate, isPending: isEmailCodeLoading } =
    useVerificationEmailCodeMutation();
  const { mutate: pinLoginMutate, isPending: isPinLoginLoading } = usePinLoginMutation();

  const onEmailSubmit = ({ email }: Email) => {
    console.log('이메일 유효성 검사 통과, 회원 존재 여부 확인 API 요청 실행', { email });

    if (setUserEmail) {
      setUserEmail(email);
    }

    checkEmailMutate(email, {
      onSuccess: response => {
        const isUserExists = response.data;
        console.log('이메일 존재 여부 확인 결과:', isUserExists);

        if (isUserExists && setIsNewApplicant) {
          setIsNewApplicant(false);
          return;
        }
        setStoredEmail(email);
        emailMutate({ email });
        setStep(2);
      },
      onError: error => {
        console.error('이메일 존재 여부 확인 실패:', error);
      },
    });
  };

  const onVerificationSubmit = ({ verificationEmailCode }: VerificationEmailCodePayload) => {
    console.log('인증번호 유효성 검사 통과, API 요청 실행', {
      email: storedEmail,
      verificationEmailCode,
    });

    verifyEmailCodeMutate(
      { email: storedEmail, verificationEmailCode },
      {
        onSuccess: response => {
          console.log('인증번호 확인 성공:', response);

          if (response.status !== 'SUCCESS') {
            let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';

            switch (response.status) {
              case 'INVALID_AUTH_CODE':
                errorMessage = '인증번호가 올바르지 않아요. 다시 확인해주세요.';
                break;
              case 'NOT_FOUND_AUTH_CODE':
                errorMessage = '인증번호 유효 시간이 초과되었어요.';
                break;
            }

            setVerificationError('verificationEmailCode', {
              type: 'manual',
              message: errorMessage,
            });
            return;
          }

          setStep(3);
        },
        onError: error => {
          console.error('인증번호 확인 요청 실패:', error);
          setVerificationError('verificationEmailCode', {
            type: 'manual',
            message: '인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
          });
        },
      },
    );
  };

  const onPinSubmit = ({ pin }: PinLoginPayload) => {
    const payload = { email: storedEmail, pin };
    console.log('PIN 유효성 검사 통과, 로그인 API 요청 payload:', payload);
    pinLoginMutate(payload, {
      onSuccess: response => {
        console.log('PIN 로그인 성공:', response);
        setIsStepCompleted(true);

        void navigate(PATH.applicantInfo);
      },
      onError: error => {
        console.error('PIN 로그인 실패:', error);
      },
    });
  };

  const handleEmailFormSubmit = CreateSubmitHandler<{ email: string }, Email>(
    handleSubmitEmail,
    onEmailSubmit,
  );

  const handleVerificationFormSubmit = CreateSubmitHandler<
    { verificationEmailCode: string },
    VerificationEmailCodePayload
  >(handleSubmitVerification, onVerificationSubmit);

  const handlePinFormSubmit = CreateSubmitHandler<{ pin: string }, PinLoginPayload>(
    handleSubmitPin,
    onPinSubmit,
  );

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const getVerificationHelperText = () => {
    if (errorsVerification.verificationEmailCode) {
      return errorsVerification.verificationEmailCode.message;
    }

    if (step === 3) {
      return '인증이 완료되었어요';
    }

    return '';
  };

  return (
    <div
      className={`gap-9xl flex flex-col items-center ${isResetPin ? 'pt-(--gap-12xl)' : 'pt-(--gap-9xl)'} pb-(--gap-12xl)`}
    >
      {!isReVerification && <ProgressIndicator totalStep={3} currentStep={1} />}
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>
          {isReVerification ? APPLY_TITLE.resetPin : APPLY_TITLE.verifyEmail}
        </Title>
        <div className='gap-xs flex flex-col'>
          {step >= 1 && (
            <form className='gap-xs flex flex-col' onSubmit={handleEmailFormSubmit}>
              <InputField
                type='email'
                labelText='이메일'
                isError={!!errorsEmail.email}
                isSuccess={!errorsEmail.email}
                helper={errorsEmail.email ? errorsEmail.email.message : ''}
                placeholder='enjoyject@google.com'
                {...registerEmail('email')}
              >
                <BlockButton
                  type='submit'
                  size='lg'
                  style='solid'
                  hierarchy='secondary'
                  className='h-full'
                  disabled={!isEmailValid || isEmailLoading}
                >
                  인증번호 받기
                </BlockButton>
              </InputField>
            </form>
          )}
          {step >= 2 && (
            <form className='gap-xs flex flex-col' onSubmit={handleVerificationFormSubmit}>
              <InputField
                labelText='인증번호'
                isError={!!errorsVerification.verificationEmailCode}
                isSuccess={
                  !errorsVerification.verificationEmailCode &&
                  watchVerification('verificationEmailCode')?.length === 6
                }
                disabled={false}
                helper={getVerificationHelperText()}
                placeholder='이메일 주소로 발송된 인증번호 6자리를 입력해주세요'
                InputChildren={
                  <LabelButton
                    type='submit'
                    size='md'
                    hierarchy='accent'
                    disabled={!isVerificationValid || isEmailCodeLoading || step === 3}
                  >
                    {step === 3 ? '인증 완료됨' : '인증하기'}
                  </LabelButton>
                }
                {...registerVerification('verificationEmailCode')}
              />
            </form>
          )}
          {step >= 3 && (
            <form className='gap-7xl flex flex-col' onSubmit={handlePinFormSubmit}>
              <InputField
                type={isPinHidden ? 'password' : 'text'}
                labelText='PIN'
                isError={!!errorsPin.pin}
                isSuccess={isPinValid}
                disabled={false}
                helper={errorsPin.pin ? errorsPin.pin.message : ''}
                placeholder='본인 확인용 6자리 비밀번호를 설정해주세요'
                InputChildren={
                  <span onClick={() => setIsPinHidden(prev => !prev)} className='cursor-pointer'>
                    <Icon name='visible' size='md' fillColor='fill-object-neutral-dark' />
                  </span>
                }
                {...registerPin('pin')}
              />
              {!isReVerification && step > 1 && (
                <div className='gap-2xs flex'>
                  <div className='gap-2xs flex flex-1'>
                    {isTermsChecked ? (
                      <CheckBox
                        id='terms-checkbox'
                        checked={true}
                        onChange={handleTermsChange}
                        labelText='[필수] 젝트 개인정보 수집 및 이용 동의'
                      />
                    ) : (
                      <CheckBox
                        id='terms-checkbox'
                        checked={false}
                        onChange={handleTermsChange}
                        labelText='[필수] 젝트 개인정보 수집 및 이용 동의'
                      />
                    )}
                  </div>
                  <NewTabLink href=''>
                    <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
                  </NewTabLink>
                </div>
              )}
              <BlockButton
                type='submit'
                disabled={
                  !isPinValid || isPinLoginLoading || (!isReVerification && !isTermsChecked)
                }
                size='lg'
                style='solid'
                hierarchy='accent'
              >
                다음 단계로 진행하기
              </BlockButton>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default ApplyVerifyEmail;
