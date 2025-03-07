import { useState } from 'react';

import ApplyVerifyEmail from './ApplyVerifyEmail';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

interface ApplyVerifyPinProps {
  email: string;
}

function ApplyVerifyPin({ email }: ApplyVerifyPinProps) {
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [isResetPin, setIsResetPin] = useState(false);

  if (isResetPin) return <ApplyVerifyEmail isResetPin={isResetPin} />;

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <main className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.verifyPIN}</Title>
        <div className='gap-7xl flex flex-col'>
          <form action='' className='gap-xs flex flex-col'>
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
              type='password'
              labelText='PIN'
              isError={false}
              isSuccess={false}
              disabled={false}
              helper=''
              placeholder='설정하셨던 6자리 비밀번호를 입력해주세요'
              InputChildren={<Icon name='visible' size='md' fillColor='fill-object-neutral-dark' />}
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
          <BlockButton disabled={!isStepCompleted} size='lg' style='solid' hierarchy='accent'>
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </main>
    </div>
  );
}

export default ApplyVerifyPin;
