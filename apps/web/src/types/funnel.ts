import type { JobFamily } from "./apis/application";

//지원자 신분 타입
export type CareerDetails =
  | "STUDENT_ENROLLED"
  | "STUDENT_EXPECTED_GRADUATE"
  | "JOB_SEEKER"
  | "JOB_CHANGER"
  | "EMPLOYED";

//지원자 신분 레이블
export const CAREER_DETAILS_LABELS: Record<CareerDetails, string> = {
  STUDENT_ENROLLED: "대학생(재학/휴학)",
  STUDENT_EXPECTED_GRADUATE: "대학 졸업 예정",
  JOB_SEEKER: "취준생",
  JOB_CHANGER: "이직 준비 중",
  EMPLOYED: "재직자",
};

//지원 상태 타입(서버 응답)
//JOINED 는 지원서 제출 이후 Ject 에 선별된 지원서
//TEMP_SAVED 반환시 "step": 2 or 3 이렇게 추가 필드가 옴
export type ApplicationStatus = "JOINED" | "TEMP_SAVED" | "SUBMITTED";

// 메인 지원 Funnel
export type ApplyFunnelStep =
  | "이메일인증"
  | "인증코드입력"
  | "PIN설정"
  | "지원상태확인"
  | "PIN로그인"
  | "지원자정보"
  | "지원서작성"
  | "완료";

//메인 지원 Funnel Context
export interface ApplyFunnelContext {
  jobFamily: JobFamily;

  // Step 1: 이메일 인증
  email?: string;
  isNewMember?: boolean;

  // Step 1-1 (기존 회원): 지원 상태
  applicationStatus?: ApplicationStatus;
  hasTempSaved?: boolean; // TEMP_SAVED 여부
  profileCompleted?: boolean; // 프로필 완료 여부 (이어쓰기 분기용)

  // Step 2: 지원자 정보 (프로필)
  name?: string;
  phoneNumber?: string;
  careerDetails?: CareerDetails; // 지원자 신분
  residence?: string; // 거주 지역
  experiencePeriod?: string; // 직무 관련 경험 기간
  interestedDomains?: string[]; // 관심 도메인 (선택)

  // 프로필 저장 완료 여부 (PUT 중복 호출 방지용-POST 라면 필요없을 수도)
  isProfileSaved?: boolean;

  // 제출 완료 여부
  submitted?: boolean;
}

export type ResetPinFunnelStep = "이메일재인증" | "인증코드입력" | "새PIN설정" | "완료";

export interface ResetPinFunnelContext {
  email?: string;
  newPin?: string;
}

export interface FunnelStepProps<T = ApplyFunnelContext> {
  context: T;
  onNext: (data: Partial<T>) => void;
  onBack?: () => void;
}

export const REQUIRED_CONTEXT_BY_STEP: Record<ApplyFunnelStep, (keyof ApplyFunnelContext)[]> = {
  이메일인증: ["jobFamily"],
  인증코드입력: ["jobFamily", "email"],
  PIN설정: ["jobFamily", "email", "isNewMember"],
  지원상태확인: ["jobFamily", "email", "isNewMember"],
  PIN로그인: ["jobFamily", "email"],
  지원자정보: ["jobFamily", "email"],
  지원서작성: ["jobFamily", "email", "name", "phoneNumber"],
  완료: ["jobFamily", "email", "submitted"],
};

export function hasRequiredContext(context: ApplyFunnelContext, step: ApplyFunnelStep): boolean {
  const requiredFields = REQUIRED_CONTEXT_BY_STEP[step];
  return requiredFields.every(field => context[field] !== undefined);
}

export const STEP_PROGRESS: Record<ApplyFunnelStep, number> = {
  이메일인증: 1,
  인증코드입력: 1,
  PIN설정: 1,
  지원상태확인: 1,
  PIN로그인: 1,
  지원자정보: 2,
  지원서작성: 3,
  완료: 3,
};

export const TOTAL_STEPS = 3;
