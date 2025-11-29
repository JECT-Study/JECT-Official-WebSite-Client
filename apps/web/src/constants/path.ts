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
} as const;

export const disabledPage: string[] = [
  PATH.applyVerify,
  PATH.applicantInfo,
  PATH.applyRegistration,
  PATH.applyComplete,
];
