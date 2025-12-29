import { Navigate, useParams } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { ContinueWritingFunnel } from "@/features/apply/ContinueWritingFunnel";

const VALID_JOB_FAMILIES: JobFamily[] = ["PM", "PD", "FE", "BE"];

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function ContinueWritingFunnelPage() {
  const { jobFamily } = useParams<{ jobFamily: string }>();

  if (!isValidJobFamily(jobFamily)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  return <ContinueWritingFunnel jobFamily={jobFamily} />;
}

export default ContinueWritingFunnelPage;
