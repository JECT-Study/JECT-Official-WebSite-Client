import { Card, Hero, Select, SelectField, Title } from "@ject/jds";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import type { SemesterFilter } from "@/apis/jectalk";
import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import useCloseOutside from "@/hooks/useCloseOutside";
import useJectalksQuery from "@/hooks/useJectalksQuery";

type FilterOption = "전체" | "1기" | "2기" | "3기";

const isValidSemester = (value: string | null): value is "1" | "2" | "3" => {
  return value === "1" || value === "2" || value === "3";
};

const LiveSession = () => {
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isSelectOpen, setIsOpen: setIsSelectOpen } = useCloseOutside(selectContainerRef);

  const [searchParams, setSearchParams] = useSearchParams();
  const semesterParam = searchParams.get("semester");
  const selectedSemester: FilterOption = isValidSemester(semesterParam)
    ? (`${semesterParam}기` as FilterOption)
    : "전체";
  const semesterFilter: SemesterFilter =
    selectedSemester === "전체" ? null : (selectedSemester.replace("기", "") as SemesterFilter);

  const { jectalks, counts, isError, isPending } = useJectalksQuery(semesterFilter);

  const handleSemesterChange = (value: string) => {
    if (value === "전체") {
      searchParams.delete("semester");
    } else {
      searchParams.set("semester", value.replace("기", ""));
    }
    setSearchParams(searchParams);
    setIsSelectOpen(false);
  };

  const getDisplayValue = () => {
    switch (selectedSemester) {
      case "전체":
        return `전체(${counts.all})`;
      case "1기":
        return `1기(${counts["1"]})`;
      case "2기":
        return `2기(${counts["2"]})`;
      case "3기":
        return `3기(${counts["3"]})`;
    }
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
                    <Select value={selectedSemester} onChange={handleSemesterChange}>
                      <Select.Label value='전체'>{`전체(${counts.all})`}</Select.Label>
                      <Select.Label value='1기'>{`1기(${counts["1"]})`}</Select.Label>
                      <Select.Label value='2기'>{`2기(${counts["2"]})`}</Select.Label>
                      <Select.Label value='3기'>{`3기(${counts["3"]})`}</Select.Label>
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
