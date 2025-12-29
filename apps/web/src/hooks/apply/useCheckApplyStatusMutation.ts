import { useMutation } from "@tanstack/react-query";

import { applyApi } from "@/apis/apply";

type CheckApplyStatusResult =
  | { result: "PROFILE_NOT_REGISTERED" }
  | { result: "SUBMITTED" }
  | { result: "CONTINUE"; status: "TEMP_SAVED" | "JOINED" };

export function useCheckApplyStatusMutation() {
  return useMutation({
    mutationFn: async (): Promise<CheckApplyStatusResult> => {
      // 1. 프로필 등록 여부 확인
      const isProfileRegistered = await applyApi.getProfileInitialStatus();

      if (!isProfileRegistered) {
        return { result: "PROFILE_NOT_REGISTERED" };
      }

      // 2. 프로필 등록된 경우에만 지원 상태 확인
      const { status } = await applyApi.getStatus();

      if (status === "SUBMITTED") {
        return { result: "SUBMITTED" };
      }

      return { result: "CONTINUE", status };
    },
  });
}
