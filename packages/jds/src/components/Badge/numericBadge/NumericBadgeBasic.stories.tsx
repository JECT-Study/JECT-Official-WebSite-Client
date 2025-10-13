import type { Meta, StoryObj } from '@storybook/react';
import { NumericBadge } from './NumericBadge';

const meta = {
  title: 'Components/NumericBadgeBasic',
  component: NumericBadge.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'NumericBadgeBasic',
    },
  },
} satisfies Meta<typeof NumericBadge.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hierarchy: 'accent',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '99',
  },
};

export const Component: StoryObj<typeof NumericBadge.Basic> = {
  render: () => (
    <NumericBadge.Basic hierarchy='accent' size='md' badgeStyle='solid' isMuted={false}>
      99
    </NumericBadge.Basic>
  ),
};
