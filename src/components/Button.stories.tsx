import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<{
  label: string;
  onClick?: () => void;
}>;

export const Primary: Story = {
  args: {
    label: '예시 라벨입니다.',
  },
};
