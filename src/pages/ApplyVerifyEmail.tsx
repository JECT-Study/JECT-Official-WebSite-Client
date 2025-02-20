import { useState } from 'react';
import { Link } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

// TODO: 이메일 형식 예외처리
// TODO: 인증 코드 예외처리
// TODO: 각 inputField 성공/실패 처리 (input, helper, button .. )
// TODO: 인증 성공 후 다음 단계 버튼 활성화

function ApplyVerifyEmail() {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <div className='bg-surface-standard-dark gap-9xl flex min-h-dvh flex-col items-center pb-(--gap-12xl)'>
      <div className='mt-(--gap-9xl)'>
        <ProgressIndicator totalStep={3} currentStep={2} />
      </div>
      <main className='gap-9xl flex w-[26.25rem] flex-col items-stretch'>
        <div className='self-center'>
          <Title hierarchy='strong'>{APPLY_TITLE.verifyEmail}</Title>
        </div>
        <form action='' className='gap-xs flex flex-col'>
          <InputField
            required
            type='email'
            labelText='이메일'
            isError={false}
            isSuccess={false}
            helper=''
            placeholder='enjoyject@google.com'
          >
            <BlockButton size='lg' style='solid' hierarchy='secondary' className='h-full'>
              인증번호 발송
            </BlockButton>
          </InputField>
          <InputField
            required
            isError={false}
            isSuccess={false}
            disabled={false}
            helper=''
            placeholder='이메일 주소로 발송된 인증번호를 입력해주세요'
            InputChildren={
              <LabelButton size='md' hierarchy='accent'>
                인증하기
              </LabelButton>
            }
          />
        </form>
        <Link to={isReady ? '/apply/step3' : ''}>
          <BlockButton
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
        </Link>
      </main>
    </div>
  );
}

export default ApplyVerifyEmail;
