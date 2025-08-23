import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 콘텐츠',
      defaultValue: 'Hero',
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'lg',
    textAlign: 'center',
    children: '히어로',
  },
};

export const Test: Story = {
  name: 'With Wide Parent Element',
  args: {
    size: 'lg',
    textAlign: 'left',
    children: '히어로',
  },
  render: args => (
    <div style={{ width: '500px', border: '1px solid red' }}>
      <Hero size={args.size} textAlign={args.textAlign}>
        {args.children}
      </Hero>
    </div>
  ),
};
