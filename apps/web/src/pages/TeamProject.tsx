import { Card, Hero, Select, SelectField, Title } from "@ject/jds";
import Lottie from "lottie-react";
import { useState, useRef, useEffect } from "react";

import loadingSpinner from "@/assets/lottie/ject-loadingSpinner.json";
import useCloseOutside from "@/hooks/useCloseOutside";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useProjectListQuery } from "@/hooks/useProjectListQuery";
import type { Project } from "@/types/apis/project";

const semesterMap: Record<string, number | null> = {
  "전체(12)": null,
  "3기(6)": 3,
  "2기(2)": 2,
  "1기(4)": 1,
};

const TeamProject = () => {
  const [value, setValue] = useState("전체(12)");
  const selectRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);

  const handleSelect = (newValue: string) => {
    setValue(newValue);
    setIsOpen(false);
  };

  const {
    data: projectsData,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectListQuery(semesterMap[value], "MAIN");

  const projectsObserverRef = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allProjects: Project[] = projectsData?.pages.flatMap(page => page.data.content) ?? [];

  return (
    <div className='mt-14 flex h-full w-full justify-center py-(--semantic-margin-2xl)'>
      <div className='px-(--semantic-margin-lg) pt-(--semantic-spacing-0) pb-(--semantic-spacing-80)'>
        <div className='desktop:w-[922px] tablet:w-[720px] mobile:w-[320px] flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
          <div className='flex flex-col gap-(--semantic-spacing-16)'>
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
                  <Select.Label value='전체(12)'>전체(12)</Select.Label>
                  <Select.Label value='3기(6)'>3기(6)</Select.Label>
                  <Select.Label value='2기(2)'>2기(2)</Select.Label>
                  <Select.Label value='1기(4)'>1기(4)</Select.Label>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className='desktop:grid-cols-3 tablet:grid-cols-2 grid gap-x-5 gap-y-6'>
            {allProjects.map(project => (
              <div key={project.id} className='desktop:w-[294px] tablet:w-[350px] mobile:w-[320px]'>
                <Card.Preset.PlateWithTitle.Link
                  href={`/project/${project.id}`}
                  layout='vertical'
                  image={
                    project.thumbnailUrl
                      ? { src: project.thumbnailUrl, alt: project.name }
                      : undefined
                  }
                  title={project.name}
                  body={project.summary}
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
        </div>
      </div>
    </div>
  );
};

export default TeamProject;
