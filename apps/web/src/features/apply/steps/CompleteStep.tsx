import { BlockButton, Icon, LocalNavigation, Title } from "@ject/jds";
import { useNavigate } from "react-router-dom";

import { APPLY_TITLE, findJobFamilyOption } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";
import type { JobFamily } from "@/types/apis/application";

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
    <div className='flex min-h-screen flex-col'>
      <header className='w-full'>
        <div className='mx-auto w-full max-w-130 px-4'>
          <LocalNavigation.Root>
            <LocalNavigation.BackButton onClick={handleBack} />
            <LocalNavigation.Title>{findJobFamilyOption(jobFamily).navigationTitle}</LocalNavigation.Title>
          </LocalNavigation.Root>
        </div>
      </header>

      <div className='gap-9xl flex flex-1 flex-col items-center justify-center px-(--gap-4xl) pb-(--gap-12xl)'>
        <section className='gap-9xl flex w-full max-w-105 flex-col items-center text-center'>
          <div className='bg-accent-trans-hero-dark flex h-20 w-20 items-center justify-center rounded-full'>
            <Icon name='check-line' size='xl' color='var(--color-accent-hero-dark)' />
          </div>

          <div className='gap-md flex flex-col'>
            <Title size='md' textAlign='center'>
              {APPLY_TITLE.complete}
            </Title>
            <p className='text-body-md-normal text-object-alternative-dark'>
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
        </section>
      </div>
    </div>
  );
}
