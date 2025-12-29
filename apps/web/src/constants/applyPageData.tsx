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
  applicantInfo: "프로필 작성",
  registration: "지원서 작성",
  complete: "지원이 완료되었습니다",
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

interface JobFamilyRecruitmentInfo {
  roleDescription: {
    title: string;
    items: string[];
  };
  experiences: {
    title: string;
    items: string[];
  };
  qualifications: {
    title: string;
    items: string[];
  };
}

export const JOB_FAMILY_RECRUITMENT_INFO: Record<JobFamily, JobFamilyRecruitmentInfo> = {
  FE: {
    roleDescription: {
      title: "프론트엔드 개발자는 사용자와 상호작용하는 화면을 구현합니다:",
      items: [
        "사용자 경험을 증진시키기 위해 웹 화면을 구현하며 서비스 인터페이스 전반을 책임집니다.",
        "PD, BE와 긴밀히 협업하며 데이터 흐름과 화면 설계를 자연스럽게 연결합니다.",
        "React.js와 TypeScript를 활용해 구조적인 컴포넌트를 개발하고, 상태 관리를 통해 일관된 사용자 흐름을 만듭니다.",
        "HTML/CSS/JavaScript 기반 UI 구현과 성능 최적화를 통해 유연한 사용자 경험을 제공합니다.",
      ],
    },
    experiences: {
      title: "이런 경험들을 할 수 있어요:",
      items: [
        "React/TS 컴포넌트 설계, 반응형 UI, 상태 관리 로직 작성 등 실무형 FE 역량을 강화하며 실제 서비스 수준의 웹 화면 개발을 처음부터 끝까지 경험할 수 있습니다.",
        "API 스펙 협의, Figma 디자인과의 매칭, 데이터 흐름 설계를 통틀어 PD, BE와 협업합니다. 이 과정에서 '프론트엔드 개발자의 역할'을 명확히 이해할 수 있어요.",
        "렌더링 최적화, 컴포넌트 분리, 불필요한 리렌더링 관리 등 실무 기술들을 습득할 수 있습니다.",
        "팀 프로젝트 협업을 경험하는 과정에서 FE로서 협업에 기여하는 방법을 배울 수 있습니다.",
      ],
    },
    qualifications: {
      title: "이런 분과 함께 하고 싶어요:",
      items: [
        "HTML/CSS/JS, React.js, TypeScript 등 기본적인 웹 기술에 대한 이해가 있는 분",
        "상태 관리, 컴포넌트 설계 등에 관심이 많고 더 많이 성장하고 싶은 분",
        "사용자 경험을 고려해 '왜 이렇게 구현해야 하는지'를 고민할 수 있는 분",
        "PD, BE와 원활하게 소통하며 더 나은 화면 구조를 함께 만들어갈 수 있는 분",
        "주도적으로 문제를 해결하고, 협업 과정에서 열린 태도로 소통할 수 있는 분",
        "최소 5개월 동안 적극적으로 시간을 투자하고 끝까지 책임감 있게 활동할 수 있는 분",
      ],
    },
  },
  BE: {
    roleDescription: {
      title: "백엔드 개발자는 안정적인 서비스 유지를 위한 시스템을 구축합니다:",
      items: [
        "비즈니스 요구사항을 분석하고 이를 기반으로 서버 로직을 설계-구현합니다.",
        "Spring Boot 기반의 API를 설계하며, 안정적이고 예측 가능한 데이터 흐름을 만듭니다.",
        "데이터베이스 모델링과 연동을 책임지고, 확장성과 성능을 고려해 구조를 설계합니다.",
        "CI/CD 및 배포 환경을 구축해 서비스가 실제로 운영될 수 있는 기반을 마련합니다.",
        "보안과 장애 대응을 고려한 안정적인 서버 아키텍처를 설계해 서비스 품질을 향상시킵니다.",
      ],
    },
    experiences: {
      title: "이런 경험들을 할 수 있어요:",
      items: [
        "요구사항 분석부터 개발-배포까지 서비스 백엔드 전 과정을 경험할 수 있습니다.",
        "Spring Boot 기반의 API 설계와 서버 로직 구현을 직접 수행합니다. 이로써 RESTful API 개발 역량을 향상시킬 수 있어요.",
        "DB 모델링과 데이터 연동 구조를 설계하며 데이터 흐름을 최적화하는 경험을 얻습니다. 성능-정규화-쿼리 효율성까지 고민하는 감각을 쌓을 수 있어요.",
        "CI/CD와 배포 자동화를 구축하며 운영까지 고려할 수 있는 구조적 사고를 키울 수 있습니다.",
        "PM, FE, PD와 협업하는 과정에서 기술적 제약 조율, 해결책을 논의합니다. 이 과정에서 커뮤니케이션 능력도 자연스럽게 성장할 수 있어요.",
      ],
    },
    qualifications: {
      title: "이런 분과 함께 하고 싶어요:",
      items: [
        "Java, Spring Boot, DB 기초 지식을 갖춘 분",
        "API 설계와 서버 로직 구현에 도전해보고 싶은 분",
        "문제를 근본적으로 해결하려는 태도를 가진 분",
        "협업을 즐기고, 다른 포지션의 의견을 기술적으로 번역-설명할 수 있는 분",
        "코드 품질과 확장성을 고려하며 성장하고 싶은 분",
        "최소 5개월 동안 적극적으로 시간을 투자하고 끝까지 책임감 있게 활동할 수 있는 분",
      ],
    },
  },
  PM: {
    roleDescription: {
      title: "프로덕트 매니저는 사용자와 비즈니스를 연결하는 문제 구조를 정의합니다:",
      items: [
        "사용자의 불편함을 분석해 서비스의 목표, 기능 우선순위, 비즈니스 모델을 정의합니다.",
        "UX 플로우, 기능 정의서, 와이어프레임 등 기획 산출물을 구성합니다.",
        "개발-디자인 포지션과 긴밀히 협력하며 요구사항 정리와 의사결정 흐름을 정돈합니다.",
        "프로젝트 일정을 관리하고, 스프린트-데일리 스탠드업-리뷰-회고를 운영하며, 문서화를 통해 팀 내 정보를 체계적으로 관리합니다.",
      ],
    },
    experiences: {
      title: "이런 경험들을 할 수 있어요:",
      items: [
        "용자의 구체적-잠재적 문제를 정의하고 이를 해결하기 위한 기능 요구사항을 설계합니다. 이를 통해 사용자의 문제를 직접 해결하는 기획 역량을 기를 수 있어요.",
        "개발-디자인-기획 포지션이 서로 협업하는 환경에서 매니지먼트를 담당합니다. 이는 실제 프로덕트 개발 과정을 온전히 경험할 수 있음을 의미해요.",
        "스프린트 운영, 일정 관리, 우선순위 결정을 맡아 프로젝트 관리 역량을 성장시킬 수 있습니다.",
        "MVP 설정, 실험-회고까지 거치며 가설을 검증하는 Product thinking을 익힐 수 있습니다.",
        "UX 플로우, 기능 정의서, 와이어프레임, 백로그 정리 등 기획 산출물을 직접 만들 수 있어요",
      ],
    },
    qualifications: {
      title: "이런 분과 함께 하고 싶어요:",
      items: [
        "사용자의 불편함을 깊이 이해하고, 이를 해결하기 위해 어떤 기능이 왜 필요한지 설명할 수 있는 분",
        "기획 내용을 문서-플로우-와이어프레임 등으로 체계화하는 데 익숙한 분",
        "FE, BE, PD와 원활하게 소통하며 의견을 조율해 합의를 이끌어내려는 태도를 가진 분",
        "일정, 우선순위, 개발 범위를 고민하며 프로젝트를 끝까지 책임질 수 있는 분",
        "가설을 세우고 검증하며, 더 나은 방향을 고민하는 Product thinking에 관심이 있는 분",
      ],
    },
  },
  PD: {
    roleDescription: {
      title: "프로덕트 디자이너는 사용자 경험과 협업을 위한 디자인 규칙을 설계합니다:",
      items: [
        "사용자의 불편함이 서비스 이용을 통해 해결될 수 있도록 문제 해결 가설을 수립합니다.",
        "PM과 함께 구체적인 UX 플로우와 Hi-Fi 와이어프레임을 제작합니다.",
        "기능이 사용자와 시각적으로 상호작용하며 동작할 수 있도록 UI를 디자인합니다.",
        "서비스가 더 매력적으로 사용자에게 다가갈 수 있도록 아이덴티티 그래픽을 제작합니다.",
        "팀원들의 협업 환경을 효율적으로 개선하기 위한 디자인 라이브러리(시스템)를 제작합니다.",
        "퍼널 중 전환율 저하가 염려되는 부분에 대해 UX 가설을 세워 사용자가 겪는 어려움을 찾아내고 이를 시각적 혹은 기능적으로 개선합니다.",
      ],
    },
    experiences: {
      title: "이런 경험들을 할 수 있어요:",
      items: [
        "PM과 협업해 서비스 목표와 기능을 논의합니다. 그에 대한 일련의 UX 플로우를 기준으로 UI 설계 방법을 익힐 수 있어요.",
        "사용자가 성공적으로 플로우를 완료할 수 있도록 여러 가설을 실험하고 검증합니다. 이 과정에서 컴포넌트를 설계-개선하거나 정보 위계 구조를 점검하는 경험을 할 수 있어요.",
        "서비스 내부 요소들이 모두 하나의 콘셉트 내에서 시각적 일관성을 유지할 수 있도록 디자인 규칙을 설계해 볼 수 있어요.",
        "FE 개발자에게 디자인을 최종 전달하는 핸드오프를 경험합니다. 이후 긴급한 수정요청에 대응하거나 개선 작업에 효율적으로 임하는 방법을 설계해 볼 수 있어요.",
        "필요 시 팀과 협의해 애널리틱스 툴을 서비스에 적용합니다. 이를 통해 정성적 데이터에서 나아가 정량적 데이터를 기반으로 하는 UX 가설을 수립할 수 있어요.",
      ],
    },
    qualifications: {
      title: "이런 분과 함께 하고 싶어요:",
      items: [
        "Figma를 활용해 UI 작업을 진행해 본 경험이 있는 분",
        "디자인에 대해 의도를 설명하고 스스로 개선해 나갈 수 있는 분",
        "디지털 서비스를 디자인하고 사용자를 확보해 운영까지 경험해보고 싶은 분",
        "상호 존중을 바탕으로 팀 협업에 협조적으로 임할 수 있는 분",
        "최소 5개월 동안 적극적으로 시간을 투자하고 끝까지 책임 있게 활동할 수 있는 분",
      ],
    },
  },
};
