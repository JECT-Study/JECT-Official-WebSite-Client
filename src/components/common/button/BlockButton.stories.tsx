import type { Meta, StoryObj } from '@storybook/react';

import BlockButton from './BlockButton';

const meta: Meta<typeof BlockButton> = {
  title: 'Components/BlockButton',
  component: BlockButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    style: {
      control: { type: 'select' },
      options: ['solid', 'outlined'],
    },
    hierarchy: {
      control: { type: 'select' },
      options: ['accent', 'primary', 'secondary', 'tertiary'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof BlockButton>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <BlockButton size='lg' style='solid' hierarchy='accent'>
      버튼
    </BlockButton>
  ),
};

export const OutlinedAccent: Story = {
  name: 'Outlined Accent',
  render: () => (
    <BlockButton size='lg' style='outlined' hierarchy='accent'>
      버튼
    </BlockButton>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <BlockButton
      size='lg'
      style='solid'
      hierarchy='accent'
      leftIcon={<span>🔍</span>}
      rightIcon={<span>→</span>}
    >
      버튼
    </BlockButton>
  ),
};
