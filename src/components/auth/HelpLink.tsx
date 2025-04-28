import { useNavigate } from 'react-router-dom';

import { useAuthFlow } from './context';

import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import { PATH } from '@/constants/path';

export const HelpLink = () => {
  const { state } = useAuthFlow();
  const navigate = useNavigate();

  if (state.step === 'PIN') {
    return null;
  }

  return (
    <LabelButton
      size='xs'
      hierarchy='tertiary'
      rightIcon={<Icon name='rightChevron' size='2xs' fillColor='fill-object-alternative-dark' />}
      onClick={() => void navigate(`${PATH.faq}/1/apply-5`)}
    >
      이메일이 오지 않았나요?
    </LabelButton>
  );
};
