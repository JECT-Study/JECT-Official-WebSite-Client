import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';
import BlockButton from '../button/BlockButton';

import { useDialogActions } from '@/stores/dialogStore';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Dialog 컴포넌트는 Layout 컴포넌트에 포함되어있으며 Dialog를 띄우려면 useDialogActions의 openDialog 메서드를 사용합니다. 필요한 페이지에 Dialog 컴포넌트를 불러와 작성하지 않습니다. <br/> Dialog에 들어가는 내용과 함수는 zustand로 관리됩니다.  <br/> 버튼에 할당되는 함수는 openDialog의 option으로 전달하여 지정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const HorizontalDialogStory: Story = {
  name: 'Horizontal Dialog Story',
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleClick = () => {
      openDialog({
        title: '다이얼로그 타이틀',
        content: '다이얼로그 내용',
        btnLayout: 'horizontal',
        primaryBtnLabel: '버튼1',
        secondaryBtnLabel: '버튼2',
        onPrimaryBtnClick: () => action('버튼1 클릭'),
        onSecondaryBtnClick: () => action('버튼2 클릭'),
      });
    };

    return (
      <>
        <BlockButton size='md' style='solid' hierarchy='accent' onClick={handleClick}>
          horizontal 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};

export const VerticalDialogStory: Story = {
  name: 'Vertical Dialog Story',
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleClick = () => {
      openDialog({
        title: '다이얼로그 타이틀',
        content: '다이얼로그 내용',
        btnLayout: 'vertical',
        primaryBtnLabel: '버튼1',
        secondaryBtnLabel: '버튼2',
        onPrimaryBtnClick: () => action('버튼1 클릭'),
        onSecondaryBtnClick: () => action('버튼2 클릭'),
      });
    };

    return (
      <>
        <BlockButton size='md' style='solid' hierarchy='accent' onClick={() => void handleClick()}>
          Vertical 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};

export const OneButtonDialogStory: Story = {
  name: 'One Button Dialog Story',
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleClick = () => {
      openDialog({
        title: '다이얼로그 타이틀',
        content: '다이얼로그 내용',
        btnLayout: 'vertical',
        primaryBtnLabel: '버튼1',
        onPrimaryBtnClick: () => action('버튼1 클릭'),
      });
    };

    return (
      <>
        <BlockButton size='md' style='solid' hierarchy='accent' onClick={() => void handleClick()}>
          버튼 하나인 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};
