import { Navigate, useParams } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { ApplyFunnel } from "@/features/apply/ApplyFunnel";
import { useRecruitId } from "@/hooks/recruit";

const VALID_JOB_FAMILIES: JobFamily[] = ["PM", "PD", "FE", "BE", "APP"];

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function ApplyFunnelPage() {
  const { jobFamily } = useParams();
  const isValid = isValidJobFamily(jobFamily);
  const { recruitId, isPending } = useRecruitId(isValid ? jobFamily : undefined);

  if (!isValid) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  if (isPending) {
    return null;
  }

  if (recruitId == null) {
    return <Navigate to={`${PATH.applyGuide}/${jobFamily}`} replace />;
  }

  return <ApplyFunnel jobFamily={jobFamily} recruitId={recruitId} />;
}

export default ApplyFunnelPage;
