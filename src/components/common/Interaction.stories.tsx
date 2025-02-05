/* eslint-disable */
import type { Meta, StoryObj } from '@storybook/react';

import { Interaction } from './Interaction';

const meta: Meta<typeof Interaction> = {
  title: 'Components/Interaction',
  component: Interaction,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'brand'],
    },
    density: {
      control: { type: 'radio' },
      options: ['bold', 'normal', 'subtle'],
    },
    radius: {
      control: { type: 'select' },
      options: [
        'radius-4xs',
        'radius-3xs',
        'radius-2xs',
        'radius-xs',
        'radius-sm',
        'radius-md',
        'radius-lg',
        'radius-circle',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Interaction>;

// Default - Normal
export const Default: Story = {
  args: {
    children: (
      <button
        onClick={() => console.log('hi')}
        className={`radius-circle h-[44px] border border-blue-200 px-(--gap-lg) py-(--gap-2xs) text-black`}
      >
        radius는 감싸지는 요소의 radius와 동일해야합니다.
      </button>
    ),
    variant: 'default',
    density: 'normal',
    radius: 'radius-circle',
  },
};
