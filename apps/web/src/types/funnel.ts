import type { JobFamily } from "./apis/application";
import type { ProfileData } from "./profile";

export type {
  CareerDetails,
  Region,
  ExperiencePeriod,
  InterestedDomain,
  ProfileData,
} from "./profile";

export {
  CAREER_DETAILS_LABELS,
  REGION_LABELS,
  EXPERIENCE_PERIOD_LABELS,
  INTERESTED_DOMAIN_LABELS,
} from "./profile";

//지원 상태(/apply/status) 서버 응답
export type ApplicationStatus = "JOINED" | "TEMP_SAVED" | "SUBMITTED";

//단계별 Context

//JobFamily에 대한 공고 이기 때문에 해당 인터페이스를 기본으로 가짐
interface BaseContext {
  jobFamily: JobFamily;
}

export type ApplyFunnelSteps = {
  이메일인증: BaseContext & { email?: string };

  // 2-A. 신규 회원 경로
  인증코드입력: BaseContext & { email: string };
  PIN설정: BaseContext & { email: string };

  // 2-B. 기존 회원 경로
  지원상태확인: BaseContext & { email: string };

  // 3. 공통 (이후 단계)
  지원자정보: BaseContext & { email: string };

  // 지원서 작성은 프로필이 이미 등록됨
  지원서작성: BaseContext & { email: string } & ProfileData;

  완료: BaseContext & { email: string } & ProfileData;
};

export type ApplyFunnelStep = keyof ApplyFunnelSteps;

// 이어쓰기 Funnel (기존 회원 전용)

export type ContinueWritingFunnelSteps = {
  본인확인: BaseContext & {
    email?: string;
    // 지원자 상태 조회 시 저장된 상태
    tempSavedStep: "PROFILE" | "APPLY";
  };

  지원자정보: BaseContext & { email: string; tempSavedStep: "PROFILE" };
  지원서작성: BaseContext & { email: string; tempSavedStep: "APPLY" } & ProfileData;
  완료: BaseContext & { email: string } & ProfileData;
};

export type ContinueWritingFunnelStep = keyof ContinueWritingFunnelSteps;

// PIN 재설정 Funnel

export type ResetPinFunnelSteps = {
  이메일인증: {
    email?: string;
    returnTo: string;
  };

  인증코드입력: {
    email: string;
    returnTo: string;
  };

  새PIN설정: {
    email: string;
    returnTo: string;
  };
};

export type ResetPinFunnelStep = keyof ResetPinFunnelSteps;

//단계별 진행률 Step 컴포넌트 용
export const STEP_PROGRESS: Record<ApplyFunnelStep, number> = {
  이메일인증: 1,
  인증코드입력: 1,
  PIN설정: 1,
  지원상태확인: 1,
  지원자정보: 2,
  지원서작성: 3,
  완료: 3,
};

export const TOTAL_STEPS = 3;
