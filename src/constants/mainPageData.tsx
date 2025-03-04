interface TimelineItem {
  id: number;
  title: string;
  badgeText: string;
  description: string;
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
