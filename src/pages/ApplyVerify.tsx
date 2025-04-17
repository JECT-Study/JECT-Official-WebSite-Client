import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ApplyVerifyEmail from './ApplyVerifyEmail';
import ApplyVerifyPin from './ApplyVerifyPin';

import { PATH } from '@/constants/path';

function ApplyVerify() {
  const navigate = useNavigate();
  const [isNewApplicant, setIsNewApplicant] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const handleResetPinComplete = () => {
    void navigate(PATH.applyVerify);
  };

  return isNewApplicant ? (
    <ApplyVerifyEmail setIsNewApplicant={setIsNewApplicant} setUserEmail={setUserEmail} />
  ) : (
    <ApplyVerifyPin email={userEmail} onResetPinComplete={handleResetPinComplete} />
  );
}

export default ApplyVerify;
