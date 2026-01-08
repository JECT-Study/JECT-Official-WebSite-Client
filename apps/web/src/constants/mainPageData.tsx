import type { IconName } from "@ject/jds";

interface StatItem {
  id: number;
  title: string;
  description: string;
  isFullWidth?: boolean;
}

export const statData: StatItem[] = [
  {
    id: 1,
    title: "102",
    description: "누적 동아리원",
  },
  {
    id: 2,
    title: "12",
    description: "진행한 프로젝트",
  },
  {
    id: 3,
    title: "39",
    description: "3기 팀 프로젝트 완주자",
    isFullWidth: true,
  },
];

interface PositionItem {
  id: number;
  title: string;
  icon: IconName;
  description: string;
  tags: string[];
  themeColor: "green" | "sky" | "orange" | "purple";
}

export const positionData: PositionItem[] = [
  {
    id: 0,
    title: "프론트엔드 개발자",
    icon: "frontend",
    description:
      "사용자와 직접 상호작용하는 기능과 화면을 개발합니다. 서비스에 적합한 기술을 활용하고 성능을 최적화해서 사용 경험을 더욱 긍정적으로 만들어요.",
    tags: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "React.js",
      "상태 관리",
      "성능 최적화",
    ],
    themeColor: "green",
  },
  {
    id: 1,
    title: "백엔드 개발자",
    icon: "backend",
    description:
      "서비스를 더욱 안정적으로 사용할 수 있도록 서버 로직을 개발합니다. 비즈니스 요구사항을 분석하고, API 설계부터 데이터베이스 연동, 보안과 배포까지 전 과정을 책임집니다.",
    tags: [
      "Java",
      "Spring Boot",
      "Restful API",
      "DB",
      "CI/CD",
      "API 설계",
      "DB 설계",
      "서버 운영",
    ],
    themeColor: "sky",
  },
  {
    id: 2,
    title: "프로덕트 매니저",
    icon: "product",
    description:
      "서비스 기획에 대한 아이디어를 제시하고 유저 경험을 설계합니다. 원활한 팀 플레이를 위해 서비스 릴리즈까지의 프로젝트 일정 전반을 관리해요.",
    tags: [
      "서비스 기획",
      "문제 정의",
      "자료조사",
      "일정 및 문서관리",
      "우선순위 설정",
      "커뮤니케이션",
    ],
    themeColor: "orange",
  },
  {
    id: 3,
    title: "프로덕트 디자이너",
    icon: "design",
    description:
      "사용자 경험 향상과 협업을 위한 디자인 규칙을 설계해요. 매력적인 서비스를 만들어 내기 위해 아이덴티티 그래픽 요소들도 디자인합니다.",
    tags: [
      "UX 설계",
      "UI 디자인",
      "프로토타이핑",
      "디자인 시스템 구축",
      "UX 라이팅",
      "문제 해결 가설 수립",
    ],
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
      "여러 포지션이 함께 팀을 이뤄 IT 서비스를 만들어냅니다. 구성원들의 피드백을 통해 개선 과정을 거치며 운영까지 시도해 볼 수 있는 젝트의 메인 활동 프로그램이에요.",
  },
  {
    id: 2,
    title: "협업 가이드",
    description:
      "팀 협업에 대한 마인드셋과 포지션 별 가이드를 안내드려요. 효율성과 팀워크를 모두 고려하는 방법부터 직접적인 포지션 별 작업 노하우를 모두 공개합니다.",
  },
  {
    id: 3,
    title: "미니 스터디",
    description:
      "IT 관련 인사이트를 함께 공유하고 공부합니다. 기존 개설된 스터디에 참여하거나 직접 스터디를 개설할 수도 있어요. 체계적인 학습이 되도록 서포터즈가 도와드릴게요.",
  },
  {
    id: 4,
    title: "라이브 세션",
    description:
      "온라인이나 오프라인에서 내 지식과 경험을 발표해보세요. 경험에서 성장으로 이어지는 과정에서의 많은 레슨런을 기록으로 남길 수 있습니다.",
  },
  {
    id: 5,
    title: "네트워킹",
    description:
      "구성원들과 오프라인에서 만나 친목을 도모해보세요. 나와 같거나 다른 포지션들과 만나 IT 트렌드, 커리어, 작업 노하우, 그 밖에 다양한 화제로 이야기 해 볼 수 있어요.",
  },
];
