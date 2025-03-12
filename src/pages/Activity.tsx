import { Card } from '@/components/common/card/Card';
import EmptyData from '@/components/common/emptyState/EmptyData';
import Title from '@/components/common/title/Title';
import useJectalks from '@/hooks/useJectalks';
import useMiniStudies from '@/hooks/useMiniStudies';

function Activity() {
  const { miniStudies } = useMiniStudies();
  const { jectalks } = useJectalks();

  return (
    <div className='gap-12xl flex flex-col items-center py-(--gap-12xl)'>
      <section className='gap-8xl flex flex-col items-center'>
        <Title hierarchy='strong'>미니 스터디</Title>
        {miniStudies ? (
          <div className='gap-4xl grid max-w-[60rem] grid-cols-3'>
            {miniStudies.map(study => (
              <Card
                key={study.id}
                to={study.linkUrl}
                title={study.name}
                label={study.summary}
                imgUrl={study.imageUrl}
                isDescriptionVisible={false}
                target='_blank'
                rel='noopener noreferrer'
              >
                ''
              </Card>
            ))}
          </div>
        ) : (
          <EmptyData />
        )}
      </section>
      <section className='gap-8xl flex flex-col items-center'>
        <Title hierarchy='strong'>JECTALK</Title>
        {jectalks ? (
          <div className='gap-4xl grid max-w-[60rem] grid-cols-3'>
            {jectalks.map(jectalk => (
              <Card
                key={jectalk.id}
                to={jectalk.youtubeUrl}
                title={jectalk.name}
                label={jectalk.name}
                imgUrl={jectalk.imageUrl}
                isDescriptionVisible={false}
                target='_blank'
                rel='noopener noreferrer'
              >
                ''
              </Card>
            ))}
          </div>
        ) : (
          <EmptyData />
        )}
      </section>
    </div>
  );
}

export default Activity;
