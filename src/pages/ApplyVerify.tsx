import { useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

function ApplyVerify() {
  const [isReady, setIsReady] = useState(false);
  const [isNewApplicant, setIsNewApplicant] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <main className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>
          {isNewApplicant ? APPLY_TITLE.verifyEmail : APPLY_TITLE.verifyPIN}
        </Title>
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
                disabled={true}
              >
                {!isNewApplicant ? '인증 완료됨 ' : step > 1 ? '인증번호 발송됨' : '인증번호 받기'}
              </BlockButton>
            </InputField>
            {isNewApplicant && step > 1 && (
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
            {(!isNewApplicant || step > 2) && (
              <InputField
                type='password'
                labelText='PIN'
                isError={false}
                isSuccess={false}
                disabled={false}
                helper=''
                placeholder={
                  isNewApplicant
                    ? '설정하셨던 6자리 비밀번호를 입력해주세요'
                    : '본인 확인용 6자리 비밀번호를 설정해주세요'
                }
                InputChildren={
                  <Icon name='visible' size='md' fillColor='fill-object-neutral-dark' />
                }
              />
            )}
          </form>
          {!isNewApplicant ? (
            <div className='gap-3xs flex self-center *:last:cursor-pointer *:last:underline'>
              <Label hierarchy='weak' weight='normal' textColor='text-object-alternative-dark'>
                혹시 PIN을 잊어버리셨나요?
              </Label>
              <Label hierarchy='weak' weight='normal' textColor='text-feedback-information-dark'>
                PIN 다시 설정하기
              </Label>
            </div>
          ) : (
            step > 1 && (
              <div className='gap-2xs flex'>
                <div className='gap-2xs flex flex-1'>
                  <Label hierarchy='strong' weight='normal' textColor='text-object-assistive-dark'>
                    [필수] 젝트 개인정보 수집 및 이용 동의
                  </Label>
                </div>
                <Icon name='rightChevron' size='lg' fillColor='fill-object-assistive-dark' />
              </div>
            )
          )}

          <BlockButton disabled={!isReady} size='lg' style='solid' hierarchy='accent'>
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </main>
    </div>
  );
}

export default ApplyVerify;
