import type { Meta, StoryObj } from '@storybook/react';
import { ContentFeedbackBadge } from './ContentFeedbackBadge';

const meta = {
  title: 'Components/ContentFeedbackBadge',
  component: ContentFeedbackBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentFeedbackBadge',
    },
  },
} satisfies Meta<typeof ContentFeedbackBadge>;

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

export const Component: StoryObj<typeof ContentFeedbackBadge> = {
  render: () => (
    <ContentFeedbackBadge variant='positive' size='md' type='solid' isMuted={false}>
      Feedback Badge
    </ContentFeedbackBadge>
  ),
};
