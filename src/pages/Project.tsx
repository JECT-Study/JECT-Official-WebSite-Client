import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

import cardSampleImage from '@/assets/CardSample.png';
import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import ApplySnackBar from '@/components/apply/ApplySnackBar';
import LabelButton from '@/components/common/button/LabelButton';
import { Card } from '@/components/common/card/Card';
import EmptyData from '@/components/common/emptyState/EmptyData';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import { Select } from '@/components/common/select/Select';
import Title from '@/components/common/title/Title';
import { APPLY_SNACKBAR } from '@/constants/applyMessages';
import { PATH } from '@/constants/path';
import useCloseOutside from '@/hooks/useCloseOutside';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useProjectListQuery } from '@/hooks/useProjectListQuery';
import { useSemestersQuery } from '@/hooks/useSemestersQuery';

const Project = () => {
  const selectContainerRef = useRef(null);
  const { isOpen: isSelectOpen, setIsOpen: setIsSelectOpen } = useCloseOutside(selectContainerRef);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState<number | null>(null);

  const { data: semestersData } = useSemestersQuery();

  const {
    data: projectsData,
    isError: isProjectsError,
    fetchNextPage: fetchNextProjects,
    hasNextPage: isHasNextProjects,
    isFetchingNextPage: isFetchingNextProjects,
  } = useProjectListQuery(semesterId, 'MAIN');

  const projectsObserverRef = useInfiniteScroll({
    hasNextPage: isHasNextProjects,
    isFetchingNextPage: isFetchingNextProjects,
    fetchNextPage: fetchNextProjects,
  });

  const selectItems = [
    { label: '전체' },
    ...(semestersData?.data.semesterResponses.map(semester => ({
      label: semester.name,
    })) ?? []),
  ];

  useEffect(() => {
    if (!selectedOption || !semestersData) return;

    if (selectedOption === '전체') {
      setSemesterId(null);
      return;
    }

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

  return (
    <div className='gap-12xl flex flex-col items-center px-(--gap-5xl) py-(--gap-12xl)'>
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트</Title>
        <div className='flex w-full flex-col'>
          <div className='gap-4xl flex w-full flex-col'>
            <div className='relative w-fit' ref={selectContainerRef}>
              <LabelButton
                size='lg'
                hierarchy='secondary'
                rightIcon={<Icon name='dropDown' size='md' fillColor='fill-object-neutral-dark' />}
                onClick={() => setIsSelectOpen(prev => !prev)}
              >
                {selectedOption ? selectedOption : '기수'}
              </LabelButton>
              {isSelectOpen && (
                <div className='absolute top-full left-[-9%] z-10 mt-3 w-[7.5rem]'>
                  <Select items={selectItems} onChange={handleSelectChange} />
                </div>
              )}
            </div>

            {isProjectsError ? (
              <EmptyData />
            ) : allProjects.length === 0 ? (
              <div className='flex w-full items-center justify-center py-(--gap-12xl)'>
                <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
                  함께할 프로젝트를 기대하고 있어요
                </Label>
              </div>
            ) : (
              <div className='gap-4xl grid grid-cols-3'>
                {allProjects.map(project => (
                  <Card
                    key={project.id}
                    to={`${PATH.project}/${project.id}`}
                    title={project.name}
                    label={project.summary}
                    imgUrl={project.thumbnailUrl || cardSampleImage}
                  >
                    {project.description}
                  </Card>
                ))}
              </div>
            )}

            {!isProjectsError && allProjects.length > 0 && (
              <div
                ref={projectsObserverRef}
                className='mt-(--gap-md) flex h-[2.5rem] w-full items-center justify-center'
              >
                {isFetchingNextProjects && <Lottie animationData={loadingSpinner} />}
              </div>
            )}
          </div>
        </div>
      </section>
      <ApplySnackBar message={APPLY_SNACKBAR.default} width='w-[31.25rem]' />
    </div>
  );
};

export default Project;
