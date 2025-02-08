import { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Badge에 들어갈 텍스트' },
    backgroundColor: { control: 'color', description: '배경색' },
    textColor: { control: 'color', description: '폰트 색상' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    text: '레이블',
    backgroundColor: 'bg-feedback-trans-information-dark',
    textColor: 'text-feedback-information-dark',
  },
};
