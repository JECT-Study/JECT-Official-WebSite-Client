import type { Meta, StoryObj } from '@storybook/react';
import { DotBadge } from './DotBadge';

const meta = {
  title: 'Components/DotBadgeFeedback',
  component: DotBadge.Feedback,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DotBadge.Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'positive',
    size: 'md',
    isMuted: false,
  },
};

export const Component: StoryObj<typeof DotBadge.Feedback> = {
  render: () => <DotBadge.Feedback variant='positive' size='md' isMuted={false} />,
};
