import { useState } from 'react';

import NewTabLink from '@/components/apply/NewTabLink';
import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

interface ApplyVerifyEmailProps {
  isResetPin?: boolean;
  setIsNewApplicant?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyVerifyEmail({ isResetPin = false }: ApplyVerifyEmailProps) {
  const [isStepCompleted] = useState(false);
  const [isReVerification] = useState(isResetPin);
  const [step] = useState(3);

  return (
    <div
      className={`gap-9xl flex flex-col items-center ${isResetPin ? 'pt-(--gap-12xl)' : 'pt-(--gap-9xl)'} pb-(--gap-12xl)`}
    >
      {!isReVerification && <ProgressIndicator totalStep={3} currentStep={1} />}
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>
          {isReVerification ? APPLY_TITLE.resetPin : APPLY_TITLE.verifyEmail}
        </Title>
        <div className='gap-7xl flex flex-col'>
          <form className='gap-xs flex flex-col'>
            <InputField
              type='email'
              labelText='이메일'
              isError={false}
              isSuccess={false}
              helper=''
              placeholder='enjoyject@google.com'
            >
              <BlockButton
                size='lg'
                style='solid'
                hierarchy='secondary'
                className='h-full'
                disabled={false}
              >
                {step === 1 ? '인증번호 받기' : '인증번호 발송됨'}
              </BlockButton>
            </InputField>
            {step > 1 && (
              <InputField
                labelText='인증번호'
                isError={false}
                isSuccess={true}
                disabled={false}
                helper={step > 2 ? '인증이 완료되었어요' : ''}
                placeholder='이메일 주소로 발송된 인증번호 6자리를 입력해주세요'
                InputChildren={
                  <LabelButton size='md' hierarchy='accent' disabled={true}>
                    {step > 2 ? '인증 완료됨' : '인증하기'}
                  </LabelButton>
                }
              />
            )}
            {step > 2 && (
              <InputField
                type='password'
                labelText='PIN'
                isError={false}
                isSuccess={false}
                disabled={false}
                helper=''
                placeholder='본인 확인용 6자리 비밀번호를 설정해주세요'
                InputChildren={
                  <Icon name='visible' size='md' fillColor='fill-object-neutral-dark' />
                }
              />
            )}
          </form>
          {!isReVerification && step > 1 && (
            <div className='gap-2xs flex'>
              <div className='gap-2xs flex flex-1'>
                <Label hierarchy='strong' weight='normal' textColor='text-object-assistive-dark'>
                  [필수] 젝트 개인정보 수집 및 이용 동의
                </Label>
              </div>
              <NewTabLink href=''>
                <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
              </NewTabLink>
            </div>
          )}
          <BlockButton disabled={!isStepCompleted} size='lg' style='solid' hierarchy='accent'>
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </section>
    </div>
  );
}

export default ApplyVerifyEmail;
