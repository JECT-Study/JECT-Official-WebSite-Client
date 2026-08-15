import { Card, Divider, Hero, Select, SelectField, Title } from "@jects/jds";
import { Fragment, useState } from "react";

import PageHeroContainer from "@/components/layout/PageHeroContainer";
import PageModule from "@/components/layout/PageModule";
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
    title: "[젝트 5기] 프론트엔드 개발자 모집",
    period: "2026년 8월 22일 - 9월 6일",
    description:
      "더 나은 사용자 경험을 고민하며 완성도 높은 웹 화면을 구축합니다. 백엔드 개발자, 프로덕트 디자이너와 협업하며 사용자 인터페이스와 데이터를 자연스럽게 연결합니다.\n" +
      "웹 표준과 동작 원리, 프론트엔드 기본 기술(HTML, CSS, JavaScript)을 바탕으로 화면을 개발합니다.\n" +
      "React, TypeScript 등의 도구를 프로젝트 상황에 맞게 활용해 컴포넌트를 구현하고 상태를 관리합니다.",
    isOpen: true,
  },
  {
    id: 2,
    jobFamily: "BE" as const,
    title: "[젝트 5기] 백엔드 개발자 모집",
    period: "2026년 8월 22일 - 9월 6일",
    description:
      "프로덕트 요구사항을 바탕으로 도메인과 데이터 구조를 정의하고 서버의 비즈니스 로직을 구현합니다. 프론트엔드 및 앱 개발자가 기능을 안정적으로 사용할 수 있도록 API를 설계하고 제공합니다.\n" +
      "데이터의 일관성과 무결성을 고려해 데이터베이스 스키마와 조회 구조를 설계하고 개선합니다.\n" +
      "인증, 인가, 예외 처리 등 서비스 전반에서 공통적으로 필요한 서버 구조를 설계합니다.\n" +
      "운영 과정에서 발생하는 오류와 성능 문제를 파악하고 로그와 모니터링 데이터를 기반으로 원인을 분석합니다.\n" +
      "실제 사용자가 지속적으로 서비스를 사용할 수 있도록 배포 환경을 구성하고 서버의 안정성과 확장성을 개선합니다.",
    isOpen: true,
  },
  {
    id: 3,
    jobFamily: "APP" as const,
    title: "[젝트 5기] 앱 개발자 모집",
    period: "2026년 8월 22일 - 9월 6일",
    description:
      "기획된 기능 요구사항과 디자인을 바탕으로 사용자가 직접 상호작용하는 모바일 화면과 기능을 구현합니다. 화면 간 이동과 사용자 상태 변화를 고려해 앱의 구조와 상태 관리 방식을 설계합니다.\n" +
      "백엔드 API와 연동해 서버의 데이터를 사용자에게 적절한 형태로 전달하고 입력값을 처리합니다.\n" +
      "다양한 기기와 화면 환경에서도 사용성이 유지될 수 있도록 UI와 인터랙션을 구현하고 개선합니다.\n" +
      "로딩, 오류, 네트워크 상태 등 실제 서비스 환경에서 발생할 수 있는 상황을 고려해 사용자 경험을 설계합니다.\n" +
      "앱 배포 이후 발생하는 오류와 사용자 피드백을 바탕으로 기능과 코드 구조를 지속적으로 개선합니다.",
    isOpen: true,
  },
  {
    id: 4,
    jobFamily: "PM" as const,
    title: "[젝트 5기] 프로덕트 매니저 모집",
    period: "2026년 8월 22일 - 9월 6일",
    description:
      "사용자 니즈 분석을 바탕으로 서비스 목표, 기능 우선순위, 비즈니스 모델을 정의합니다. UX 플로우, 기능 정의서, 와이어프레임 등 기획 산출물을 구성합니다.\n" +
      "개발, 디자인 포지션과 긴밀히 협력하며 요구사항 정리와 의사결정 흐름을 정돈합니다.\n" +
      "프로젝트 일정을 관리하며 스프린트, 데일리 스탠드업, 리뷰, 회고 사이클을 운영합니다.\n" +
      "문서화를 통해 팀 내 정보 자산을 체계적으로 관리합니다.",
    isOpen: true,
  },
  {
    id: 5,
    jobFamily: "PD" as const,
    title: "[젝트 5기] 프로덕트 디자이너 모집",
    period: "2026년 8월 22일 - 9월 6일",
    description:
      "프로덕트 사용을 통해 사용자의 불편함이 해소되도록 문제 해결 가설을 수립합니다. 프로덕트 매니저와 함께 구체적인 UX 플로우를 설계하고, Hi-Fi 프로토타입을 제작합니다.\n" +
      "사용자가 상호작용을 통해 기능을 사용할 수 있도록 UI를 디자인합니다.\n" +
      "프로덕트 브랜드가 사용자에게 더 매력적으로 다가갈 수 있도록 아이덴티티 그래픽을 제작합니다.\n" +
      "팀의 디자인 협업 환경을 효율적으로 개선하기 위해 원칙을 수립하며 디자인 시스템을 설계합니다.\n" +
      "퍼널을 분석하고 UX 가설을 세워 사용자가 겪는 숨겨진 문제를 찾아 시각적, 기능적으로 개선합니다.",
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
              title={item.title}
              body={item.description}
              author='동아리원'
              date={item.period}
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
