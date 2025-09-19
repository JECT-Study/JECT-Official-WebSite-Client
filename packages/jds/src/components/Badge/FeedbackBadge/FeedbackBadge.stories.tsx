import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackBadge } from './FeedbackBadge';

const meta = {
  title: 'Components/FeedbackBadge',
  component: FeedbackBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'FeedbackBadge',
    },
  },
} satisfies Meta<typeof FeedbackBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'positive',
    size: 'md',
    type: 'solid',
    isMuted: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof FeedbackBadge> = {
  render: () => (
    <FeedbackBadge variant='positive' size='md' type='solid' isMuted={false}>
      Feedback Badge
    </FeedbackBadge>
  ),
};
