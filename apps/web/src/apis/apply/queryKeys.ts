import { applyApi } from "./api";
import type { JobFamily } from "./schemas";

export const applyQueryKeys = {
  all: ["apply"] as const,
  status: {
    all: () => [...applyQueryKeys.all, "status"] as const,
    byEmail: (email: string) => [...applyQueryKeys.status.all(), "email", email] as const,
  },
  questions: {
    all: () => [...applyQueryKeys.all, "questions"] as const,
    byJobFamily: (jobFamily: JobFamily) => [...applyQueryKeys.questions.all(), jobFamily] as const,
  },
  draft: {
    all: () => [...applyQueryKeys.all, "draft"] as const,
    current: () => [...applyQueryKeys.draft.all(), "current"] as const,
  },
  profile: {
    all: () => [...applyQueryKeys.all, "profile"] as const,
    me: () => [...applyQueryKeys.profile.all(), "me"] as const,
  },
} as const;

export const applyMutationKeys = {
  auth: {
    checkEmail: ["apply", "auth", "check-email"] as const,
    sendCode: ["apply", "auth", "send-code"] as const,
    verifyCode: ["apply", "auth", "verify-code"] as const,
    pinLogin: ["apply", "auth", "pin-login"] as const,
    register: ["apply", "auth", "register"] as const,
    resetPin: ["apply", "auth", "reset-pin"] as const,
  },
  profile: {
    update: ["apply", "profile", "update"] as const,
  },
  draft: {
    save: ["apply", "draft", "save"] as const,
    delete: ["apply", "draft", "delete"] as const,
  },
  submit: ["apply", "submit"] as const,
  upload: {
    presignedUrls: ["apply", "upload", "presigned-urls"] as const,
    s3: ["apply", "upload", "s3"] as const,
  },
} as const;

export const applyQueries = {
  status: {
    byEmail: (email: string) => ({
      queryKey: applyQueryKeys.status.byEmail(email),
      queryFn: () => applyApi.getStatus(email),
    }),
  },
  profile: {
    me: () => ({
      queryKey: applyQueryKeys.profile.me(),
      queryFn: applyApi.getProfile,
    }),
  },
  questions: {
    byJobFamily: (jobFamily: JobFamily) => ({
      queryKey: applyQueryKeys.questions.byJobFamily(jobFamily),
      queryFn: () => applyApi.getQuestions(jobFamily),
    }),
  },
  draft: {
    current: () => ({
      queryKey: applyQueryKeys.draft.current(),
      queryFn: applyApi.getDraft,
    }),
  },
} as const;

export type ApplyQueryKeys = typeof applyQueryKeys;
export type ApplyMutationKeys = typeof applyMutationKeys;
export type ApplyQueries = typeof applyQueries;
