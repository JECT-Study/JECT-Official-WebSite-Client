import { Card, Hero, Select, SelectField, Title } from "@jects/jds";
import Lottie from "lottie-react";
import { useState, useRef } from "react";

import loadingSpinner from "@/assets/lottie/ject-loadingSpinner.json";
import PageHeroContainer from "@/components/layout/PageHeroContainer";
import PageModule from "@/components/layout/PageModule";
import useCloseOutside from "@/hooks/useCloseOutside";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useProjectListQuery } from "@/hooks/useProjectListQuery";
import type { Project, ProjectCategory } from "@/types/apis/project";

const semesters: { label: string; category: ProjectCategory; count: number }[] = [
  { label: "4기", category: "SEMESTER_4", count: 6 },
  { label: "3기", category: "SEMESTER_3", count: 6 },
  { label: "2기", category: "SEMESTER_2", count: 2 },
  { label: "1기", category: "SEMESTER_1", count: 4 },
];

const totalCount = semesters.reduce((sum, semester) => sum + semester.count, 0);

const semesterOptions: { label: string; category: ProjectCategory }[] = [
  { label: `전체(${totalCount})`, category: null },
  ...semesters.map(({ label, category, count }) => ({
    label: `${label}(${count})`,
    category,
  })),
];

const semesterMap: Record<string, ProjectCategory> = Object.fromEntries(
  semesterOptions.map(({ label, category }) => [label, category]),
);

const TeamProject = () => {
  const [value, setValue] = useState(semesterOptions[0].label);
  const selectRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);

  const handleSelect = (newValue: string) => {
    setValue(newValue);
    setIsOpen(false);
  };

  const {
    data: projectsData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectListQuery(semesterMap[value]);

  const projectsObserverRef = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allProjects: Project[] = projectsData?.pages.flatMap(page => page.content) ?? [];

  return (
    <PageModule>
      <PageHeroContainer>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16)'>
          <Hero size='xs' textAlign='left'>
            팀 프로젝트
          </Hero>
          <Title size='xs' textAlign='left'>
            젝트에서 진행한 팀 프로젝트들을 소개합니다.
          </Title>
        </div>
        <div className='relative w-40' ref={selectRef}>
          <SelectField value={value} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && (
            <div className='absolute z-40 w-full translate-y-2'>
              <Select variant='list' value={value} onChange={handleSelect}>
                {semesterOptions.map(({ label }) => (
                  <Select.Label key={label} value={label}>
                    {label}
                  </Select.Label>
                ))}
              </Select>
            </div>
          )}
        </div>
      </PageHeroContainer>

      <div>
        {isLoading && (
          <div className='flex h-40 w-full items-center justify-center'>
            <Lottie animationData={loadingSpinner} />
          </div>
        )}

        {!isLoading && (
          <>
            <div className='desktop:grid-cols-3 tablet:grid-cols-2 grid gap-x-5 gap-y-6'>
              {allProjects.map(project => (
                <div key={project.id} className='w-full'>
                  <Card.Preset.PlateWithTitle.Link
                    href={`/project/${project.id}`}
                    layout='vertical'
                    image={
                      project.thumbnailUrl
                        ? { src: project.thumbnailUrl, alt: project.summary }
                        : undefined
                    }
                    title={project.name}
                    body={project.description}
                    caption={project.serviceType}
                  />
                </div>
              ))}
            </div>

            {!isError && allProjects.length > 0 && (
              <div
                ref={projectsObserverRef}
                className='mt-6 flex h-10 w-full items-center justify-center'
              >
                {isFetchingNextPage && <Lottie animationData={loadingSpinner} />}
              </div>
            )}
          </>
        )}
      </div>
    </PageModule>
  );
};

export default TeamProject;
