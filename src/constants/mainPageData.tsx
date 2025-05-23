import { ReactNode } from 'react';

import { RoleVariant } from '@/types/ui/role';

interface TimelineItem {
  id: number;
  title: string;
  badgeText: string;
  description: ReactNode;
  badgeBgColor: string;
  badgeTextColor: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: '온보딩',
    badgeText: '오프라인',
    description:
      '젝트 여정의 시작입니다. 프로젝트를 함께할 팀메이트와 만나 아이디어를 나눠 보세요!',
    badgeBgColor: 'bg-feedback-trans-notification-dark',
    badgeTextColor: 'text-feedback-notification-dark',
  },
  {
    id: 2,
    title: '프로젝트 워밍업',
    badgeText: '온라인',
    description: '아이디어 피드백 및 협업을 돕는 세션을 통해 프로젝트의 출발선을 함께 정리해요.',
    badgeBgColor: 'bg-feedback-trans-positive-dark',
    badgeTextColor: 'text-feedback-positive-dark',
  },
  {
    id: 3,
    title: '리뷰위크',
    badgeText: '온라인',
    description: '배포된 서비스를 함께 시연해보고, 피드백을 통해 개선 가능성을 탐색합니다.',
    badgeBgColor: 'bg-feedback-trans-positive-dark',
    badgeTextColor: 'text-feedback-positive-dark',
  },
  {
    id: 4,
    title: '데모데이',
    badgeText: '오프라인',
    description:
      '사용자 피드백을 바탕으로 서비스 품질을 높입니다. 개선 과정에서 배운 점도 공유해요.',
    badgeBgColor: 'bg-feedback-trans-notification-dark',
    badgeTextColor: 'text-feedback-notification-dark',
  },
];

interface PositionItem {
  id: number;
  title: string;
  variant: RoleVariant;
  labels: string[];
  description: ReactNode;
}

export const positionData: PositionItem[] = [
  {
    id: 0,
    title: '프론트엔드 개발자',
    variant: 'fe',
    labels: ['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화'],
    description:
      '긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요. 디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를 작성해요.',
  },
  {
    id: 1,
    title: '백엔드 개발자',
    variant: 'be',
    labels: ['Java', 'Spring Boot', 'Restful API', 'DB', 'CI/CD'],
    description:
      '안정적이고 효율적인 서버 로직을 개발해요. 비즈니스 요구사항을 분석하고, API 설계부터 데이터베이스 연동, 배포까지 전 과정을 책임집니다. 또한 확장성과 보안성을 고려해 서비스 품질을 향상시키는 역할도 맡고 있어요.',
  },
  {
    id: 2,
    title: '프로덕트 매니저',
    variant: 'pm',
    labels: ['BM 설계', '서비스 기획', '커뮤니케이션', '일정 및 문서관리'],
    description:
      '서비스의 방향성과 비즈니스 모델을 설계하고, 사용자 경험 중심의 기획을 주도합니다. 팀 내 원활한 커뮤니케이션을 이끌며, 일정과 문서를 체계적으로 관리해 프로젝트의 흐름을 정돈해요.',
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
    description: '프로젝트에 적극적인 태도와 열정으로 참여하는 것을 지향해요.',
  },
  {
    id: 2,
    title: '몰입하기',
    description: '문제 해결 과정에서 몰입을 통해 재미를 찾는 것을 추구합니다.',
  },
  {
    id: 3,
    title: '지속가능한 개발',
    description: '서비스 출시 완료에서 끝나지 않고, 운영까지 진행해 보세요.',
  },
  {
    id: 4,
    title: '팀워크 중시',
    description: '함께하는 사람들과 긍정적인 협업 경험을 위해 원활한 소통이 필요해요.',
  },
];
