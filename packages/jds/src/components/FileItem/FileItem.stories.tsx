import type { Meta, StoryObj } from '@storybook/react';
import { FileItem } from './FileItem';

const meta: Meta<typeof FileItem> = {
  title: 'Components/FileItem',
  component: FileItem,
  tags: ['autodocs'],
  argTypes: {
    isRemovable: {
      control: 'boolean',
      description: '파일을 삭제할 수 있는지 여부',
      defaultValue: true,
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 모드인지 여부',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 여부',
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description: '에러 상태 여부',
      defaultValue: false,
    },
    onClick: {
      action: 'clicked',
      description: '파일 아이템 클릭 이벤트',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FileItem>;

export const Default: Story = {
  args: {
    isRemovable: true,
    readonly: false,
    disabled: false,
    hasError: false,
  },
};
