import { ContentBadge, EmptyState, Tab, Title } from "@jects/jds";
import type { ThemeVariant } from "@jects/jds";

interface BadgeItem {
  label: string;
  variant: ThemeVariant;
}

interface TeamProjectItem {
  id: number;
  stepLabel: string;
  badges: BadgeItem[];
  title: string;
  description: string;
}

interface FigmaGuideItem {
  id: number;
  title: string;
  descriptions: string[];
}

const teamProjectScheduleData: TeamProjectItem[] = [
  {
    id: 1,
    stepLabel: "2026년 1월 31일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "온보딩",
    description: "프로젝트 시작 및 팀 소개, 네트워킹 진행",
  },
  {
    id: 2,
    stepLabel: "2026년 2월 21일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "blue" },
    ],
    title: "모각작",
    description: "함께 모여 작업하며 팀원 및 운영진과 소통",
  },
  {
    id: 3,
    stepLabel: "2026년 3월 14일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "젝트 기획 발표 세션",
    description: "초기 서비스 기획 마무리 및 발표 진행",
  },
  {
    id: 4,
    stepLabel: "2026년 4월 4일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "전문가 초청 강연",
    description: "실무 관점의 인사이트 강연 및 Q&A",
  },
  {
    id: 5,
    stepLabel: "2026년 5월 2일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "젝-트게더",
    description: "팀별 성과 공유 및 네트워킹 진행",
  },
  {
    id: 6,
    stepLabel: "2026년 5월 29일(금)",
    badges: [],
    title: "서비스 배포",
    description: "전 팀 서비스 외부 공개 및 배포 완료",
  },
  {
    id: 7,
    stepLabel: "2026년 5월 30일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "젝러닝",
    description: "각 팀 서비스 체험 및 피드백 수집",
  },
  {
    id: 8,
    stepLabel: "2026년 5월 31일(일) - 7월 3일(금)",
    badges: [],
    title: "고도화 및 운영 기간",
    description: "기능 개선 및 운영 성과 축적",
  },
  {
    id: 9,
    stepLabel: "2026년 7월 4일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수참여", variant: "pink" },
    ],
    title: "최종 릴리즈 및 데모데이",
    description: "최종 결과 발표 및 운영 성과 공유",
  },
];

const figmaGuideCurriculumData: FigmaGuideItem[] = [
  {
    id: 1,
    title: "1. 피그마 환경 설정",
    descriptions: [
      "언어 및 색상 프로필 설정",
      "숫자 키를 사용하여 불투명도 설정 해제",
      "이동 간격 크기 설정",
      "메모리 사용 보기",
      "요금 폭탄 방지하기",
    ],
  },
  {
    id: 2,
    title: "2. 구조 파악하기",
    descriptions: [
      "기본적인 피그마 파일 구조",
      "페이지 및 레이어 구조와 유형",
      "파일 정리 예시",
      "페이지 정리 및 분류 예시",
      "섹션 사용 예시",
    ],
  },
  {
    id: 3,
    title: "3. 디자인 협업 설계",
    descriptions: ["디자인 컨벤션", "용어 정의", "네이밍 컨벤션", "라이브러리"],
  },
  {
    id: 4,
    title: "4. 개발 핸드오프",
    descriptions: [
      "친절하게 핸드오프 하는 법",
      "파운데이션 핸드오프 예시",
      "컴포넌트 핸드오프 예시",
      "핸드오프 피드백 대응하기",
    ],
  },
];

const TeamProjectCard = ({ item }: { item: TeamProjectItem }) => {
  return (
    <div className='flex flex-col items-start gap-(--semantic-spacing-12) rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <div className='flex items-center justify-between self-stretch'>
        <p className='label-lg font-(--primitive-font-weight-label-subtle) text-(--semantic-object-alternative)'>
          {item.stepLabel}
        </p>
        {item.badges.length > 0 && (
          <div className='flex items-center gap-(--semantic-spacing-8)'>
            {item.badges.map(badge => (
              <ContentBadge.Theme
                key={badge.label}
                variant={badge.variant}
                size='sm'
                badgeStyle='alpha'
              >
                {badge.label}
              </ContentBadge.Theme>
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-col items-start gap-(--semantic-spacing-8) self-stretch'>
        <Title size='xs' textAlign='left'>
          {item.title}
        </Title>
        <p className='body-lg self-stretch font-(--primitive-font-weight-body-normal) text-(--semantic-object-normal)'>
          {item.description}
        </p>
      </div>
    </div>
  );
};

const FigmaGuideCard = ({ item }: { item: FigmaGuideItem }) => {
  return (
    <div className='flex flex-col items-start gap-(--semantic-spacing-8) rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <Title size='xs' textAlign='left'>
        {item.title}
      </Title>
      <ul className='body-lg flex flex-col font-(--primitive-font-weight-body-normal) text-(--semantic-object-normal)'>
        {item.descriptions.map(desc => (
          <li key={desc} className='list-inside list-disc'>
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurriculumTabSection = () => {
  return (
    <section className='flex w-full flex-col items-center self-stretch'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-32)'>
        <Tab.Root defaultValue='team-project-schedule' variant='header' className='w-full'>
          <Tab.List aria-label='커리큘럼 탭'>
            <Tab.Trigger value='team-project-schedule'>팀 프로젝트 일정</Tab.Trigger>
            <Tab.Trigger value='figma-guide-curriculum'>피그마 가이드 커리큘럼</Tab.Trigger>
          </Tab.List>

          <Tab.Content value='team-project-schedule'>
            <div className='tablet:grid-cols-2 grid w-full grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-48)'>
              {teamProjectScheduleData.map(item => (
                <TeamProjectCard key={item.id} item={item} />
              ))}
              <div className='[&>div]:h-full [&>div]:w-full [&>div]:max-w-full!'>
                <EmptyState
                  variant='outlined'
                  header='그 밖에 더 많은 활동들이 기다리고 있어요...'
                  body='젝트에 합류해서 직접 활동해보세요!'
                />
              </div>
            </div>
          </Tab.Content>

          <Tab.Content value='figma-guide-curriculum'>
            <div className='tablet:grid-cols-2 grid w-full grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-48)'>
              {figmaGuideCurriculumData.map(item => (
                <FigmaGuideCard key={item.id} item={item} />
              ))}
            </div>
          </Tab.Content>
        </Tab.Root>
      </div>
    </section>
  );
};

export default CurriculumTabSection;
