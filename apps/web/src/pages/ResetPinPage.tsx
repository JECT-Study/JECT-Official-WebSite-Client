import { useSearchParams, Navigate } from "react-router-dom";

import { PATH } from "@/constants/path";
import { ResetPinFunnel } from "@/features/auth/ResetPinFunnel";

function ResetPinPage() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  if (!returnTo) {
    return <Navigate to={PATH.main} replace />;
  }

  return <ResetPinFunnel returnTo={returnTo} />;
}

export default ResetPinPage;
