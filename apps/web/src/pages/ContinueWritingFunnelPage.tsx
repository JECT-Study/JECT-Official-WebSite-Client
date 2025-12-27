import { Navigate, useParams, useSearchParams } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { ContinueWritingFunnel } from "@/features/apply/ContinueWritingFunnel";

const VALID_JOB_FAMILIES: JobFamily[] = ["PM", "PD", "FE", "BE"];
const VALID_STEPS = ["PROFILE", "APPLY"] as const;

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

function isValidStep(value: string | null): value is "PROFILE" | "APPLY" {
  return VALID_STEPS.includes(value as "PROFILE" | "APPLY");
}

function ContinueWritingFunnelPage() {
  const { jobFamily } = useParams<{ jobFamily: string }>();
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  if (!isValidJobFamily(jobFamily)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  if (!isValidStep(step)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  return <ContinueWritingFunnel jobFamily={jobFamily} tempSavedStep={step} />;
}

export default ContinueWritingFunnelPage;
