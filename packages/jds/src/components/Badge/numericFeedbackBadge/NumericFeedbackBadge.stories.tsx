import type { Meta, StoryObj } from '@storybook/react';
import { NumericFeedbackBadge } from './NumericFeedbackBadge';

const meta = {
  title: 'Components/NumericFeedbackBadge',
  component: NumericFeedbackBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'NumericFeedbackBadge',
    },
  },
} satisfies Meta<typeof NumericFeedbackBadge>;

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

export const Component: StoryObj<typeof NumericFeedbackBadge> = {
  render: () => (
    <NumericFeedbackBadge variant='positive' size='md' badgeStyle='solid' isMuted={false}>
      100
    </NumericFeedbackBadge>
  ),
};
