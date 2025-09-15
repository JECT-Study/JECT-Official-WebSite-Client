import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { IconProps } from './Icon.types';
import { useTheme } from 'theme';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'absolute',
    size: '5xl',
    color: '#fff',
  },
};

export const ThemedIcon: Story = {
  args: {
    name: 'absolute',
    size: '3xl',
    color: '',
  },
  render: (args: IconProps) => {
    const theme = useTheme();
    return <Icon {...args} color={theme.color.theme.red.neutral} />;
  },
};
