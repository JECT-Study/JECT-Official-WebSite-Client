import type { Meta, StoryObj } from '@storybook/react';
import { DotBadge } from './DotBadge';
import { DotBadgeFeedbackProps } from './DotBadge';

const meta: Meta<typeof DotBadge.Feedback> = {
  title: 'Components/DotBadge',
  component: DotBadge.Feedback,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['positive', 'destructive', 'notifying'],
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm', 'xs'],
    },
    isMuted: {
      control: 'boolean',
    },
  },
};

export default meta;

export const Feedback: StoryObj<DotBadgeFeedbackProps> = {
  args: {
    variant: 'positive',
    size: 'md',
    isMuted: false,
  },
  render: args => (
    <DotBadge.Feedback variant={args.variant} size={args.size} isMuted={args.isMuted} />
  ),
};
