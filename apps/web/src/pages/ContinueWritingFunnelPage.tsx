import { Navigate, useParams } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { ContinueWritingFunnel } from "@/features/apply/ContinueWritingFunnel";
import { useRecruitId } from "@/hooks/recruit";

const VALID_JOB_FAMILIES: JobFamily[] = ["PM", "PD", "FE", "BE", "APP"];

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function ContinueWritingFunnelPage() {
  const { jobFamily } = useParams<{ jobFamily: string }>();
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

  return <ContinueWritingFunnel jobFamily={jobFamily} recruitId={recruitId} />;
}

export default ContinueWritingFunnelPage;
