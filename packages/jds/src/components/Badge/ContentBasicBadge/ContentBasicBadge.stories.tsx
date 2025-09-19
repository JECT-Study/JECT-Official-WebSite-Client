import type { Meta, StoryObj } from '@storybook/react';
import { ContentBasicBadge } from './ContentBasicBadge';

const meta = {
  title: 'Components/ContentBasicBadge',
  component: ContentBasicBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'ContentBasicBadge',
    },
  },
} satisfies Meta<typeof ContentBasicBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hierarchy: 'accent',
    size: 'md',
    type: 'solid',
    isMuted: false,
    withIcon: false,
    children: '레이블',
  },
};

export const Component: StoryObj<typeof ContentBasicBadge> = {
  render: () => (
    <ContentBasicBadge
      hierarchy='secondary'
      size='md'
      type='solid'
      isMuted={false}
      withIcon={false}
    >
      Basic Badge
    </ContentBasicBadge>
  ),
};
