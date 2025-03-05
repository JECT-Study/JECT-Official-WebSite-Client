import { useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

// TODO: 이름 필드 요구사항 - 5글자 이내, 영어 불가
// TODO: 전화번호 요구사항 - 숫자 11자리 이내, 010으로 시작, 공백 및 하이픈 허용(자동 제거 후 api 요청)
// TODO: 이름, 전화번호 필수 작성 후 버튼 활성화

function ApplyApplicantInfo() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={2} />
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.applicantInfo}</Title>
        <form action='' className='gap-3xl flex flex-col'>
          <InputField
            labelText='이름'
            isError={false}
            isSuccess={false}
            placeholder='김젝트'
            // helper='이름은 5자 이내로 작성해주세요'
          />
          <InputField
            labelText='휴대폰 번호'
            isError={false}
            isSuccess={false}
            placeholder='01012345678'
            // helper='“010”을 포함해 총 11자리까지만 입력해주세요.'
          />
        </form>
        <BlockButton
          disabled={!isReady}
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
        >
          다음 단계로 진행하기
        </BlockButton>
      </section>
    </div>
  );
}

export default ApplyApplicantInfo;
