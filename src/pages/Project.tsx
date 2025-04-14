import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

import cardSampleImage from '@/assets/CardSample.png';
import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import ApplySnackBar from '@/components/apply/ApplySnackBar';
import LabelButton from '@/components/common/button/LabelButton';
import { Card } from '@/components/common/card/Card';
import EmptyData from '@/components/common/emptyState/EmptyData';
import Icon from '@/components/common/icon/Icon';
import { Post } from '@/components/common/post/Post';
import { Select } from '@/components/common/select/Select';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { APPLY_SNACKBAR } from '@/constants/applyMessages';
import { PATH } from '@/constants/path';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useProjectListQuery } from '@/hooks/useProjectListQuery';
import { useProjectReviewsQuery } from '@/hooks/useProjectReviewsQuery';
import { useSemestersQuery } from '@/hooks/useSemestersQuery';

const Project = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState(1);

  const { data: semestersData } = useSemestersQuery();

  const {
    data: projectsData,
    isError: isProjectsError,
    fetchNextPage: fetchNextProjects,
    hasNextPage: isHasNextProjects,
    isFetchingNextPage: isFetchingNextProjects,
  } = useProjectListQuery(semesterId, 'MAIN');

  const {
    data: reviewsData,
    isError: isReviewsError,
    fetchNextPage: fetchNextReviews,
    hasNextPage: isHasNextReviews,
    isFetchingNextPage: isFetchingNextReviews,
  } = useProjectReviewsQuery();

  const projectsObserverRef = useInfiniteScroll({
    hasNextPage: isHasNextProjects,
    isFetchingNextPage: isFetchingNextProjects,
    fetchNextPage: fetchNextProjects,
  });

  const reviewsObserverRef = useInfiniteScroll({
    hasNextPage: isHasNextReviews,
    isFetchingNextPage: isFetchingNextReviews,
    fetchNextPage: fetchNextReviews,
  });

  const selectItems =
    semestersData?.data.semesterResponses.map(semester => ({
      label: semester.name,
    })) ?? [];

  useEffect(() => {
    if (!selectedOption || !semestersData) return;

    const semester = semestersData.data.semesterResponses.find(s => s.name === selectedOption);
    if (semester) {
      setSemesterId(semester.id);
    }
  }, [selectedOption, semestersData]);

  const handleSelectChange = (label: string | null) => {
    setSelectedOption(label);
    setIsSelectOpen(false);
  };

  const allProjects = projectsData?.pages.flatMap(page => page.data.content) || [];

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
                {isProjectsError || allProjects.length === 0 ? (
                  <EmptyData />
                ) : (
                  <div className='gap-4xl grid grid-cols-3'>
                    {allProjects.map(project => (
                      <Card
                        key={project.id}
                        to={`${PATH.project}/${project.id}`}
                        title={project.name}
                        label={project.name}
                        imgUrl={project.thumbnailUrl || cardSampleImage}
                      >
                        {project.summary}
                      </Card>
                    ))}
                  </div>
                )}
              </TabPanel>

              <TabPanel id={1}>
                {isProjectsError || allProjects.length === 0 ? (
                  <EmptyData />
                ) : (
                  <div className='gap-4xl grid grid-cols-3'>
                    {allProjects.map(project => (
                      <Card
                        key={project.id}
                        to={`${PATH.jeckathon}/${project.id}`}
                        title={project.name}
                        label={project.name}
                        imgUrl={project.thumbnailUrl || cardSampleImage}
                      >
                        {project.summary}
                      </Card>
                    ))}
                  </div>
                )}
              </TabPanel>

              {!isProjectsError && allProjects.length > 0 && (
                <div
                  ref={projectsObserverRef}
                  className='mt-(--gap-md) flex h-[2.5rem] w-full items-center justify-center'
                >
                  {isFetchingNextProjects && <Lottie animationData={loadingSpinner} />}
                </div>
              )}
            </div>
          </Tab>
        </div>
      </section>

      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트 후기</Title>

        {isReviewsError || allReviews.length === 0 ? (
          <EmptyData />
        ) : (
          <>
            <div className='gap-2xl flex w-full flex-col'>
              {allReviews.map(review => (
                <Post key={review.id} href={review.linkUrl} title={review.title} label='바로가기'>
                  {review.summary}
                </Post>
              ))}
            </div>
            <div
              ref={reviewsObserverRef}
              className='mt-(--gap-md) flex h-[2.5rem] w-full items-center justify-center'
            >
              {isFetchingNextReviews && <Lottie animationData={loadingSpinner} />}
            </div>
          </>
        )}
      </section>
      <ApplySnackBar message={APPLY_SNACKBAR.default} width='w-[31.25rem]' />
    </div>
  );
};

export default Project;
