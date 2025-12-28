import type { JobFamily } from "./apis/application";

export type {
  CareerDetails,
  Region,
  ExperiencePeriod,
  InterestedDomain,
  ProfileData,
} from "./profile";

export {
  CAREER_DETAILS_OPTIONS,
  REGION_OPTIONS,
  EXPERIENCE_PERIOD_OPTIONS,
  INTERESTED_DOMAIN_OPTIONS,
  findLabelByValue,
} from "./profile";

export type { ApplicationStatus } from "@/apis/apply/schemas";

//단계별 Context

//JobFamily에 대한 공고 이기 때문에 해당 인터페이스를 기본으로 가짐
interface BaseContext {
  jobFamily: JobFamily;
}

export type ApplicantInfoContext = BaseContext & { email: string };
export type RegistrationContext = BaseContext & { email: string };
export type CompleteContext = BaseContext & { email: string };

export type ApplyFunnelSteps = {
  // 1. 이메일 인증 (첫 단계)
  이메일인증: BaseContext & { email?: string };

  // 2-A. 신규 회원 경로
  PIN설정: BaseContext & {
    email: string;
    authCode: string;
    termsAgreement?: {
      privacy: boolean;
      paymentPolicy: boolean;
    };
  };

  // 2-B. 기존 회원 경로
  지원상태확인: BaseContext & { email: string };

  // 3. 공통 (이후 단계)
  지원자정보: BaseContext & { email: string };

  지원서작성: BaseContext & { email: string };

  완료: BaseContext & { email: string };
};

export type ApplyFunnelStep = keyof ApplyFunnelSteps;

export type ContinueWritingFunnelSteps = {
  본인확인: BaseContext & {
    email?: string;
  };

  지원자정보: BaseContext & { email: string; tempSavedStep: "PROFILE" };
  지원서작성: BaseContext & { email: string; tempSavedStep: "APPLY" };
  완료: BaseContext & { email: string };
};

export type ContinueWritingFunnelStep = keyof ContinueWritingFunnelSteps;

export type ResetPinFunnelSteps = {
  이메일인증: {
    email?: string;
    returnTo: string;
  };

  새PIN설정: {
    email: string;
    authCode: string;
    returnTo: string;
  };
};

export type ResetPinFunnelStep = keyof ResetPinFunnelSteps;

//Todo 현재는 해당 상수 사용 x, Step 에서 현재 단계를 받아서 동적으로 계산 가능성 열어둠
export const APPLY_STEP_PROGRESS: Record<ApplyFunnelStep, number> = {
  이메일인증: 0,
  PIN설정: 0,
  지원상태확인: 0,
  지원자정보: 1,
  지원서작성: 2,
  완료: 2,
};

export const CONTINUE_STEP_PROGRESS: Record<ContinueWritingFunnelStep, number> = {
  본인확인: 0,
  지원자정보: 1,
  지원서작성: 2,
  완료: 2,
};

export const STEP_LABELS = ["이메일 인증", "프로필 작성", "지원서 작성"] as const;
