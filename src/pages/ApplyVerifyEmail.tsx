import { ChangeEvent, useEffect, useState } from 'react';
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
import { useApplyAuthCodeForm } from '@/hooks/useApplyAuthCodeForm';
import { useApplyEmailForm } from '@/hooks/useApplyEmailForm';
import { useApplyPinForm } from '@/hooks/useApplyPinForm';
import { useCheckEmailExistsMutation } from '@/hooks/useCheckEmailExistMutation';
import { useEmailAuthCodeMutation } from '@/hooks/useEmailAuthCodeMutation';
import { useRegisterMemberMutation } from '@/hooks/useRegisterMemberMutation';
import { useResetPinMutation } from '@/hooks/useResetPinMutation';
import { useVerificationEmailCodeMutation } from '@/hooks/useVerificationEmailCodeMutation';
import { useApplyVerifyStore } from '@/stores/applyVerifyStore';
import { useToastActions } from '@/stores/toastStore';
import {
  Email,
  RegisterMemberPayload,
  ResetPinPayload,
  VerificationEmailCodePayload,
} from '@/types/apis/apply';
import { handleError } from '@/utils/errorLogger';
import { CreateSubmitHandler } from '@/utils/formHelpers';

function ApplyVerifyEmail() {
  const { isResetPin, setEmailVerified, setExistingUserDetected } = useApplyVerifyStore();

  const { addToast } = useToastActions();
  const navigate = useNavigate();
  const [storedEmail, setStoredEmail] = useState('');
  const [isPinHidden, setIsPinHidden] = useState(true);
  const [isReVerification, setIsReVerification] = useState(isResetPin);
  const [step, setStep] = useState(1);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isAuthCodeExpired, setIsAuthCodeExpired] = useState(false);
  const [emailButtonText, setEmailButtonText] = useState('인증번호 받기');
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState<number | null>(null);

  const templateType = isResetPin ? 'PIN_RESET' : 'AUTH_CODE';

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isValid: isEmailValid },
    reset: resetEmailForm,
    watch: watchEmail,
  } = useApplyEmailForm();

  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
    setError: setVerificationError,
    watch: watchVerification,
    formState: { errors: errorsVerification, isValid: isVerificationValid },
    reset: resetVerificationForm,
  } = useApplyAuthCodeForm();

  const {
    register: registerPin,
    handleSubmit: handleSubmitPin,
    formState: { errors: errorsPin, isValid: isPinValid },
    reset: resetPinForm,
  } = useApplyPinForm();

  const { mutate: checkEmailMutate } = useCheckEmailExistsMutation();
  const { mutate: emailMutate, isPending: isEmailLoading } = useEmailAuthCodeMutation();
  const { mutate: verifyEmailCodeMutate, isPending: isEmailCodeLoading } =
    useVerificationEmailCodeMutation();
  const { mutate: registerMemberMutate, isPending: isRegisteringMember } =
    useRegisterMemberMutation();
  const { mutate: resetPinMutate, isPending: isResettingPin } = useResetPinMutation();

  const authCodeValue = watchVerification('authCode');
  const currentEmail = watchEmail('email');

  useEffect(() => {
    if (currentEmail && storedEmail && currentEmail !== storedEmail) {
      if (step > 1) {
        setIsAuthCodeExpired(true);
      }
    }
  }, [currentEmail, storedEmail, step]);

  useEffect(() => {
    if (step >= 2) {
      if (!isCooldownActive && !isAuthCodeExpired) {
        setEmailButtonText('인증번호 재발송');
      } else if (isAuthCodeExpired) {
        setEmailButtonText('인증번호 재발송');
      } else {
        setEmailButtonText('인증번호 발송됨');
      }
    } else {
      setEmailButtonText('인증번호 받기');
    }
  }, [step, isAuthCodeExpired, isCooldownActive]);

  useEffect(() => {
    return () => {
      if (cooldownTimer) {
        window.clearTimeout(cooldownTimer);
      }
    };
  }, [cooldownTimer]);

  const startCooldown = () => {
    setIsCooldownActive(true);

    if (cooldownTimer) {
      window.clearTimeout(cooldownTimer);
    }

    const timer = setTimeout(() => {
      setIsCooldownActive(false);
    }, 60000);

    setCooldownTimer(timer);
  };

  const onEmailSubmit = ({ email }: Email) => {
    setEmailVerified(email);

    checkEmailMutate(
      { email },
      {
        onSuccess: response => {
          const isUserExists = response.data;

          if (isUserExists && !isResetPin) {
            setExistingUserDetected();
            return;
          }

          setStoredEmail(email);

          emailMutate(
            { email, template: templateType },
            {
              onSuccess: () => {
                setStep(2);
                setIsAuthCodeExpired(false);

                resetVerificationForm();
                resetPinForm();

                addToast('인증번호를 발송했어요. 1분 뒤에 다시 요청하실 수 있어요.', 'normal');
                startCooldown();
              },
              onError: error => {
                handleError(error, '이메일 인증 코드 발송 실패');
                //TODO: 이메일 인증 코드 추가 예외처리 필요
              },
            },
          );
        },
        onError: error => {
          handleError(error, '이메일 존재 여부 확인 실패');
        },
      },
    );
  };

  const onVerificationSubmit = ({ authCode }: VerificationEmailCodePayload) => {
    verifyEmailCodeMutate(
      {
        payload: { email: storedEmail, authCode },
        queryParams: { template: templateType },
      },
      {
        onSuccess: response => {
          if (response.status !== 'SUCCESS') {
            let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';

            switch (response.status) {
              case 'INVALID_AUTH_CODE':
                errorMessage = '인증번호가 올바르지 않아요. 다시 확인해주세요.';
                break;
              case 'NOT_FOUND_AUTH_CODE':
                errorMessage = '인증번호 유효 시간이 초과되었어요.';
                setIsAuthCodeExpired(true);
                break;
            }

            setVerificationError('authCode', {
              type: 'manual',
              message: errorMessage,
            });
            return;
          }
          setStep(3);
        },
        onError: error => {
          handleError(error, '인증번호 확인 요청 실패');
          setVerificationError('authCode', {
            type: 'manual',
            message: '인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
          });
        },
      },
    );
  };

  const onRegisterMemberSubmit = ({ pin }: RegisterMemberPayload) => {
    registerMemberMutate(
      { pin },
      {
        onSuccess: response => {
          if (response.status === 'SUCCESS') {
            void navigate(PATH.applicantInfo);
          }
        },
        onError: error => {
          handleError(error, '회원 등록 실패');
        },
      },
    );
  };

  const onResetPinSubmit = ({ pin }: ResetPinPayload) => {
    resetPinMutate(
      { pin },
      {
        onSuccess: response => {
          if (response.status === 'SUCCESS') {
            addToast('PIN을 다시 설정했어요', 'positive');
            //TODO: 지원 초기 상태로 state들을 초기화 로직(Zustand, 혹은 외부 함수로)
            setStep(1);
            setIsAuthCodeExpired(false);

            setIsCooldownActive(false);
            setIsReVerification(false);

            if (cooldownTimer !== null) {
              window.clearTimeout(cooldownTimer);
              setCooldownTimer(null);
            }

            resetEmailForm();
            resetVerificationForm();
            resetPinForm();
          }
        },
        onError: error => {
          handleError(error, 'PIN 재설정 실패');
        },
      },
    );
  };

  const handleEmailFormSubmit = CreateSubmitHandler<{ email: string }, Email>(
    handleSubmitEmail,
    onEmailSubmit,
  );

  const handleVerificationFormSubmit = CreateSubmitHandler<
    { authCode: string },
    VerificationEmailCodePayload
  >(handleSubmitVerification, onVerificationSubmit);

  const handleRegisterMemberFormSubmit = CreateSubmitHandler<
    { pin: string },
    RegisterMemberPayload
  >(handleSubmitPin, onRegisterMemberSubmit);

  const handleResetPinFormSubmit = CreateSubmitHandler<{ pin: string }, ResetPinPayload>(
    handleSubmitPin,
    onResetPinSubmit,
  );

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const getVerificationHelperText = () => {
    if (errorsVerification.authCode) {
      return errorsVerification.authCode.message;
    }

    if (step === 3) {
      return '인증이 완료되었어요';
    }

    return '';
  };

  const renderVerificationButton = () => {
    if (!authCodeValue) {
      return null;
    }

    return (
      <LabelButton
        type='submit'
        size='md'
        hierarchy='accent'
        disabled={!isVerificationValid || isEmailCodeLoading || step === 3}
      >
        {step === 3 ? '인증 완료됨' : '인증하기'}
      </LabelButton>
    );
  };

  const isSubmitButtonDisabled =
    !isPinValid ||
    (isReVerification ? isResettingPin : isRegisteringMember) ||
    (!isReVerification && !isTermsChecked);

  const rightIconFillColor = isSubmitButtonDisabled
    ? 'fill-accent-trans-hero-dark'
    : 'fill-object-static-inverse-hero-dark';

  return (
    <div
      className={`gap-9xl flex flex-col items-center ${isReVerification ? 'pt-(--gap-12xl)' : 'pt-(--gap-9xl)'} pb-(--gap-12xl)`}
    >
      {!isReVerification && <ProgressIndicator totalStep={3} currentStep={1} />}
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>
          {isReVerification ? APPLY_TITLE.resetPin : APPLY_TITLE.verifyEmail}
        </Title>
        <div className='gap-7xl flex flex-col'>
          <div className='gap-xs flex flex-col'>
            {step >= 1 && (
              <form className='flex flex-col' onSubmit={handleEmailFormSubmit}>
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
                    disabled={
                      !isEmailValid ||
                      isEmailLoading ||
                      (isCooldownActive && currentEmail === storedEmail) ||
                      step === 3
                    }
                  >
                    {emailButtonText}
                  </BlockButton>
                </InputField>
              </form>
            )}
            {step >= 2 && (
              <form className='gap-xs flex flex-col' onSubmit={handleVerificationFormSubmit}>
                <InputField
                  labelText='인증번호'
                  isError={!!errorsVerification.authCode}
                  isSuccess={
                    !errorsVerification.authCode && watchVerification('authCode')?.length === 6
                  }
                  disabled={step === 3}
                  helper={getVerificationHelperText()}
                  placeholder='이메일 주소로 발송된 인증번호 6자리를 입력해주세요'
                  InputChildren={renderVerificationButton()}
                  {...registerVerification('authCode')}
                />
              </form>
            )}

            {step >= 3 && (
              <form
                id={isReVerification ? 'resetPinForm' : 'registerForm'}
                className='gap-7xl flex flex-col'
                onSubmit={
                  isReVerification ? handleResetPinFormSubmit : handleRegisterMemberFormSubmit
                }
              >
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
            )}
          </div>
          {!isReVerification && step >= 2 && (
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
              <NewTabLink href='https://cultured-phalange-7de.notion.site/JECT-1cf62a893ac581cba52beb59a1eca908'>
                <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
              </NewTabLink>
            </div>
          )}
          <div className='gap-md flex flex-col'>
            {step === 2 && !isReVerification && (
              <LabelButton
                size='xs'
                hierarchy='tertiary'
                rightIcon={
                  <Icon name='rightChevron' size='2xs' fillColor='fill-object-alternative-dark' />
                }
                onClick={() => void navigate(`${PATH.faq}/1/apply-5`)}
              >
                이메일이 오지 않았나요?
              </LabelButton>
            )}
            <BlockButton
              type='submit'
              form={isReVerification ? 'resetPinForm' : 'registerForm'}
              disabled={isSubmitButtonDisabled}
              size='lg'
              style='solid'
              hierarchy='accent'
              rightIcon={
                !isReVerification && (
                  <Icon name='forward' size='md' fillColor={rightIconFillColor} />
                )
              }
            >
              {isReVerification ? 'PIN 다시 설정 완료하기' : '다음 단계로 진행하기'}
            </BlockButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApplyVerifyEmail;
