import type { FigmaGuideItem, TeamProjectItem } from "@/types/ui/curriculum";

export const teamProjectScheduleData: TeamProjectItem[] = [
  {
    id: 1,
    stepLabel: "2026년 1월 31일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "온보딩",
    description: "프로젝트 시작 및 팀 소개, 네트워킹 진행",
  },
  {
    id: 2,
    stepLabel: "2026년 2월 21일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "선택 참여", variant: "blue" },
    ],
    title: "모각작",
    description: "함께 모여 작업하며 팀원 및 운영진과 소통",
  },
  {
    id: 3,
    stepLabel: "2026년 3월 14일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "젝트 기획 발표 세션",
    description: "초기 서비스 기획 마무리 및 발표 진행",
  },
  {
    id: 4,
    stepLabel: "2026년 4월 4일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "전문가 초청 강연",
    description: "실무 관점의 인사이트 강연 및 Q&A",
  },
  {
    id: 5,
    stepLabel: "2026년 5월 2일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
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
      { label: "필수 참여", variant: "pink" },
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
      { label: "필수 참여", variant: "pink" },
    ],
    title: "최종 릴리즈 및 데모데이",
    description: "최종 결과 발표 및 운영 성과 공유",
  },
];

export const figmaGuideCurriculumData: FigmaGuideItem[] = [
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
