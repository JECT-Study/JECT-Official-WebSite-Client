import { useState } from 'react';
import { Link } from 'react-router-dom';

import QuestionsByPosition from '@/components/apply/QuestionsByPosition';
import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/Title';
import { APPLY_STEP3 } from '@/constants/applyPageData';

// TODO: 직군 선택 후 QuestionsByPosition 렌더링
// TODO: select UI 구현

function ApplyRegistration() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string | null>(null);

  return (
    <div className='bg-surface-standard-dark gap-9xl flex min-h-dvh flex-col items-center pb-(--gap-12xl)'>
      <div className='mt-(--gap-9xl)'>
        <ProgressIndicator totalStep={3} currentStep={3} />
      </div>
      <main className='gap-9xl flex flex-col items-stretch'>
        <section id='selectJopGroup' className='gap-9xl flex w-[26.25rem] flex-col self-center'>
          <div className='self-center'>
            <Title hierarchy='strong'>{APPLY_STEP3}</Title>
          </div>
          <form action='' className='gap-xs flex flex-col'>
            <InputField
              required
              labelText='직군'
              isError={false}
              isSuccess={false}
              placeholder='직군을 선택해주세요'
              className='group'
              InputChildren={
                <Icon
                  name='dropDown'
                  size='lg'
                  fillColor='fill-object-assistive-dark group-focus-within:fill-object-neutral-dark'
                />
              }
            />
          </form>
        </section>
        <div className='border-border-trans-alternative-dark border-b'></div>
        <section id='answer'>
          <QuestionsByPosition position='' setAnswers={setAnswers} />
        </section>
        <section id='button' className='gap-md flex w-[26.25rem] self-center'>
          <div className='grow'>
            <BlockButton size='lg' style='solid' hierarchy='secondary' className='w-full'>
              임시 저장하기
            </BlockButton>
          </div>
          <div className='grow'>
            <Link to={isReady ? '/apply/complete' : ''}>
              <BlockButton size='lg' style='solid' hierarchy='accent' className='w-full'>
                지원서 제출하기
              </BlockButton>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ApplyRegistration;
