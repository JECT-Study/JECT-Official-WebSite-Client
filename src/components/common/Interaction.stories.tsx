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
      control: 'radio',
      description: '피그마에 정의된 variant 속성입니다.',
      options: ['default', 'brand'],
    },
    density: {
      control: 'radio',
      description: '피그마에 정의된 density 속성입니다.',
      options: ['bold', 'normal', 'subtle'],
    },
    childHasBg: {
      control: 'boolean',
      description: '자식 요소에 배경색이 있다면 true, 없다면 false를 넘겨줍니다.',
    },
    childRadius: {
      control: 'select',
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
    childHasBg: false,
    childRadius: 'radius-circle',
  },
};

export const BackgroundColor: Story = {
  name: 'HasBackgroundColor',
  render: () => {
    return (
      <Interaction variant='brand' density='bold' childHasBg={true} childRadius='radius-circle'>
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
      <Interaction variant='default' density='subtle' childHasBg={false} childRadius='radius-lg'>
        <button
          className={`radius-lg text-object-neutral-dark border-border-hero-dark h-[44px] border px-(--gap-lg) py-(--gap-2xs)`}
        >
          배경색 없는 요소
        </button>
      </Interaction>
    );
  },
};
