import { useState } from 'react';

import ApplyVerifyEmail from './ApplyVerifyEmail';
import ApplyVerifyPin from './ApplyVerifyPin';

function ApplyVerify() {
  const [isNewApplicant, setIsNewApplicant] = useState(true);

  return isNewApplicant ? (
    <ApplyVerifyEmail setIsNewApplicant={setIsNewApplicant} />
  ) : (
    <ApplyVerifyPin email={''} />
  );
}

export default ApplyVerify;
