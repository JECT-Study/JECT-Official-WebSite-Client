import type { Meta, StoryObj } from '@storybook/react';
import { BasicBadge } from './BasicBadge';

const meta = {
  title: 'Components/BasicBadge',
  component: BasicBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'BasicBadge',
    },
  },
} satisfies Meta<typeof BasicBadge>;

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

export const Component: StoryObj<typeof BasicBadge> = {
  render: () => (
    <BasicBadge hierarchy='secondary' size='md' type='solid' isMuted={false} withIcon={false}>
      Basic Badge
    </BasicBadge>
  ),
};
