import type { FunctionComponent, SVGProps } from "react";

import PositionApp from "@/assets/svg/positionApp.svg?react";
import PositionBe from "@/assets/svg/positionBe.svg?react";
import PositionFe from "@/assets/svg/positionFe.svg?react";
import PositionPd from "@/assets/svg/positionPd.svg?react";
import PositionPm from "@/assets/svg/positionPm.svg?react";

interface StatItem {
  id: number;
  title: string;
  description: string;
  isFullWidth?: boolean;
}

export const statData: StatItem[] = [
  {
    id: 1,
    title: "184",
    description: "누적 동아리원",
  },
  {
    id: 2,
    title: "18",
    description: "진행한 프로젝트",
  },
  {
    id: 3,
    title: "53",
    description: "4기 팀 프로젝트 완주자",
    isFullWidth: true,
  },
];

interface PositionItem {
  id: number;
  title: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  description: string;
  tags: string[];
  themeColor: "green" | "sky" | "indigo" | "orange" | "purple";
}

export const positionData: PositionItem[] = [
  {
    id: 0,
    title: "프론트엔드 개발자",
    icon: PositionFe,
    description:
      "사용자와 직접 상호작용하는 화면과 기능을 구현합니다. 서비스에 적합한 기술을 적용해 성능을 최적화하고, 완성도 높은 사용 경험을 제공해요.",
    tags: ["JavaScript", "TypeScript", "React.js", "성능 최적화", "상태 관리"],
    themeColor: "green",
  },
  {
    id: 1,
    title: "백엔드 개발자",
    icon: PositionBe,
    description:
      "서비스를 안정적으로 운영할 수 있도록 서버 로직을 개발합니다. 비즈니스 요구사항을 분석하고 API 설계, 데이터베이스 연동, 배포까지 담당해요.",
    tags: ["Java", "Spring Boot", "CI/CD", "API 설계", "DB 설계", "서버 운영"],
    themeColor: "sky",
  },
  {
    id: 2,
    title: "앱 개발자",
    icon: PositionApp,
    description:
      "Android와 iOS 환경에서 사용자 중심의 모바일 앱을 개발합니다. 안정적인 성능을 바탕으로 직관적이고 완성도 높은 사용자 경험을 제공해요.",
    tags: ["Kotlin", "Swift", "Android", "iOS", "API 연동", "앱 배포", "성능 최적화"],
    themeColor: "indigo",
  },
  {
    id: 3,
    title: "프로덕트 매니저",
    icon: PositionPm,
    description:
      "서비스 기획에 대한 아이디어를 제시하고 유저 경험을 설계합니다. 원활한 팀 플레잉을 위해 서비스 릴리즈까지의 프로젝트 일정 전반을 관리해요.",
    tags: ["일정 및 문서관리", "서비스 기획", "문제 정의", "지표설계", "우선순위 설정"],
    themeColor: "orange",
  },
  {
    id: 4,
    title: "프로덕트 디자이너",
    icon: PositionPd,
    description:
      "사용자 경험 향상을 위한 디자인을 설계하고 핸드오프합니다. 시각적 디자인을 넘어, 일관된 서비스 경험을 만들고 사용자 중심의 문제를 함께 해결해요.",
    tags: ["UI/UX 설계", "사용자 리서치", "컴포넌트 제작", "프로토타이핑", "핸드오프"],
    themeColor: "purple",
  },
];

interface ProgramItem {
  id: number;
  title: string;
  description: string;
}

export const programData: ProgramItem[] = [
  {
    id: 1,
    title: "팀 프로젝트",
    description:
      "여러 포지션이 함께 팀을 이뤄 디지털 프로덕트를 만들어냅니다. 구성원들의 피드백을 통해 개선 과정을 거치며, 운영까지 시도해 볼 수 있는 젝트의 메인 활동 프로그램이에요.",
  },
  {
    id: 2,
    title: "협업 가이드",
    description:
      "팀 협업에 대한 마인드셋과 포지션별 가이드를 안내드려요. 효율성과 팀워크를 모두 고려하는 방법부터 포지션별 작업 노하우를 모두 공개합니다.",
  },
  {
    id: 3,
    title: "미니 스터디",
    description:
      "IT 관련 인사이트를 함께 공유하고 공부합니다. 기존 개설된 스터디에 참여하거나 직접 스터디를 개설할 수도 있어요. 체계적인 학습이 되도록 젝트가 도와드리겠습니다.",
  },
  {
    id: 4,
    title: "정기 행사",
    description:
      "한 기수 동안 젝트가 준비한 여러 오프라인 행사들이 이어집니다. 구성원들과 직접 만나 함께 협업하며, IT 트렌드와 커리어 관련 이야기도 나눌 수 있어요.",
  },
  {
    id: 5,
    title: "유저 테스트",
    description:
      "만들고 있는 프로덕트를 구성원들과 함께 검증합니다. 모두가 서로의 사용자가 되어 남긴 피드백이 곧 다음 개선 과제로 이어집니다.",
  },
  {
    id: 6,
    title: "데모데이",
    description:
      "한 기수 동안 제작한 프로덕트를 구성원들 앞에서 발표하며 소개합니다. 협업에 대한 회고와 다음 도전으로 이어지도록 레슨런을 남기는 시간이에요.",
  },
];
