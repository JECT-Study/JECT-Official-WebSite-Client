import { Card, Divider, Hero, Select, SelectField, Title } from "@jects/jds";
import { Fragment, useState } from "react";

import PageHeroContainer from "@/components/layout/PageHeroContainer";
import PageModule from "@/components/layout/PageModule";
import {
  findJobFamilyOption,
  JOB_FAMILY_RECRUITMENT_INFO,
  JOB_FAMILY_RECRUITMENT_ROUND,
} from "@/constants/applyPageData";
import { PATH } from "@/constants/path";

type FilterValue = "all" | "PM" | "PD" | "FE" | "BE" | "APP";

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "전체(5)" },
  { value: "FE", label: "프론트엔드 개발자(1)" },
  { value: "BE", label: "백엔드 개발자(1)" },
  { value: "APP", label: "앱 개발자(1)" },
  { value: "PM", label: "프로덕트 매니저(1)" },
  { value: "PD", label: "프로덕트 디자이너(1)" },
];

const RECRUITMENT_LIST = [
  {
    id: 1,
    jobFamily: "FE" as const,
    isOpen: true,
  },
  {
    id: 2,
    jobFamily: "PD" as const,
    isOpen: true,
  },
  {
    id: 3,
    jobFamily: "BE" as const,
    isOpen: true,
  },
  {
    id: 4,
    jobFamily: "APP" as const,
    isOpen: true,
  },
  {
    id: 5,
    jobFamily: "PM" as const,
    isOpen: true,
  },
];

function ApplyListPage() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredList =
    filter === "all"
      ? RECRUITMENT_LIST
      : RECRUITMENT_LIST.filter(item => item.jobFamily === filter);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterSelect = (value: FilterValue) => {
    setFilter(value);
    setIsFilterOpen(false);
  };

  const selectedFilterLabel = FILTER_OPTIONS.find(opt => opt.value === filter)?.label ?? "전체";

  return (
    <PageModule>
      <PageHeroContainer>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16)'>
          <Hero size='xs' textAlign='left'>
            지원 안내
          </Hero>
          <Title size='xs' textAlign='left'>
            함께 젝트를 만들어갈 새로운 구성원을 찾고 있습니다.
          </Title>
        </div>
        <div className='relative w-48'>
          <SelectField
            value={selectedFilterLabel}
            onClick={handleFilterClick}
            isOpen={isFilterOpen}
          />
          {isFilterOpen && (
            <div className='absolute top-full z-50 mt-2 w-full'>
              <Select value={filter} onChange={value => handleFilterSelect(value as FilterValue)}>
                {FILTER_OPTIONS.map(option => (
                  <Select.Label key={option.value} value={option.value}>
                    {option.label}
                  </Select.Label>
                ))}
              </Select>
            </div>
          )}
        </div>
      </PageHeroContainer>

      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        {filteredList.map((item, index) => (
          <Fragment key={item.id}>
            <Card.Preset.Post.Link
              layout='horizontal'
              cardStyle='empty'
              href={`${PATH.applyGuide}/${item.jobFamily}`}
              title={findJobFamilyOption(item.jobFamily).recruitmentTitle}
              body={JOB_FAMILY_RECRUITMENT_INFO[item.jobFamily].roleDescription.items.join(" ")}
              author='동아리원'
              date={JOB_FAMILY_RECRUITMENT_ROUND[item.jobFamily].cardPeriod}
              isDisabled={!item.isOpen}
            />
            {index < filteredList.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </PageModule>
  );
}

export default ApplyListPage;
