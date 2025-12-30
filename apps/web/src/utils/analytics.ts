import * as amplitude from "@amplitude/analytics-browser";

// GTM dataLayer 및 Meta Pixel 타입 정의
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (type: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  RECRUITMENT_ALERT_CLICK: "recruitment_alert_click",

  // 지원 관련
  APPLY_START: "apply_start", // 지원하러 가기 버튼 클릭
  APPLY_STEP_VIEW: "apply_step_view", // 지원 단계 진입 (이탈 지점 파악용)
  APPLY_STEP_COMPLETE: "apply_step_complete", // 지원 단계 완료
  APPLY_COMPLETE: "apply_complete", // 지원 완료
} as const;

export const APPLY_STEPS = {
  EMAIL_VERIFICATION: "이메일인증",
  PIN_SETUP: "PIN설정",
  APPLICANT_INFO: "지원자정보",
  REGISTRATION: "지원서작성",
  COMPLETE: "완료",
} as const;

interface TrackEventOptions {
  isGTMEnabled?: boolean;
  isAmplitudeEnabled?: boolean;
}

//GTM dataLayer에 이벤트 푸시
function pushToDataLayer(eventName: string, eventParams: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventParams,
  });
}

//Amplitude에 이벤트 전송
function trackAmplitude(eventName: string, eventProperties: Record<string, unknown> = {}) {
  amplitude.track(eventName, eventProperties);
}

/**
 * 통합 이벤트 트래킹 함수
 * GTM(dataLayer)과 Amplitude 모두에 이벤트를 전송합니다.
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {},
  options: TrackEventOptions = { isGTMEnabled: true, isAmplitudeEnabled: true },
) {
  const { isGTMEnabled = true, isAmplitudeEnabled = true } = options;

  // UTM 파라미터 추가
  const utmParams = getStoredUTMParams();
  const enrichedParams = {
    ...eventParams,
    ...utmParams,
  };

  if (isGTMEnabled) {
    pushToDataLayer(eventName, enrichedParams);
  }

  if (isAmplitudeEnabled) {
    trackAmplitude(eventName, enrichedParams);
  }
}

/**
 * 모집 알림 신청 버튼 클릭 트래킹
 */
export function trackRecruitmentAlertClick(generation: number) {
  trackEvent(ANALYTICS_EVENTS.RECRUITMENT_ALERT_CLICK, {
    generation,
    button_text: `${generation}기 모집 알림 신청`,
  });

  // Meta Pixel - Lead 이벤트 (잠재 고객 확보)
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: `${generation}기 모집 알림 신청`,
    });
  }
}

/**
 * 지원하러 가기 버튼 클릭 트래킹
 */
export function trackApplyStart(source: string = "home") {
  trackEvent(ANALYTICS_EVENTS.APPLY_START, {
    source,
  });
}

/**
 * 지원 단계 진입 트래킹 (이탈 지점 파악용)
 */
export function trackApplyStepView(step: string, jobFamily: string) {
  trackEvent(ANALYTICS_EVENTS.APPLY_STEP_VIEW, {
    step,
    job_family: jobFamily,
  });
}

/**
 * 지원 단계 완료 트래킹
 */
export function trackApplyStepComplete(step: string, jobFamily: string) {
  trackEvent(ANALYTICS_EVENTS.APPLY_STEP_COMPLETE, {
    step,
    job_family: jobFamily,
  });
}

/**
 * 지원 완료 트래킹 (전환 이벤트)
 */
export function trackApplyComplete(jobFamily: string) {
  trackEvent(ANALYTICS_EVENTS.APPLY_COMPLETE, {
    job_family: jobFamily,
    conversion: true,
  });

  // Meta Pixel - CompleteRegistration 이벤트 (지원 완료 = 전환)
  if (typeof window.fbq === "function") {
    window.fbq("track", "CompleteRegistration", {
      content_name: "지원 완료",
      content_category: jobFamily,
    });
  }
}

// ===== UTM 파라미터 관련 =====

const UTM_STORAGE_KEY = "ject_utm_params";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  [key: string]: string | undefined;
}

/**
 * URL에서 UTM 파라미터 추출
 */
export function extractUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  UTM_PARAMS.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
}

/**
 * UTM 파라미터를 sessionStorage에 저장
 */
export function storeUTMParams(params: UTMParams) {
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  }
}

/**
 * 저장된 UTM 파라미터 조회
 */
export function getStoredUTMParams(): UTMParams {
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as UTMParams;
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * UTM 파라미터 초기화 (앱 시작 시 호출)
 * URL에 UTM 파라미터가 있으면 저장하고 Amplitude 사용자 속성에 설정
 */
export function initializeUTMTracking() {
  const utmParams = extractUTMParams();

  if (Object.keys(utmParams).length > 0) {
    // sessionStorage에 저장
    storeUTMParams(utmParams);

    // Amplitude 사용자 속성에 설정
    const identify = new amplitude.Identify();
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        identify.set(key, value);
      }
    });
    amplitude.identify(identify);

    // GTM에도 전송
    pushToDataLayer("utm_captured", utmParams);
  }
}
