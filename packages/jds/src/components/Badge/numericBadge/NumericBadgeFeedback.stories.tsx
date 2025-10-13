import type { Meta, StoryObj } from '@storybook/react';
import { NumericBadge } from './NumericBadge';

const meta = {
  title: 'Components/NumericBadge.Feedback',
  component: NumericBadge.Feedback,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'NumericBadge.Feedback',
    },
  },
} satisfies Meta<typeof NumericBadge.Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'positive',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '99',
  },
};

export const Component: StoryObj<typeof NumericBadge.Feedback> = {
  render: () => (
    <NumericBadge.Feedback variant='positive' size='md' badgeStyle='solid' isMuted={false}>
      100
    </NumericBadge.Feedback>
  ),
};
