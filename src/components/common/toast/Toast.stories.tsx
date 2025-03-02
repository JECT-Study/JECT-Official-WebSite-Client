import { Meta } from '@storybook/react';

import Toast from './Toast';
import BlockButton from '../button/BlockButton';

import useToast from '@/hooks/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'Toast 컴포넌트는 Layout 컴포넌트에 전역적으로 위치합니다. <br/> useToast 훅을 사용하여 toast 액션을 실행할 수 있습니다. <br/> toast의 타입은 "normal", "negative", "positive" 3종류이며, 기본값은 normal입니다. <br/> toast({message: "", type: ""}) 형태로 사용하며 type은 생략할 경우 기본 타입인 normal 타입으로 설정됩니다.',
      },
    },
  },
};

export default meta;

export const All = () => {
  const { toast } = useToast();

  const normal = () => {
    toast({
      message: '토스트 레이블',
    });
  };

  const negative = () => {
    toast({ message: '토스트 레이블', type: 'negative' });
  };

  const positive = () => {
    toast({ message: '토스트 레이블', type: 'positive' });
  };

  return (
    <div className='story-inner-container'>
      <BlockButton size='md' style='solid' hierarchy='primary' onClick={normal}>
        normal type
      </BlockButton>
      <BlockButton size='md' style='solid' hierarchy='secondary' onClick={negative}>
        negative type
      </BlockButton>
      <BlockButton size='md' style='solid' hierarchy='tertiary' onClick={positive}>
        positive type
      </BlockButton>
      <Toast />
    </div>
  );
};
