import { Card, Hero, Select, SelectField, Title } from "@ject/jds";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import useCloseOutside from "@/hooks/useCloseOutside";
import useJectalksQuery from "@/hooks/useJectalksQuery";

const LiveSession = () => {
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isSelectOpen, setIsOpen: setIsSelectOpen } = useCloseOutside(selectContainerRef);

  const [searchParams, setSearchParams] = useSearchParams();
  const semesterParam = searchParams.get("semester");

  const { jectalks, semesters, counts, isError, isPending } = useJectalksQuery(semesterParam);

  const isValidSemester = semesters.some(s => s.name === semesterParam);
  const selectedSemester = isValidSemester ? semesterParam : "전체";

  const handleSemesterChange = (value: string) => {
    if (value === "전체") {
      searchParams.delete("semester");
    } else {
      searchParams.set("semester", value);
    }
    setSearchParams(searchParams);
    setIsSelectOpen(false);
  };

  const getDisplayValue = () => {
    if (selectedSemester === "전체" || !selectedSemester) {
      return `전체(${counts.all})`;
    }
    return `${selectedSemester}(${counts[selectedSemester] ?? 0})`;
  };

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

        <div className='flex w-full flex-col'>
          <div className='flex w-full flex-col gap-(--semantic-spacing-48)'>
            <div className='relative w-40' ref={selectContainerRef}>
              <SelectField
                value={getDisplayValue()}
                placeholder='전체'
                isOpen={isSelectOpen}
                onClick={() => setIsSelectOpen(prev => !prev)}
              >
                {isSelectOpen && (
                  <div className='absolute left-0 top-full z-10 mt-2 w-40'>
                    <Select value={selectedSemester ?? "전체"} onChange={handleSemesterChange}>
                      <Select.Label value='전체'>{`전체(${counts.all})`}</Select.Label>
                      {semesters.map(semester => (
                        <Select.Label key={semester.id} value={semester.name}>
                          {`${semester.name}(${counts[semester.name] ?? 0})`}
                        </Select.Label>
                      ))}
                    </Select>
                  </div>
                )}
              </SelectField>
            </div>

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
        </div>
      </section>
    </div>
  );
};

export default LiveSession;
