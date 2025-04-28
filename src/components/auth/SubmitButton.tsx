import { memo } from 'react';

import { useAuthFlow } from './context';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';

export const SubmitButton = memo(function SubmitButton() {
  const { formId, isButtonDisabled, rightIconFillColor, isResetPin } = useAuthFlow();

  return (
    <BlockButton
      type='submit'
      form={formId}
      disabled={isButtonDisabled}
      size='lg'
      style='solid'
      hierarchy='accent'
      rightIcon={!isResetPin && <Icon name='forward' size='md' fillColor={rightIconFillColor} />}
    >
      {isResetPin ? 'PIN 다시 설정 완료하기' : '다음 단계로 진행하기'}
    </BlockButton>
  );
});
