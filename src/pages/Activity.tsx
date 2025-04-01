import ApplySnackBar from '@/components/apply/ApplySnackBar';
import { Card } from '@/components/common/card/Card';
import EmptyData from '@/components/common/emptyState/EmptyData';
import Title from '@/components/common/title/Title';
import { APPLY_SNACKBAR } from '@/constants/applyMessages';
import useJectalks from '@/hooks/useJectalksQuery';
import useMiniStudies from '@/hooks/useMiniStudiesQuery';

function Activity() {
  const { miniStudies } = useMiniStudies();
  const { jectalks } = useJectalks();

  return (
    <div className='gap-12xl flex flex-col items-center py-(--gap-12xl)'>
      <section className='gap-8xl flex flex-col items-center'>
        <Title hierarchy='strong'>미니 스터디</Title>
        {miniStudies && miniStudies.length > 0 ? (
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
        {jectalks && jectalks.length > 0 ? (
          <div className='gap-4xl grid max-w-[60rem] grid-cols-3'>
            {jectalks.map(jectalk => (
              <Card
                key={jectalk.id}
                to={jectalk.youtubeUrl}
                title={jectalk.name}
                label={jectalk.summary}
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
      <ApplySnackBar message={APPLY_SNACKBAR.default} width='w-[31.25rem]' />
    </div>
  );
}

export default Activity;
