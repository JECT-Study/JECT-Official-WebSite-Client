import type { Meta, StoryObj } from '@storybook/react';
import { NumericBadge } from './NumericBadge';
import { NumericBadgeBasicProps, NumericBasicBadgeProps } from './NumericBadge';

const meta: Meta<typeof NumericBadge.Basic> = {
  title: 'Components/NumericBadge',
  component: NumericBadge.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm', 'xs'],
    },
    badgeStyle: {
      control: 'radio',
      options: ['solid', 'empty'],
    },
    isMuted: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

export const Basic: StoryObj<NumericBadgeBasicProps> = {
  argTypes: {
    hierarchy: {
      control: 'radio',
      options: ['accent', 'primary', 'secondary', 'tertiary'],
    },
  },
  args: {
    hierarchy: 'secondary',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '99',
  },
  render: args => (
    <NumericBadge.Basic
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge.Basic>
  ),
};

export const Feedback: StoryObj<NumericBasicBadgeProps> = {
  argTypes: {
    variant: {
      control: 'radio',
      options: ['positive', 'destructive', 'notifying'],
    },
  },
  args: {
    variant: 'positive',
    size: 'md',
    badgeStyle: 'solid',
    isMuted: false,
    children: '99',
  },
  render: args => (
    <NumericBadge.Feedback
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge.Feedback>
  ),
};
