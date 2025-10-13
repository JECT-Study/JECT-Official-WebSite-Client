import type { Meta, StoryObj } from '@storybook/react';
import { ContentBadge } from './ContentBadge';

const meta = {
  title: 'Components/ContentBadgeBasic',
  component: ContentBadge.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentBadgeBasic',
    },
  },
} satisfies Meta<typeof ContentBadge.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hierarchy: 'accent',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    withIcon: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ContentBadge.Basic> = {
  render: () => (
    <ContentBadge.Basic
      hierarchy='accent'
      size='md'
      badgeStyle='solid'
      isMuted={false}
      withIcon={false}
    >
      Basic Badge
    </ContentBadge.Basic>
  ),
};
