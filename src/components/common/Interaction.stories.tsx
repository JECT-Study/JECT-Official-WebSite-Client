import type { Meta, StoryObj } from '@storybook/react';

import Interaction from './Interaction';

const meta: Meta<typeof Interaction> = {
  title: 'Components/Interaction',
  component: Interaction,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '인터렉션 효과가 필요한 컴포넌트입니다. 해당 요소를 Interaction으로 감쌉니다.',
    },
    variant: {
      control: { type: 'radio' },
      description: '피그마에 정의된 variant 속성입니다.',
      options: ['default', 'brand'],
    },
    density: {
      control: { type: 'radio' },
      description: '피그마에 정의된 density 속성입니다.',
      options: ['bold', 'normal', 'subtle'],
    },
    radius: {
      control: { type: 'select' },
      description: 'Interaction으로 감싸는 자식요소의 radius와 동일해야합니다.',
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
        className={`radius-circle h-[44px] border border-blue-200 px-(--gap-lg) py-(--gap-2xs) text-black`}
      >
        레이블
      </button>
    ),
    variant: 'default',
    density: 'normal',
    radius: 'radius-circle',
  },
};
