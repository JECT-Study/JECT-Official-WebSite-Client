import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog, { DialogProps } from './Dialog';
import BlockButton from '../button/BlockButton';

import useDialog from '@/hooks/useDialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          '<strong>Dialog</strong>는 <strong>useDialog 훅</strong>과 사용하면 간단히 제어할 수 있습니다. <br /> useDialog의 isOpen을 Dialog의 isActive props에 할당하고, <br/> useDialog의 closeDialog, openDialog를 이용하여 다이얼로그의 열고 닫음을 설정할 수 있습니다. ',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '다이얼로그 버튼 배치 방향 (세로: vertical, 가로: horizontal)',
    },
    title: {
      control: 'text',
      description: '다이얼로그의 제목',
    },
    children: {
      control: 'text',
      description: '다이얼로그 내부의 내용',
    },
    btnLabel1: {
      control: 'text',
      description: '첫 번째 버튼의 텍스트',
    },
    btnLabel2: {
      control: 'text',
      description: '두 번째 버튼의 텍스트',
    },
    clickBtn1: {
      action: '버튼 1 클릭',
      description: '첫 번째 버튼 클릭 시 실행되는 함수',
    },
    clickBtn2: {
      action: '버튼 2 클릭',
      description: '두 번째 버튼 클릭 시 실행되는 함수',
    },
    isOpen: {
      control: 'boolean',
      description: '다이얼로그가 열려 있는지 여부 (true: 열림, false: 닫힘)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const DialogStory: Story = {
  args: {
    type: 'vertical',
    title: '다이얼로그 타이틀',
    btnLabel1: '닫기',
    btnLabel2: '확인',
    children: '다이얼로그 내용',
    isOpen: false,
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<DialogProps>();
    return (
      <>
        <BlockButton
          size='md'
          style='solid'
          hierarchy='accent'
          onClick={() => updateArgs({ isOpen: true })}
        >
          임시버튼
        </BlockButton>
        <Dialog
          {...args}
          isOpen={isOpen}
          clickBtn1={() => updateArgs({ isOpen: false })}
          clickBtn2={action('버튼 2 클릭')}
        />
      </>
    );
  },
};

export const DialogWithUseDialogHook = () => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <BlockButton size='md' style='solid' hierarchy='accent' onClick={openDialog}>
        임시버튼
      </BlockButton>
      <Dialog
        type='horizontal'
        title='다이얼로그 타이틀'
        btnLabel1='닫기'
        btnLabel2='레이블'
        isOpen={isOpen}
        clickBtn1={closeDialog}
        clickBtn2={action('클릭')}
      >
        useDialog 사용 예시
      </Dialog>
    </>
  );
};
