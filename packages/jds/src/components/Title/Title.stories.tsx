import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: '레이블 텍스트',
      defaultValue: 'Title',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    textAlign: 'left',
    children: '타이틀',
  },
};

export const WithWideParentElement: Story = {
  name: 'With Wide Parent Element',
  args: {
    size: 'lg',
    textAlign: 'left',
    children: '타이틀',
  },
  render: args => (
    <div style={{ width: '500px', border: '1px solid red' }}>
      <Title size={args.size} textAlign={args.textAlign}>
        {args.children}
      </Title>
    </div>
  ),
};

export const WithColor: Story = {
  name: 'With Color',
  args: {
    size: 'lg',
    textAlign: 'left',
    children: '타이틀',
  },
  render: args => {
    const theme = useTheme();

    return <Title {...args} color={theme.color.semantic.accent.neutral} />;
  },
};
