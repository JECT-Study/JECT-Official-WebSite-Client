import { Card, Hero, Title } from "@jects/jds";

import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import PageBoard from "@/components/layout/PageBoard";
import PageHeroContainer from "@/components/layout/PageHeroContainer";
import PageModule from "@/components/layout/PageModule";
import useMiniStudiesQuery from "@/hooks/useMiniStudiesQuery";

const MiniStudy = () => {
  const { miniStudies, isError, isPending } = useMiniStudiesQuery();

  return (
    <PageBoard>
      <PageModule>
        <PageHeroContainer>
          <div className='flex flex-col items-start gap-(--semantic-spacing-16)'>
            <Hero size='xs' textAlign='left'>
              미니 스터디
            </Hero>
            <Title size='xs' textAlign='left'>
              활동 중 팀 프로젝트와 병행할 수 있는, 성장을 위한 스터디입니다.
            </Title>
          </div>
        </PageHeroContainer>

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
      </PageModule>
    </PageBoard>
  );
};

export default MiniStudy;
