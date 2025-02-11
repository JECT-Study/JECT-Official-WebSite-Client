import { Meta, StoryObj } from '@storybook/react';

import ProgressItem from './ProgressItem';

const meta: Meta<typeof ProgressItem> = {
  title: 'Components/Progress/ProgressItem',
  component: ProgressItem,
  argTypes: {
    index: {
      control: 'number',
    },
    title: {
      control: 'text',
    },
    subTitle: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    isActive: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressItem>;

export const Default: Story = {
  args: {
    index: 1,
    title: '프로그래스 타이틀',
    subTitle: '서브타이틀',
    content: '프로그레스 내용',
    isActive: false,
  },
};

export const Primary: Story = {
  name: 'ProgressItem',
  render: () => {
    return (
      <ProgressItem
        index={1}
        title='3월 12일(수) ~ 3월 19일(수)'
        subTitle='지원 접수 기간'
        content='젝트 웹사이트의 지원하기를 통해 접수를 받고 있어요.'
        isActive={true}
      />
    );
  },
};
