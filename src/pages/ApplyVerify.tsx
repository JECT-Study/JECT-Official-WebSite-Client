import ApplyVerifyEmail from './ApplyVerifyEmail';
import ApplyVerifyPin from './ApplyVerifyPin';

import { useApplyVerifyStore } from '@/stores/applyVerifyStore';

function ApplyVerify() {
  const { isNewApplicant, isResetPin } = useApplyVerifyStore();

  if (isResetPin) {
    return <ApplyVerifyEmail />;
  }

  return isNewApplicant ? <ApplyVerifyEmail /> : <ApplyVerifyPin />;
}

export default ApplyVerify;
