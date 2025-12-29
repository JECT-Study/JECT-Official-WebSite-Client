import { isAxiosError } from "axios";

import { applyApi } from "./api";
import type { JobFamily } from "./schemas";

export const applyQueryKeys = {
  all: ["apply"] as const,
  status: {
    all: () => [...applyQueryKeys.all, "status"] as const,
    current: () => [...applyQueryKeys.status.all(), "current"] as const,
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
    initialStatus: () => [...applyQueryKeys.profile.all(), "initialStatus"] as const,
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
    current: () => ({
      queryKey: applyQueryKeys.status.current(),
      queryFn: () => applyApi.getStatus(),
    }),
  },
  profile: {
    me: () => ({
      queryKey: applyQueryKeys.profile.me(),
      queryFn: applyApi.getMe,
    }),
    initialStatus: () => ({
      queryKey: applyQueryKeys.profile.initialStatus(),
      queryFn: applyApi.getProfileInitialStatus,
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
      queryFn: async () => {
        try {
          return await applyApi.getDraft();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 404) {
            return { answers: {}, portfolios: [] };
          }
          throw error;
        }
      },
    }),
  },
} as const;

export type ApplyQueryKeys = typeof applyQueryKeys;
export type ApplyMutationKeys = typeof applyMutationKeys;
export type ApplyQueries = typeof applyQueries;
