import type { Meta, StoryObj } from '@storybook/react';

import LabelButton from './LabelButton';

const meta: Meta<typeof LabelButton> = {
  title: 'Components/LabelButton',
  component: LabelButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    hierarchy: {
      control: { type: 'select' },
      options: ['accent', 'primary', 'secondary', 'tertiary'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof LabelButton>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <LabelButton size='md' hierarchy='accent'>
      Label Button
    </LabelButton>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <LabelButton size='md' hierarchy='accent' leftIcon={<span>🔍</span>} rightIcon={<span>→</span>}>
      Label Button
    </LabelButton>
  ),
};
