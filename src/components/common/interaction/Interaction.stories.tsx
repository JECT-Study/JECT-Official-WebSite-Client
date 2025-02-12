import type { Meta, StoryObj } from '@storybook/react';

import Interaction from './Interaction';

const meta: Meta<typeof Interaction> = {
  title: 'Components/Interaction',
  component: Interaction,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        '인터렉션 효과가 필요한 컴포넌트입니다. 해당 요소를 Interaction으로 감쌉니다. <br>',
    },
    variant: {
      control: { type: 'inline-radio' },
      description: '피그마에 정의된 variant 속성입니다.',
      options: ['default', 'brand'],
    },
    density: {
      control: { type: 'inline-radio' },
      description: '피그마에 정의된 density 속성입니다.',
      options: ['bold', 'normal', 'subtle'],
    },
    scale: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Interaction>;

export const Default: Story = {
  args: {
    children: (
      <button
        className={`radius-circle border-border-hero-dark text-object-hero-dark h-[44px] px-(--gap-lg) py-(--gap-2xs)`}
      >
        Button
      </button>
    ),
    variant: 'brand',
    density: 'bold',
  },
};

export const BackgroundColor: Story = {
  name: 'HasBackgroundColor',
  render: () => {
    return (
      <Interaction variant='brand' density='bold'>
        <button
          className={`radius-circle bg-accent-normal-dark border-border-hero-dark text-object-hero-dark h-[44px] px-(--gap-lg) py-(--gap-2xs)`}
        >
          배경색 있는 요소
        </button>
      </Interaction>
    );
  },
};

export const NoBackgroundColor: Story = {
  name: 'NoBackgroundColor',
  render: () => {
    return (
      <Interaction variant='default' density='subtle'>
        <button
          className={`radius-lg text-object-neutral-dark border-border-hero-dark h-[44px] border px-(--gap-lg) py-(--gap-2xs)`}
        >
          배경색 없는 요소
        </button>
      </Interaction>
    );
  },
};
