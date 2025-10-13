import type { Meta, StoryObj } from '@storybook/react';
import { ContentBadge } from './ContentBadge';

const meta = {
  title: 'Components/ContentBadgeFeedback',
  component: ContentBadge.Feedback,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentBadgeFeedback',
    },
  },
} satisfies Meta<typeof ContentBadge.Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'positive',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ContentBadge.Feedback> = {
  render: () => (
    <ContentBadge.Feedback variant='positive' size='md' badgeStyle='solid' isMuted={false}>
      Feedback Badge
    </ContentBadge.Feedback>
  ),
};
