import { ReactNode } from 'react';

interface TimelineItem {
  id: number;
  title: string;
  badgeText: string;
  description: ReactNode;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: '팀 빌딩',
    badgeText: '온라인',
    description: '젝트 여정의 시작이에요. 프로젝트 진행을 함께할 팀메이트를 탐색해 보세요!',
  },
  {
    id: 2,
    title: 'MVP 발표',
    badgeText: '온라인',
    description: '서비스의 청사진을 발표해요. 아이디에이션 과정을 모든 팀들과 공유합니다.',
  },
  {
    id: 3,
    title: '1차 데모데이',
    badgeText: '온라인',
    description: '발표했던 MVP 모델의 달성, 그리고 서비스 배포를 목표로 해요.',
  },
  {
    id: 4,
    title: '2차 데모데이',
    badgeText: '오프라인',
    description: '서비스를 함께 시연해 보고, 피드백을 통해 개선 가능성을 탐색합니다.',
  },
];

interface PositionItem {
  id: number;
  title: string;
  variant: string;
  labels: string[];
  description: ReactNode;
}

export const positionData: PositionItem[] = [
  {
    id: 0,
    title: '프론트엔드 개발자',
    variant: 'fe',
    labels: ['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화'],
    description: (
      <>
        긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최
        <br />
        적화해요. 디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적
        <br />인 구조로 코드를 작성해요.
      </>
    ),
  },
  {
    id: 1,
    title: '백엔드 개발자',
    variant: 'be',
    labels: ['Java', 'Spring Boot', 'Restful API', 'DB', 'CI/CD'],
    description: (
      <>
        안정적이고 효율적인 서버 로직을 개발해요. 비즈니스 요구사항을 분석하
        <br />
        고, API 설계부터 데이터베이스 연동, 배포까지 전 과정을 책임집니다. 또한
        <br />
        확장성과 보안성을 고려해 서비스 품질을 향상시키는 역할도 맡고 있어요.
      </>
    ),
  },
  {
    id: 2,
    title: '프로젝트 매니저',
    variant: 'pm',
    labels: ['문서 관리', '일정 조율', '커뮤니케이션', '팀 플레잉'],
    description: (
      <>
        서비스 기획에 대한 아이디어를 제시하고 유저 경험을 설계합니다. 원활한
        <br />팀 플레잉을 위해 서비스 릴리즈까지의 프로젝트 일정 전반을 관리해요.
      </>
    ),
  },
  {
    id: 3,
    title: '프로덕트 디자이너',
    variant: 'pd',
    labels: ['UX 설계', 'UI 디자인', '프로토타이핑', '디자인 시스템'],
    description: (
      <>
        사용자 경험 향상과 협업을 위한 디자인 규칙을 설계해요.
        <br />
        매력적인 서비스를 만들어 내기 위해 아이덴티티 요소들도 디자인합니다.
      </>
    ),
  },
];

interface CorePrincipleItem {
  id: number;
  title: string;
  description: ReactNode;
}

export const corePrincipleData: CorePrincipleItem[] = [
  {
    id: 1,
    title: '적극적인 참여',
    description: <>프로젝트에 적극적인 태도와 열정으로 참여하는 것을 지향해요.</>,
  },
  {
    id: 2,
    title: '몰입하기',
    description: <>문제 해결 과정에서 몰입을 통해 재미를 찾는 것을 추구합니다.</>,
  },
  {
    id: 3,
    title: '지속가능한 개발',
    description: <>서비스 출시 완료에서 끝나지 않고, 운영까지 진행해 보세요.</>,
  },
  {
    id: 4,
    title: '팀워크 중시',
    description: <>함께하는 사람들과 긍정적인 협업 경험을 위해 원활한 소통이 필요해요.</>,
  },
];
