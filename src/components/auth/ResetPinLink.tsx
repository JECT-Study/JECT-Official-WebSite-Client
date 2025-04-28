import { useNavigate } from 'react-router-dom';

import LabelButton from '@/components/common/button/LabelButton';
import { PATH } from '@/constants/path';

export const ResetPinLink = () => {
  const navigate = useNavigate();

  const navigateToResetPin = () => {
    void navigate(PATH.resetPin);
  };

  return (
    <LabelButton hierarchy='tertiary' onClick={navigateToResetPin} size={'xs'}>
      PIN 다시 설정하기
    </LabelButton>
  );
};
