import { useState } from "react";

import ApplyVerifyEmail from "./ApplyVerifyEmail";
import ApplyVerifyPin from "./ApplyVerifyPin";

function ApplyVerify() {
  const [isNewApplicant, setIsNewApplicant] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  return isNewApplicant ? (
    <ApplyVerifyEmail setIsNewApplicant={setIsNewApplicant} setUserEmail={setUserEmail} />
  ) : (
    <ApplyVerifyPin email={userEmail} />
  );
}

export default ApplyVerify;
