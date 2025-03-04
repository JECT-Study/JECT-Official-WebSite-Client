import { useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

// TODO: 이메일 형식 예외처리
// TODO: 인증 코드 예외처리
// TODO: 각 inputField 성공/실패 처리 (input, helper, button .. )
// TODO: 인증 성공 후 다음 단계 버튼 활성화

function ApplyVerify() {
  const [isReady, setIsReady] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className='bg-surface-standard-dark gap-9xl flex min-h-dvh flex-col items-center pb-(--gap-12xl)'>
      <div className='mt-(--gap-9xl)'>
        <ProgressIndicator totalStep={3} currentStep={1} />
      </div>
      <main className='gap-9xl flex w-[26.25rem] flex-col items-stretch'>
        <div className='self-center'>
          <Title hierarchy='strong'>
            {isExist ? APPLY_TITLE.verifyPIN : APPLY_TITLE.verifyEmail}
          </Title>
        </div>
        <div className='gap-7xl flex flex-col'>
          <form action='' className='gap-xs flex flex-col'>
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
                disabled
              >
                {step > 1 ? '인증번호 발송됨' : '인증번호 받기'}
              </BlockButton>
            </InputField>
            {!isExist && step > 1 && (
              <InputField
                labelText='인증번호'
                isError={false}
                isSuccess={true}
                disabled={true}
                helper={step > 2 ? '인증이 완료되었어요' : ''}
                placeholder='이메일 주소로 발송된 인증번호 6자리를 입력해주세요'
                InputChildren={
                  <LabelButton size='md' hierarchy='accent'>
                    {step > 2 ? '인증 완료됨' : '인증 하기'}
                  </LabelButton>
                }
              />
            )}
            {(isExist || step > 2) && (
              <InputField
                type='password'
                labelText='PIN'
                isError={false}
                isSuccess={false}
                disabled={false}
                helper=''
                placeholder={
                  isExist
                    ? '설정하셨던 6자리 비밀번호를 입력해주세요'
                    : '본인 확인용 6자리 비밀번호를 설정해주세요'
                }
                InputChildren={
                  <Icon name='github' size='md' fillColor='fill-object-neutral-dark' />
                }
              />
            )}
          </form>
          {isExist ? (
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
                <Icon name='forward' size='lg' fillColor='fill-object-assistive-dark' />
              </div>
            )
          )}

          <BlockButton
            disabled={!isReady}
            size='lg'
            style='solid'
            hierarchy='accent'
            rightIcon={
              <Icon
                name='forward'
                size='md'
                fillColor={`${isReady ? 'fill-object-static-inverse-hero-dark' : 'fill-accent-trans-hero-dark'}`}
              />
            }
            className='w-full'
          >
            다음 단계로 진행하기
          </BlockButton>
        </div>
      </main>
    </div>
  );
}

export default ApplyVerify;
