import { Meta, StoryObj } from '@storybook/react';

import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
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

type Story = StoryObj<typeof Hero>;

export const Primary: Story = {
  args: {
    title: '히어로 타이틀',
    badgeText: '레이블',
    content: '히어로 내용',
  },
};
