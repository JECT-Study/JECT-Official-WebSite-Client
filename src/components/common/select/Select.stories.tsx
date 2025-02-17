import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    items: {
      control: 'array',
      description:
        '선택 옵션 이름을 배열 형태로 입력합니다. 배열의 요소에는 label 명이 들어갑니다.',
    },
    onChange: {
      action: 'changed',
      description: '아이템 선택 시 호출되는 콜백입니다.',
    },
  },
  args: {
    items: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const DefaultStory: Story = {
  name: 'Default Select',
};

export const SelectStory: Story = {
  name: 'Select',
  render: () => (
    <Select
      items={['프론트엔드 개발자', '백엔드 개발자', '프로젝트 매니저', '프로덕트 디자이너']}
    />
  ),
};
