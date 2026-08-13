import { recruitApi } from "./api";

export const recruitQueryKeys = {
  all: ["recruit"] as const,
  active: {
    all: () => [...recruitQueryKeys.all, "active"] as const,
    list: () => [...recruitQueryKeys.active.all(), "list"] as const,
  },
} as const;

export const recruitQueries = {
  active: {
    list: () => ({
      queryKey: recruitQueryKeys.active.list(),
      queryFn: () => recruitApi.getActiveRecruitments(),
    }),
  },
} as const;

export type RecruitQueryKeys = typeof recruitQueryKeys;
export type RecruitQueries = typeof recruitQueries;
