import type { Meta, StoryObj } from '@storybook/react';
import { ContentBadge } from './ContentBadge';

const meta = {
  title: 'Components/ContentBadgeTheme',
  component: ContentBadge.Theme,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentBadgeTheme',
    },
  },
} satisfies Meta<typeof ContentBadge.Theme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'red',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ContentBadge.Theme> = {
  render: () => (
    <ContentBadge.Theme variant='red' size='md' badgeStyle='solid' isMuted={false}>
      Theme Badge
    </ContentBadge.Theme>
  ),
};
