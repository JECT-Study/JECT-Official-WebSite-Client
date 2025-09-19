import type { Meta, StoryObj } from '@storybook/react';
import { ThemeBadge } from './ThemeBadge';

const meta = {
  title: 'Components/ThemeBadge',
  component: ThemeBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ThemeBadge',
    },
  },
} satisfies Meta<typeof ThemeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'red',
    size: 'md',
    type: 'solid',
    isMuted: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ThemeBadge> = {
  render: () => (
    <ThemeBadge variant='red' size='md' type='solid' isMuted={false}>
      Theme Badge
    </ThemeBadge>
  ),
};
