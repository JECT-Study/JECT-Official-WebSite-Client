import type { Meta, StoryObj } from '@storybook/react';
import { NumericBasicBadge } from './NumericBasicBadge';

const meta = {
  title: 'Components/NumericBasicBadge',
  component: NumericBasicBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'NumericBasicBadge',
    },
  },
} satisfies Meta<typeof NumericBasicBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hierarchy: 'accent',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '99',
  },
};

export const Component: StoryObj<typeof NumericBasicBadge> = {
  render: () => (
    <NumericBasicBadge hierarchy='secondary' size='md' badgeStyle='solid' isMuted={false}>
      100
    </NumericBasicBadge>
  ),
};
