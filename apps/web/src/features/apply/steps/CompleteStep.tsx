import { BlockButton, Image, LocalNavigation, Title } from "@ject/jds";
import { useNavigate } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import completeImage from "@/assets/images/complete.png";
import { APPLY_TITLE, findJobFamilyOption } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";

interface CompleteStepProps {
  jobFamily: JobFamily;
}

export function CompleteStep({ jobFamily }: CompleteStepProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    void navigate(`${PATH.applyGuide}/${jobFamily}`);
  };

  const handleGoHome = () => {
    void navigate(PATH.main);
  };

  return (
    <div className='max-w-[656px] px-(--semantic-margin-lg)'>
      <header className='w-full'>
        <LocalNavigation.Root isStretched={true}>
          <LocalNavigation.BackButton onClick={handleBack} />
          <LocalNavigation.Title>
            {findJobFamilyOption(jobFamily).navigationTitle}
          </LocalNavigation.Title>
        </LocalNavigation.Root>
      </header>

      <div className='flex flex-col items-start gap-(--semantic-margin-3xl) self-stretch pt-(--semantic-margin-3xl)'>
        <Image
          src={completeImage}
          alt='지원 완료'
          orientation='landscape'
          ratio='9:21'
          isReadonly
          badgeVisible={false}
        />

        <div className='flex flex-col gap-(--semantic-spacing-24)'>
          <Title size='md' textAlign='left'>
            {APPLY_TITLE.complete}
          </Title>
          <p className='semantic-textStyle-body-sm-normal text-(--semantic-object-bold)'>
            젝트에 관심을 갖고 지원해주셔서 감사드립니다!
            <br />
            작성해 주신 지원서는 꼼꼼히 확인할 예정이며, 함께 활동하게 될 날들을 기대하겠습니다.
          </p>
        </div>

        <BlockButton.Basic
          type='button'
          size='md'
          variant='solid'
          hierarchy='accent'
          onClick={handleGoHome}
        >
          메인 페이지로 이동하기
        </BlockButton.Basic>
      </div>
    </div>
  );
}
