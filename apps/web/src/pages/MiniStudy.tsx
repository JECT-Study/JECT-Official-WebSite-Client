import { Card, Hero, Select, SelectField, Title } from "@ject/jds";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import type { PositionFilter } from "@/apis/miniStudy";
import EmptyData from "@/components/common/emptyState/EmptyData";
import Label from "@/components/common/label/Label";
import useCloseOutside from "@/hooks/useCloseOutside";
import useMiniStudiesQuery from "@/hooks/useMiniStudiesQuery";

type FilterOption = "전체" | "PM" | "PD";

const isValidPosition = (value: string | null): value is "PM" | "PD" => {
  return value === "PM" || value === "PD";
};

const MiniStudy = () => {
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isSelectOpen, setIsOpen: setIsSelectOpen } = useCloseOutside(selectContainerRef);

  const [searchParams, setSearchParams] = useSearchParams();
  const positionParam = searchParams.get("position");
  const selectedPosition: FilterOption = isValidPosition(positionParam) ? positionParam : "전체";
  const positionFilter: PositionFilter =
    selectedPosition === "전체" ? null : selectedPosition;
  const { miniStudies, counts, isError, isPending } =
    useMiniStudiesQuery(positionFilter);

  const handlePositionChange = (value: string) => {
    if (value === "전체") {
      searchParams.delete("position");
    } else {
      searchParams.set("position", value);
    }
    setSearchParams(searchParams);
    setIsSelectOpen(false);
  };

  const getDisplayValue = () => {
    switch (selectedPosition) {
      case "전체":
        return `전체(${counts.all})`;
      case "PM":
        return `PM(${counts.PM})`;
      case "PD":
        return `PD(${counts.PD})`;
    }
  };

  return (
    <div className='bg-(--semantic-surface-standard) flex min-h-dvh flex-col items-center mt-(--semantic-spacing-64) py-(--semantic-margin-2xl)'>
      <section className='gap-(--semantic-spacing-32) flex w-full max-w-[922px] flex-col items-center pt-(--semantic-margin-xl) pb-(--semantic-spacing-80) px-(--semantic-margin-lg)'>
        <div className='gap-(--semantic-spacing-16) flex w-full flex-col items-start'>
          <Hero size='xs' textAlign='left'>미니 스터디</Hero>
          <Title size='xs' textAlign='left'>
            활동 중 팀 프로젝트와 병행할 수 있는, 성장을 위한 스터디입니다.
          </Title>
        </div>

        <div className='flex w-full flex-col'>
          <div className='gap-(--semantic-spacing-48) flex w-full flex-col'>
            <div className='relative w-40' ref={selectContainerRef}>
              <SelectField
                value={getDisplayValue()}
                placeholder='전체'
                isOpen={isSelectOpen}
                onClick={() => setIsSelectOpen(prev => !prev)}
              >
                {isSelectOpen && (
                  <div className='absolute top-full left-0 z-10 mt-2 w-40'>
                    <Select value={selectedPosition} onChange={handlePositionChange}>
                      <Select.Label value='전체'>{`전체(${counts.all})`}</Select.Label>
                      <Select.Label value='PM'>{`PM(${counts.PM})`}</Select.Label>
                      <Select.Label value='PD'>{`PD(${counts.PD})`}</Select.Label>
                    </Select>
                  </div>
                )}
              </SelectField>
            </div>

            {isError ? (
              <EmptyData />
            ) : isPending ? (
              <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
                <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
                  로딩 중...
                </Label>
              </div>
            ) : !miniStudies || miniStudies.length === 0 ? (
              <div className='flex w-full items-center justify-center py-(--semantic-spacing-80)'>
                <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
                  등록된 미니 스터디가 없습니다
                </Label>
              </div>
            ) : (
              <div className='gap-(--semantic-spacing-16) flex w-full flex-col'>
                {miniStudies.map(study => (
                  <Card.Preset.Post.Link
                    key={study.id}
                    layout='horizontal'
                    title={study.name}
                    body=''
                    author={study.summary}
                    date=''
                    href={study.linkUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    image={{
                      src: study.imageUrl,
                      alt: study.name,
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

export default MiniStudy;
