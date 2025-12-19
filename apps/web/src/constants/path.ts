export const PATH = {
  maintenance: "/maintenance",
  nonSpecificError: "/service-unavailable",
  notFoundError: "/not-found",
  main: "/",
  project: "/project",
  jeckathon: "/jeckathon",
  activity: "/activity",
  apply: "/apply",
  faq: "/faq",
  applyVerify: "/apply/verify",
  applicantInfo: "/apply/applicant-info",
  applyRegistration: "/apply/registration",
  applyComplete: "/apply/complete",
  // 새로 추가된 페이지 경로입니다.
  landing: "/",
  vision: "/vision",
  teamProject: "/team-projects",
  miniStudy: "/mini-study",
  liveSession: "/live-session",
  applyInfo: "apply-info",
} as const;

export const disabledPage: string[] = [
  PATH.applyVerify,
  PATH.applicantInfo,
  PATH.applyRegistration,
  PATH.applyComplete,
];
