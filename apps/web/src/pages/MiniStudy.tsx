import { Card, Hero, Title } from "@ject/jds";

import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import useMiniStudiesQuery from "@/hooks/useMiniStudiesQuery";

const MiniStudy = () => {
  const { miniStudies, isError, isPending } = useMiniStudiesQuery();

  return (
    <div className='flex min-h-dvh flex-col items-center bg-(--semantic-surface-standard) px-(--semantic-margin-lg) py-(--semantic-margin-2xl) pt-(--semantic-spacing-64)'>
      <section className='flex w-full max-w-[922px] flex-col items-center gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-spacing-80)'>
        <div className='flex w-full flex-col items-start gap-(--semantic-spacing-16)'>
          <Hero size='xs' textAlign='left'>
            미니 스터디
          </Hero>
          <Title size='xs' textAlign='left'>
            활동 중 팀 프로젝트와 병행할 수 있는, 성장을 위한 스터디입니다.
          </Title>
        </div>

        <div className='flex w-full flex-col gap-(--semantic-spacing-48)'>
          {isError ? (
            <EmptyData />
          ) : isPending ? (
            <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
              <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
                로딩 중...
              </Label>
            </div>
          ) : !miniStudies || miniStudies.length === 0 ? (
            <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
              <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
                등록된 미니 스터디가 없습니다
              </Label>
            </div>
          ) : (
            <div className='flex w-full flex-col gap-(--semantic-spacing-16)'>
              {miniStudies.map(study => (
                <Card.Preset.Post.Link
                  key={study.id}
                  layout='horizontal'
                  title={study.name}
                  body={study.summary}
                  author={study.tag}
                  date=''
                  href={study.linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  image={{
                    src: study.imageUrl,
                    alt: study.name,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MiniStudy;
