import { Meta, StoryObj } from '@storybook/react';

import HeroIndex from './HeroIndex';

const meta: Meta<typeof HeroIndex> = {
  title: 'Components/Hero/HeroIndex',
  component: HeroIndex,
  tags: ['autodocs'],
  argTypes: {
    index: {
      control: 'number',
    },
    title: {
      control: 'text',
    },
    badgeText: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeroIndex>;

export const Primary: Story = {
  args: {
    index: 1,
    title: '히어로 타이틀',
    badgeText: '레이블',
    content: '히어로 내용',
  },
};
