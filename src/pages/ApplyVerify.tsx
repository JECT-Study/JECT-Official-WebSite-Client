import { useState } from 'react';

import ApplyVerifyEmail from './ApplyVerifyEmail';
import ApplyVerifyPin from './ApplyVerifyPin';

function ApplyVerify() {
  const [isNewApplicant, setIsNewApplicant] = useState<boolean>(true);

  if (isNewApplicant === false) return <ApplyVerifyPin email={''} />;

  return <ApplyVerifyEmail setIsNewApplicant={setIsNewApplicant} />;
}

export default ApplyVerify;
