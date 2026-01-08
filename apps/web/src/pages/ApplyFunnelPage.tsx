import { Navigate, useParams } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { ApplyFunnel } from "@/features/apply/ApplyFunnel";

const VALID_JOB_FAMILIES: JobFamily[] = ["PM", "PD", "FE", "BE"];

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function ApplyFunnelPage() {
  const { jobFamily } = useParams();

  if (!isValidJobFamily(jobFamily)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  return <ApplyFunnel jobFamily={jobFamily} />;
}

export default ApplyFunnelPage;
