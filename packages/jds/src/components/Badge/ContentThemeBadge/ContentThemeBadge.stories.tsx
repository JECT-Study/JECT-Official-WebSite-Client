import type { Meta, StoryObj } from '@storybook/react';
import { ContentThemeBadge } from './ContentThemeBadge';

const meta = {
  title: 'Components/ContentThemeBadge',
  component: ContentThemeBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentThemeBadge',
    },
  },
} satisfies Meta<typeof ContentThemeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'red',
    size: 'md',
    type: 'solid',
    isMuted: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ContentThemeBadge> = {
  render: () => (
    <ContentThemeBadge variant='red' size='md' type='solid' isMuted={false}>
      Theme Badge
    </ContentThemeBadge>
  ),
};
