import { useActiveRecruitsQuery } from "./useActiveRecruitsQuery";

import type { JobFamily } from "@/apis/apply";

export function useRecruitId(jobFamily: JobFamily | undefined) {
  const { data, isPending } = useActiveRecruitsQuery();

  const recruitId = data?.recruitments.find(
    recruitment => recruitment.jobFamily === jobFamily,
  )?.recruitId;

  return { recruitId, isPending };
}
