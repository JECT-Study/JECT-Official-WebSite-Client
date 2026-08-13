import type { FigmaGuideItem, TeamProjectItem } from "@/types/ui/curriculum";

export const teamProjectScheduleData: TeamProjectItem[] = [
  {
    id: 1,
    stepLabel: "2026년 9월 19일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "5기 온보딩",
    description: "젝트 활동 전반 소개 및 프로젝트 시작",
  },
  {
    id: 2,
    stepLabel: "2026년 10월 10일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "젝트 세미나",
    description: "실무 관점의 인사이트 강연 및 Q&A",
  },
  {
    id: 3,
    stepLabel: "2026년 10월 24일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "기획 발표 세션",
    description: "각 팀 서비스 기획 내용 발표 및 Q&A",
  },
  {
    id: 4,
    stepLabel: "2026년 11월 14일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "선택 참여", variant: "blue" },
    ],
    title: "젝커톤",
    description: "젝트 주관 공식 해커톤",
  },
  {
    id: 5,
    stepLabel: "2026년 11월 28일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "선택 참여", variant: "blue" },
    ],
    title: "젝-트게더",
    description: "타 팀과의 네트워킹 및 리프레시",
  },
  {
    id: 6,
    stepLabel: "2026년 12월 19일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "젝러닝",
    description: "사용자 테스트 진행 및 개선 작업",
  },
  {
    id: 7,
    stepLabel: "2026년 12월 20일(일) - 2027년 1월 8일(금)",
    badges: [],
    title: "고도화 및 운영 기간",
    description: "기능 개선 및 운영 성과 축적",
  },
  {
    id: 8,
    stepLabel: "2027년 1월 9일(토)",
    badges: [
      { label: "오프라인", variant: "orange" },
      { label: "필수 참여", variant: "pink" },
    ],
    title: "5기 데모데이",
    description: "최종 결과 발표 및 성과 공유",
  },
];

export const figmaGuideCurriculumData: FigmaGuideItem[] = [
  {
    id: 1,
    title: "작업 환경 설정",
    descriptions: ["계정과 플랜 구분하기", "작업 환경 설정하기"],
  },
  {
    id: 2,
    title: "디자인 제작 기초",
    descriptions: [
      "캔버스와 레이어 탐색하기",
      "도형, 텍스트, 이미지 다루기",
      "그룹, 프레임, 섹션 구분하기",
      "Auto layout 이해하기",
    ],
  },
  {
    id: 3,
    title: "구성요소와 프로토타이핑",
    descriptions: [
      "Component와 Instance 이해하기",
      "Property와 Variant 이해하기",
      "Style과 Variable 관리하기",
      "Prototyping으로 상태와 화면 전이 만들기",
    ],
  },
  {
    id: 4,
    title: "디자인 협업",
    descriptions: [
      "파일과 페이지 구조 설계하기",
      "레이어 구조 설계하기",
      "용어와 네이밍 컨벤션 합의하기",
      "라이브러리 관리 및 SSOT 운영하기",
      "코멘트, 버전, 히스토리 관리하기",
    ],
  },
  {
    id: 5,
    title: "개발 핸드오프",
    descriptions: [
      "핸드오프 패키지 구성하기",
      "Foundation과 Component 문서화하기",
      "피드백 분류와 로그 남기기",
    ],
  },
];
