import { BlockButton, Hero, IconButton, Label, LocalNavigation, Tab, Title } from "@ject/jds";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { findJobFamilyOption, JOB_FAMILY_OPTIONS } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";

const VALID_JOB_FAMILIES = JOB_FAMILY_OPTIONS.map(opt => opt.value);

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function ApplyGuidePage() {
  const navigate = useNavigate();
  const { jobFamily } = useParams();

  if (!isValidJobFamily(jobFamily)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  const handleApply = () => {
    void navigate(`${PATH.applyFunnel}/${jobFamily}`);
  };

  const handleContinue = () => {
    void navigate(`${PATH.applyContinue}/${jobFamily}?step=PROFILE`);
  };

  const handleBack = () => {
    void navigate(PATH.main);
  };

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className='flex max-w-[656px] flex-col items-start px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
      <LocalNavigation.Root>
        <LocalNavigation.BackButton onClick={handleBack} />
        <LocalNavigation.Title>지원 안내</LocalNavigation.Title>
      </LocalNavigation.Root>

      <section className='flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
        <div className='flex items-center justify-between'>
          <Hero size='xs' textAlign='left'>
            JECT 5기 {findJobFamilyOption(jobFamily).korean} 모집
          </Hero>
          <IconButton.Basic
            icon='link-line'
            size='2xl'
            hierarchy='tertiary'
            onClick={handleCopyUrl}
            aria-label='URL 복사'
          />
        </div>

        <Label as='span' size='md' weight='normal'>
          2025.01.01 ~ 2025.01.31
        </Label>

        <div className='flex gap-3'>
          <BlockButton.Basic variant='outlined' size='lg' onClick={handleContinue}>
            이어서 작성하기
          </BlockButton.Basic>
          <BlockButton.Basic variant='solid' size='lg' onClick={handleApply}>
            지원서 작성하기
          </BlockButton.Basic>
        </div>
      </section>

      <section className='flex flex-col gap-(--semantic-spacing-48)'>
        <Tab.Root defaultValue='overview'>
          <Tab.List>
            <Tab.Trigger value='overview'>모집 개요</Tab.Trigger>
            <Tab.Trigger value='qualification'>지원 자격</Tab.Trigger>
            <Tab.Trigger value='activity'>활동 안내</Tab.Trigger>
          </Tab.List>

          <Tab.Content value='overview'>
            <div className='flex flex-col gap-4 py-4'>
              <Title size='sm' textAlign='left'>
                모집 분야
              </Title>
              <p className='body-lg text-object-normal-dark'>
                {findJobFamilyOption(jobFamily).english} 포지션을 모집합니다.
              </p>

              <Title size='sm' textAlign='left'>
                모집 기간
              </Title>
              <p className='body-lg text-object-normal-dark'>2025년 1월 1일 ~ 2025년 1월 31일</p>

              <Title size='sm' textAlign='left'>
                모집 인원
              </Title>
              <p className='body-lg text-object-normal-dark'>00명 내외</p>
            </div>
          </Tab.Content>

          <Tab.Content value='qualification'>
            <div className='flex flex-col gap-4 py-4'>
              <Title size='sm' textAlign='left'>
                필수 자격
              </Title>
              <p className='body-lg text-object-normal-dark'>
                - 주 1회 정기 모임에 참여 가능한 분
                <br />
                - 팀 프로젝트에 적극적으로 참여할 수 있는 분
                <br />- 6개월간 활동에 참여할 수 있는 분
              </p>

              <Title size='sm' textAlign='left'>
                우대 사항
              </Title>
              <p className='body-lg text-object-normal-dark'>
                - 관련 프로젝트 경험이 있으신 분
                <br />- 오픈소스 기여 경험이 있으신 분
              </p>
            </div>
          </Tab.Content>

          <Tab.Content value='activity'>
            <div className='flex flex-col gap-4 py-4'>
              <Title size='sm' textAlign='left'>
                활동 기간
              </Title>
              <p className='body-lg text-object-normal-dark'>2025년 2월 ~ 2025년 7월 (약 6개월)</p>

              <Title size='sm' textAlign='left'>
                활동 내용
              </Title>
              <p className='body-lg text-object-normal-dark'>
                - 팀 프로젝트 진행
                <br />
                - 스터디 및 세미나 참여
                <br />- 네트워킹 행사 참여
              </p>

              <Title size='sm' textAlign='left'>
                혜택
              </Title>
              <p className='body-lg text-object-normal-dark'>
                - 수료증 발급
                <br />- 우수 활동자 시상
              </p>
            </div>
          </Tab.Content>
        </Tab.Root>
      </section>
    </div>
  );
}

export default ApplyGuidePage;
