import { useSearchParams, Navigate } from "react-router-dom";

import { PATH } from "@/constants/path";
import { ResetPinFunnel } from "@/features/auth/ResetPinFunnel";

function ResetPinPage() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const recruitId = Number(searchParams.get("recruitId"));

  if (!returnTo || !Number.isInteger(recruitId) || recruitId <= 0) {
    return <Navigate to={PATH.main} replace />;
  }

  return <ResetPinFunnel recruitId={recruitId} returnTo={returnTo} />;
}

export default ResetPinPage;
