import { Card, Hero, Title } from "@ject/jds";

import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import useJectalksQuery from "@/hooks/useJectalksQuery";

const LiveSession = () => {
  const { jectalks, isError, isPending } = useJectalksQuery();

  return (
    <div className='bg-(--semantic-surface-standard) mt-(--semantic-spacing-64) flex min-h-dvh flex-col items-center py-(--semantic-margin-2xl)'>
      <section className='flex w-full max-w-[922px] flex-col items-center gap-(--semantic-spacing-32) px-(--semantic-margin-lg) pb-(--semantic-spacing-80) pt-(--semantic-margin-xl)'>
        <div className='flex w-full flex-col items-start gap-(--semantic-spacing-16)'>
          <Hero size='xs' textAlign='left'>
            라이브 세션
          </Hero>
          <Title size='xs' textAlign='left'>
            온/오프라인에서 구성원이 자신의 경험과 기술에 대해 발표하는 콘텐츠입니다.
          </Title>
        </div>

        <div className='flex w-full flex-col gap-(--semantic-spacing-48)'>
          {isError ? (
            <EmptyData />
          ) : isPending ? (
            <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
              <Label
                hierarchy='stronger'
                weight='bold'
                textColor='text-object-assistive-light dark:text-object-assistive-dark'
              >
                로딩 중...
              </Label>
            </div>
          ) : !jectalks || jectalks.length === 0 ? (
            <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
              <Label
                hierarchy='stronger'
                weight='bold'
                textColor='text-object-assistive-light dark:text-object-assistive-dark'
              >
                등록된 라이브 세션이 없습니다
              </Label>
            </div>
          ) : (
            <div className='flex w-full flex-col gap-(--semantic-spacing-16)'>
              {jectalks.map(session => (
                <Card.Preset.Post.Link
                  key={session.id}
                  layout='horizontal'
                  title={session.name}
                  body=''
                  author={session.summary}
                  date='YouTube'
                  href={session.youtubeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  image={{
                    src: session.imageUrl,
                    alt: session.name,
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

export default LiveSession;
