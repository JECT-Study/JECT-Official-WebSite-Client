import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast.Basic> = {
  title: 'Components/Toast',
  component: Toast.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      description: '토스트의 형태를 지정합니다.',
      control: 'radio',
      options: ['toast', 'snackbar'],
      table: {
        type: { summary: `'toast' | 'snackbar'` },
        defaultValue: { summary: `'toast'` },
      },
    },
    caption: {
      description: '본문 아래에 표시되는 캡션 텍스트입니다.',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    prefixButtonProps: {
      description: '왼쪽(보조) 버튼의 속성입니다. `BlockButton.Basic`으로 전달됩니다.',
      control: 'object',
      table: {
        type: {
          summary: 'Omit<BlockButtonBasicProps, "hierarchy" | "size" | "variant">',
        },
      },
    },
    suffixButtonProps: {
      description: '오른쪽(메인) 버튼의 속성입니다. `BlockButton.Basic`으로 전달됩니다.',
      control: 'object',
      table: {
        type: {
          summary: 'Omit<BlockButtonBasicProps, "hierarchy" | "size" | "variant">',
        },
      },
    },
    children: {
      description: '토스트 타이틀 텍스트입니다.',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Toast.Basic> = {
  argTypes: {},
  args: {
    variant: 'toast',
    prefixButtonProps: {
      children: '레이블',
    },
    suffixButtonProps: {
      children: '레이블',
    },
    caption:
      '토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.',
    children: '토스트 제목 레이블',
  },
  render: args => (
    <Toast.Basic
      variant={args.variant}
      caption={args.caption}
      prefixButtonProps={args.prefixButtonProps}
      suffixButtonProps={args.suffixButtonProps}
    >
      {args.children}
    </Toast.Basic>
  ),
};

export const Feedback: StoryObj<typeof Toast.Feedback> = {
  argTypes: {
    feedback: {
      description: '토스트 피드백 속성을 지정합니다.',
      control: 'radio',
      options: ['positive', 'destructive'],
    },
  },
  args: {
    variant: 'toast',
    feedback: 'positive',
    prefixButtonProps: {
      children: '레이블',
    },
    suffixButtonProps: {
      children: '레이블',
    },
    caption:
      '토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.',
    children: '토스트 제목 레이블',
  },
  render: args => (
    <Toast.Feedback
      variant={args.variant}
      feedback={args.feedback}
      caption={args.caption}
      prefixButtonProps={args.prefixButtonProps}
      suffixButtonProps={args.suffixButtonProps}
    >
      {args.children}
    </Toast.Feedback>
  ),
};
