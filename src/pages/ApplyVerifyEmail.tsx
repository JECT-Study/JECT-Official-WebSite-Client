import { useState } from 'react';

import ApplyVerifyPin from './ApplyVerifyPin';

import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

function ApplyVerifyEmail() {
  const [isStepCompleted , setIsStepCompleted] = useState(false);
  const [isNewApplicant, setIsNewApplicant] = useState<boolean | null>(null);
  const [step, setStep] = useState(3);

  if (isNewApplicant === false) return <ApplyVerifyPin email={'userEmail@google.com'} />;

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <main className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.verifyEmail}</Title>
        <div className='gap-7xl flex flex-col'>
          <form action='' className='gap-xs flex flex-col'>
            <InputField
              type='email'
              labelText='이메일'
              isError={false}
              isSuccess={false}
              disabled={!isNewApplicant}
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
          {step > 1 && (
            <div className='gap-2xs flex *:last:cursor-pointer'>
              <div className='gap-2xs flex flex-1 '>
                <Label hierarchy='strong' weight='normal' textColor='text-object-assistive-dark'>
                  [필수] 젝트 개인정보 수집 및 이용 동의
                </Label>
              </div>
              <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
            </div>
          )}
          <BlockButton disabled={!isStepCompleted} size='lg' style='solid' hierarchy='accent'>
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </main>
    </div>
  );
}

export default ApplyVerifyEmail;
