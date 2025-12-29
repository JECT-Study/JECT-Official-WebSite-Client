import { Card, Divider, Hero, Select, SelectField, Title } from "@ject/jds";
import { Fragment, useState } from "react";

import backendImage from "@/assets/images/backend.png";
import frontendImage from "@/assets/images/frontend.png";
import productDesignerImage from "@/assets/images/product-designer.png";
import productManagerImage from "@/assets/images/product-manager.png";
import { PATH } from "@/constants/path";

type FilterValue = "all" | "PM" | "PD" | "FE" | "BE";

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "전체(4)" },
  { value: "FE", label: "프론트엔드 개발자(1)" },
  { value: "BE", label: "백엔드 개발자(1)" },
  { value: "PM", label: "프로덕트 매니저(1)" },
  { value: "PD", label: "프로덕트 디자이너(1)" },
];

const RECRUITMENT_LIST = [
  {
    id: 1,
    jobFamily: "FE" as const,
    title: "[젝트 4기] 프론트엔드 개발자 모집",
    period: "2025년 12월 29일 - 2026년 1월 18일",
    description:
      "사용자 경험을 기반으로 웹 화면을 구현하며, 서비스 인터페이스 전반을 책임집니다. 디자이너, 백엔드 개발자와 긴밀히 협업해 데이터 흐름과 화면 설계를 자연스럽게 연결합니다.  \n" +
      "React.js와 TypeScript를 활용해 구조적인 컴포넌트를 개발하고, 상태 관리를 통해 일관된 사용자 흐름을 만듭니다.  \n" +
      "HTML/CSS/JavaScript 기반 UI 구현과 성능 최적화를 통해 유연한 사용자 경험을 제공합니다.",
    imgUrl: frontendImage,
    isOpen: true,
  },
  {
    id: 2,
    jobFamily: "BE" as const,
    title: "[젝트 4기] 백엔드 개발자 모집",
    period: "2025년 12월 29일 - 2026년 1월 18일",
    description:
      "비즈니스 요구사항을 분석하고 이를 기반으로 서버 로직을 설계·구현합니다. Spring Boot 기반의 API를 설계하며, 안정적이고 예측 가능한 데이터 흐름을 만듭니다.\n" +
      "데이터베이스 모델링과 연동을 책임지고, 확장성과 성능을 고려해 구조를 설계합니다.\n" +
      "CI/CD 및 배포 환경을 구축해 서비스가 실제로 운영될 수 있는 기반을 마련합니다.\n" +
      "보안과 장애 대응을 고려한 안정적인 서버 아키텍처를 설계해 서비스 품질을 향상시킵니다.",
    imgUrl: backendImage,
    isOpen: true,
  },
  {
    id: 3,
    jobFamily: "PM" as const,
    title: "[젝트 4기] 프로덕트 매니저 모집",
    period: "2025년 12월 29일 - 2026년 1월 18일",
    description:
      "사용자 문제를 분석해 서비스의 목표, 기능 우선순위, 비즈니스 모델을 정의합니다. 사용자 흐름(UX 플로우), 기능 정의서, 와이어프레임 등 기획 산출물을 책임지고 설계합니다.\n" +
      "개발·디자인팀과 긴밀히 협력하며, 요구사항 정리와 의사결정 흐름을 정돈합니다.\n" +
      "프로젝트 일정을 관리하고, 스프린트·데일리 스탠드업·리뷰·회고를 운영하며, 문서화를 통해 팀 내 정보를 체계적으로 관리합니다.",
    imgUrl: productManagerImage,
    isOpen: true,
  },
  {
    id: 4,
    jobFamily: "PD" as const,
    title: "[젝트 4기] 프로덕트 디자이너 모집",
    period: "2025년 12월 29일 - 2026년 1월 18일",
    description:
      "서비스가 사용자 문제를 해결할 수 있도록 필요한 기능을 시각적으로 기획합니다. PM과 함께 구체적인 사용 흐름 설계와 와이어프레임을 만듭니다. 사용자와 상호작용하는 UI를 디자인하며 아이덴티티 요소에 대한 그래픽을 제작합니다.\n" +
      "팀원들의 효율적인 협업 환경을 만들기 위한 디자인 시스템을 설계합니다.\n" +
      "UX 가설을 세워 사용자가 겪는 어려움을 찾아내고 이를 시각적 혹은 기능적으로 개선합니다.",
    imgUrl: productDesignerImage,
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
    <div className='flex max-w-[978px] flex-col items-start px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
      <section className='flex flex-col items-start gap-(--semantic-spacing-32) self-stretch pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
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
      </section>

      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        {filteredList.map((item, index) => (
          <Fragment key={item.id}>
            <Card.Preset.Post.Link
              layout='horizontal'
              cardStyle='empty'
              href={`${PATH.applyGuide}/${item.jobFamily}`}
              title={item.title}
              body={item.description}
              author='동아리원'
              date={item.period}
              image={{ src: item.imgUrl, alt: `${item.jobFamily} 모집` }}
              isDisabled={!item.isOpen}
            />
            {index < filteredList.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ApplyListPage;
