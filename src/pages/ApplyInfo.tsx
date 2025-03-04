import { useState } from 'react';
import { Link } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

// TODO: 이름 필드 요구사항 - 5글자 이내, 영어 불가
// TODO: 전화번호 요구사항 - 숫자 11자리 이내, 010으로 시작, 공백 및 하이픈 허용(자동 제거 후 api 요청)
// TODO: 이름, 전화번호 필수 작성 후 버튼 활성화
// FIXME: 버튼 disabled 상태 UI (현재 아이콘만 UI 적용)

function ApplyInfo() {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <div className='bg-surface-standard-dark gap-9xl flex min-h-dvh flex-col items-center pb-(--gap-12xl)'>
      <div className='mt-(--gap-9xl)'>
        <ProgressIndicator totalStep={3} currentStep={1} />
      </div>
      <main className='gap-9xl flex w-[26.25rem] max-w-[26.25rem] flex-col items-stretch'>
        <div className='self-center'>
          <Title hierarchy='strong'>{APPLY_TITLE.account}</Title>
        </div>
        <form action='' className='gap-3xl flex flex-col'>
          <InputField
            labelText='이름'
            isError={false}
            isSuccess={false}
            placeholder='김젝트'
            required
          />
          <InputField
            labelText='전화번호'
            isError={false}
            isSuccess={false}
            placeholder='01012345678'
            required
          />
        </form>
        <Link to={isReady ? '/apply/verify' : ''}>
          <BlockButton
            size='lg'
            style='solid'
            hierarchy='accent'
            rightIcon={
              <Icon
                name='forward'
                size='md'
                fillColor={
                  isReady ? 'fill-object-static-inverse-hero-dark' : 'fill-accent-trans-hero-dark'
                }
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

export default ApplyInfo;
