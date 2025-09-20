import type { Meta, StoryObj } from '@storybook/react';
import { DotFeedbackBadge } from './DotFeedbackBadge';

const meta = {
  title: 'Components/DotFeedbackBadge',
  component: DotFeedbackBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DotFeedbackBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'positive',
    size: 'md',
    isMuted: false,
  },
};

export const Component: StoryObj<typeof DotFeedbackBadge> = {
  render: () => <DotFeedbackBadge variant='positive' size='md' isMuted={false} />,
};
