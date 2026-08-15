import { isAxiosError } from "axios";

import { applyApi } from "./api";

export const applyQueryKeys = {
  all: ["apply"] as const,
  status: {
    all: () => [...applyQueryKeys.all, "status"] as const,
    byRecruitId: (recruitId: number) => [...applyQueryKeys.status.all(), recruitId] as const,
  },
  questions: {
    all: () => [...applyQueryKeys.all, "questions"] as const,
    byRecruitId: (recruitId: number) => [...applyQueryKeys.questions.all(), recruitId] as const,
  },
  draft: {
    all: () => [...applyQueryKeys.all, "draft"] as const,
    byRecruitId: (recruitId: number) => [...applyQueryKeys.draft.all(), recruitId] as const,
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
    byRecruitId: (recruitId: number) => ({
      queryKey: applyQueryKeys.status.byRecruitId(recruitId),
      queryFn: () => applyApi.getStatus(recruitId),
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
    byRecruitId: (recruitId: number) => ({
      queryKey: applyQueryKeys.questions.byRecruitId(recruitId),
      queryFn: () => applyApi.getQuestions(recruitId),
    }),
  },
  draft: {
    byRecruitId: (recruitId: number) => ({
      queryKey: applyQueryKeys.draft.byRecruitId(recruitId),
      queryFn: async () => {
        try {
          return await applyApi.getDraft(recruitId);
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
