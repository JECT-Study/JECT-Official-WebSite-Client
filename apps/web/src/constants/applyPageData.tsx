import type { ReactNode } from "react";

import type { JobFamily } from "@/apis/apply";
import NewTabLink from "@/components/apply/NewTabLink";
import { moveToBottom } from "@/utils/scrollFunction";

export const JOB_FAMILY_OPTIONS = [
  {
    value: "PM",
    short: "PM",
    korean: "프로덕트 매니저",
    koreanFirst: "프로덕트",
    koreanSecond: "매니저",
    english: "Product Manager",
    navigationTitle: "[젝트 4기] 프로덕트 매니저 모집",
  },
  {
    value: "PD",
    short: "PD",
    korean: "프로덕트 디자이너",
    koreanFirst: "프로덕트",
    koreanSecond: "디자이너",
    english: "Product Designer",
    navigationTitle: "[젝트 4기] 프로덕트 디자이너 모집",
  },
  {
    value: "FE",
    short: "FE",
    korean: "프론트엔드 개발자",
    koreanFirst: "프론트엔드",
    koreanSecond: "개발자",
    english: "Frontend Engineer",
    navigationTitle: "[젝트 4기] 프론트엔드 개발자 모집",
  },
  {
    value: "BE",
    short: "BE",
    korean: "백엔드 개발자",
    koreanFirst: "백엔드",
    koreanSecond: "개발자",
    english: "Backend Engineer",
    navigationTitle: "[젝트 4기] 백엔드 개발자 모집",
  },
] as const;

export type JobFamilyOption = (typeof JOB_FAMILY_OPTIONS)[number];

export const findJobFamilyOption = (jobFamily: JobFamily): JobFamilyOption => {
  const option = JOB_FAMILY_OPTIONS.find(opt => opt.value === jobFamily);
  if (!option) {
    throw new Error(`Unknown jobFamily: ${jobFamily}`);
  }
  return option;
};

export const APPLY_TITLE: Record<string, ReactNode> = {
  process: "지원 과정",
  info: "지원 관련 안내",
  verifyEmail: "이메일을 인증해주세요",
  verifyPIN: "본인 확인용 PIN을 입력해주세요",
  applicantInfo: "지원자님에 대해 알려주세요",
  registration: "지원서 작성",
  complete: "지원이 완료되었어요",
  continueWriting: "이어서 작성하기",
  identityVerification: "지원자 본인 확인",
  emailVerification: "이메일 인증",
  newPinSetup: "새로운 PIN 설정",
};

interface Procedure {
  id: number;
  startDate: string;
  period: string;
  subTitle: string;
  content: ReactNode;
}

export const applyProcedureList: Procedure[] = [
  {
    id: 1,
    startDate: "2025-04-18T00:00:00",
    period: "4월 18일(금) ~ 5월 7일(수)",
    subTitle: "지원 접수 기간",
    content: (
      <p>
        젝트 웹사이트의&nbsp;
        <button
          onClick={moveToBottom}
          className='text-feedback-information-dark decoration-feedback-information-dark cursor-pointer underline'
        >
          지원하기
        </button>
        를 통해 접수를 받고 있어요.
      </p>
    ),
  },
  {
    id: 2,
    startDate: "2025-05-08T00:00:00",
    period: "5월 8일(목) ~ 5월 11일(일)",
    subTitle: "지원서 검토 기간",
    content: "소중한 지원자분들의 서류를 검토해요.",
  },
  {
    id: 3,
    startDate: "2025-05-12T00:00:00",
    period: "5월 12일(월)",
    subTitle: "합격자 발표",
    content: "젝트와 함께 몰입해 프로젝트를 진행할 분들을 최종적으로 발표드려요.",
  },
  {
    id: 4,
    startDate: "2025-05-18T00:00:00",
    period: "5월 18일(일)",
    subTitle: "온보딩",
    content: "오프라인으로 온보딩 행사를 진행해요. 필수적으로 참여해 주세요. ",
  },
];

interface Info {
  id: number;
  title: string;
  content: string;
  link?: ReactNode;
}

export const applyInfoList: Info[] = [
  {
    id: 11,
    title: "젝트는 지속 가능한 동아리를 목표로 하고 있어요",
    content: `젝트는 각 기수별로 프로젝트를 진행한 이후에도, 소속된 동아리 멤버들과 자체적인 프로젝트를 추진해요. 미니스터디와 젝커톤, 네트워킹 등의 여러 활동을 함께합니다. 일회성 프로젝트에 그치지 않고 함께 유익한 정보를 공유하며 좋은 인연이 지속되길 바라요.`,
  },
  {
    id: 12,
    title: "진중하게 참여하는 태도를 보여주세요!",
    content: `젝트는 몰입형 IT 사이드 프로젝트 동아리에요. 프로젝트를 진행하는 약 3달의 기간을 소화할 수 있는 여유와, 그에 상응하는 열정이 동반되어야 합니다. 지원자분께서는 현재 개인의 상황을 심도 있게 고려하신 뒤, 책임감을 가지고 지원해 주세요.`,
  },
  {
    id: 13,
    title: "개인정보 수집 및 이용 관련",
    content: `지원자분의 편의를 위해 지원하실 때 작성하시는 내용들은 모두 수집돼요. 젝트 지원부터 지원 기간 종료까지 지원자분의 소중한 정보를 안전하게 보관할 것을 약속드립니다.`,
    link: (
      <NewTabLink
        href='https://cultured-phalange-7de.notion.site/JECT-1cf62a893ac581cba52beb59a1eca908'
        className='text-feedback-information-dark decoration-feedback-information-dark underline'
      >
        개인정보 수집 및 이용 동의서
      </NewTabLink>
    ),
  },
  {
    id: 14,
    title: "젝트의 회칙, 꼭 확인해주세요",
    content: `서로 다른 포지션들이 모여 진행하는 팀 프로젝트에서는 중도 이탈이 치명적이에요. 때문에 이로 인한 피해를 방지하는 차원에서 회비 5만원을 받고 있어요. 5만원 중 보증금 2만원은 프로젝트 공식 일정이 종료된 후 돌려드리며, 활동비 3만원은 오프라인 행사, 간식, 굿즈 등에 사용돼요.`,
    link: (
      <NewTabLink
        href='https://cultured-phalange-7de.notion.site/JECT-fb43010a5141459ab14f786a19885f0b'
        className='text-feedback-information-dark decoration-feedback-information-dark underline'
      >
        젝트 회칙
      </NewTabLink>
    ),
  },
  {
    id: 15,
    title: "점검 시간 안내",
    content: `젝트 웹사이트는 매일 05:00~07:00에 점검을 진행합니다. 이 동안은 페이지들이 자동으로 점검 화면으로 전환돼요. 작성 중이던 지원서가 있으시다면 저장되지 않을 수 있고, 유실된 지원서 내용에 대해서는 책임질 수 없는 점을 양해 부탁드려요. 더 안정적인 지원 시스템 운영을 위해 최선을 다하겠습니다! `,
  },
];

export const applyComplete = {
  content: (
    <>
      정성스레 작성해 주신 지원서는 성공적으로 제출되었어요.
      <br /> 함께 몰입할 날들을 기대하며, 꼼꼼히 확인해 볼게요!
      <br /> 지원해 주셔서 감사합니다!
    </>
  ),
  button: "메인 페이지로",
} as const;
