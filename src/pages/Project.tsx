import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

import cardSampleImage from '@/assets/CardSample.png';
import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import ApplySnackBar from '@/components/apply/ApplySnackBar';
import LabelButton from '@/components/common/button/LabelButton';
import { Card } from '@/components/common/card/Card';
import Icon from '@/components/common/icon/Icon';
import { Post } from '@/components/common/post/Post';
import { Select } from '@/components/common/select/Select';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { APPLY_SNACKBAR } from '@/constants/applyMessages';
import { PATH } from '@/constants/path';
import { useProjectReviews } from '@/hooks/useProjectReviewsQuery';

const projectCardData = [
  {
    id: 1,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectAName',
    summary: 'Project A에 대한 간단한 설명입니다.',
  },
  {
    id: 2,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectBName',
    summary: 'Project B에 대한 간단한 설명입니다.',
  },
  {
    id: 3,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectCName',
    summary: 'Project C에 대한 간단한 설명입니다.',
  },
  {
    id: 4,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectDName',
    summary: 'Project D에 대한 간단한 설명입니다.',
  },
  {
    id: 5,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectEName',
    summary: 'Project E에 대한 간단한 설명입니다.',
  },
  {
    id: 6,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectFName',
    summary: 'Project F에 대한 간단한 설명입니다.',
  },
];

const hackathonCardData = [
  {
    id: 1,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonAName',
    summary: 'Hackathon A에 대한 간단한 설명입니다.',
  },
  {
    id: 2,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonBName',
    summary: 'Hackathon B에 대한 간단한 설명입니다.',
  },
  {
    id: 3,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonCName',
    summary: 'Hackathon C에 대한 간단한 설명입니다.',
  },
  {
    id: 4,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonDName',
    summary: 'Hackathon D에 대한 간단한 설명입니다.',
  },
  {
    id: 5,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonEName',
    summary: 'Hackathon E에 대한 간단한 설명입니다.',
  },
  {
    id: 6,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonFName',
    summary: 'Hackathon F에 대한 간단한 설명입니다.',
  },
];

const selectItems = [{ label: '1기' }, { label: '2기' }, { label: '3기' }];

const Project = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectReviews();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleSelectChange = (label: string | null) => {
    setSelectedOption(label);
    setIsSelectOpen(false);
  };

  const allReviews = reviewsData?.pages.flatMap(page => page.data.content) || [];

  return (
    <div className='gap-12xl flex flex-col items-center px-(--gap-5xl) py-(--gap-12xl)'>
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트</Title>
        <div className='flex w-full flex-col'>
          <Tab>
            <div className='gap-4xl flex w-full flex-col'>
              <TabHeader>
                <TabItem id={0} label='프로젝트' />
                <TabItem id={1} label='해커톤' disabled />
              </TabHeader>
              <div className='relative w-fit'>
                <LabelButton
                  size='lg'
                  hierarchy='secondary'
                  rightIcon={
                    <Icon name='dropDown' size='md' fillColor='fill-object-neutral-dark' />
                  }
                  onClick={() => setIsSelectOpen(prev => !prev)}
                >
                  {selectedOption ? selectedOption : '기수 선택'}
                </LabelButton>
                {isSelectOpen && (
                  <div className='absolute top-full left-[-9%] z-10 mt-3 w-[7.5rem]'>
                    <Select items={selectItems} onChange={handleSelectChange} />
                  </div>
                )}
              </div>
              <TabPanel id={0}>
                <div className='gap-4xl grid grid-cols-3'>
                  {projectCardData.map(card => (
                    <Card
                      key={card.id}
                      to={`${PATH.project}/${card.id}`}
                      title={card.name}
                      label={card.name}
                      imgUrl={card.thumbnailUrl}
                    >
                      {card.summary}
                    </Card>
                  ))}
                </div>
              </TabPanel>
              <TabPanel id={1}>
                <div className='gap-4xl grid grid-cols-3'>
                  {hackathonCardData.map(card => (
                    <Card
                      key={card.id}
                      to={`${PATH.jeckathon}/${card.id}`}
                      title={card.name}
                      label={card.name}
                      imgUrl={card.thumbnailUrl}
                    >
                      {card.summary}
                    </Card>
                  ))}
                </div>
              </TabPanel>
            </div>
          </Tab>
        </div>
      </section>
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트 후기</Title>

        {isReviewsError ? (
          <div className='w-full py-8 text-center text-red-500'>
            후기를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : (
          <>
            <div className='gap-2xl flex w-full flex-col'>
              {allReviews.length === 0 && isReviewsLoading ? (
                <div className='w-full py-8 text-center'>
                  <Lottie
                    animationData={loadingSpinner}
                    style={{ width: 100, height: 100, margin: '0 auto' }}
                  />
                </div>
              ) : allReviews.length === 0 ? (
                <div className='w-full py-8 text-center text-gray-500'>
                  등록된 프로젝트 후기가 없습니다.
                </div>
              ) : (
                allReviews.map(review => (
                  <Post key={review.id} href={review.linkUrl} title={review.title} label='바로가기'>
                    {review.summary}
                  </Post>
                ))
              )}
            </div>

            {/* 무한 스크롤을 위한 observer 타겟 */}
            <div ref={observerTarget} className='mt-4 flex h-10 w-full items-center justify-center'>
              {isFetchingNextPage && (
                <Lottie animationData={loadingSpinner} style={{ width: 50, height: 50 }} />
              )}
            </div>
          </>
        )}
      </section>
      <ApplySnackBar message={APPLY_SNACKBAR.default} width='w-[31.25rem]' />
    </div>
  );
};

export default Project;
