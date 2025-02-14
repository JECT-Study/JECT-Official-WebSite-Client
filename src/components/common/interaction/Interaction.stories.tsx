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
    isInversed: {
      control: { type: 'boolean' },
      description:
        '새로 추가된 인터렉션의 isInversed 속성입니다. 대게 true일 경우, 인터렉션이 적용된 요소가 어두워지고 false일 경우 밝아집니다.',
    },
    scale: {
      control: { type: 'text' },
      description:
        '(선택) 인터렉션의 크기를 확장합니다. scale 속성으로 크기를 변경시킵니다. &nbsp; ex) scale-x-120 (좌우 1.2배) scale-y-110 (위아래 1.1배) ',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Interaction>;

const ButtonTemp = () => {
  return (
    <button
      className={`peer radius-circle border-border-hero-dark text-object-hero-dark h-[44px] border-1 px-(--gap-lg) py-(--gap-2xs)`}
    >
      Button
    </button>
  );
};

export const Default: Story = {
  args: {
    children: (
      <button
        className={`peer radius-circle border-border-hero-dark text-object-hero-dark h-[44px] px-(--gap-lg) py-(--gap-2xs)`}
      >
        Button
      </button>
    ),
    variant: 'default',
    density: 'bold',
    isInversed: false,
  },
};

export const ChildIsRawReactElement: Story = {
  name: 'Child Is Raw ReactElement',
  render: () => {
    return (
      <Interaction variant='default' density='bold' isInversed={false}>
        <button
          className={`peer radius-circle border-border-hero-dark text-object-hero-dark h-[44px] border-1 px-(--gap-lg) py-(--gap-2xs)`}
        >
          Button
        </button>
      </Interaction>
    );
  },
};

export const ChildIsComponent: Story = {
  name: 'Child Is Component',
  render: () => {
    return (
      <Interaction variant='default' density='bold' isInversed={false} className='radius-circle'>
        <ButtonTemp />
      </Interaction>
    );
  },
};

export const AllNotInverse: Story = {
  name: 'All not inverse',
  render: () => {
    return (
      <div className='story-container'>
        <div className='story-inner-container'>
          <div className='story-inner-row-container'>
            <Interaction variant='default' density='bold' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
            <Interaction variant='default' density='normal' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
            <Interaction variant='default' density='subtle' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='bold' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='normal' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='subtle' isInversed={false}>
              <button className={`peer radius-circle px-(--gap-lg) py-(--gap-2xs) text-white`}>
                Button
              </button>
            </Interaction>
          </div>
        </div>
      </div>
    );
  },
};

export const AllInverse: Story = {
  name: 'All inverse',
  render: () => {
    return (
      <div className='story-container'>
        <div className='story-inner-container'>
          <div className='story-inner-row-container'>
            <Interaction variant='default' density='bold' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
            <Interaction variant='default' density='normal' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
            <Interaction variant='default' density='subtle' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='bold' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='normal' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
            <Interaction variant='brand' density='subtle' isInversed={true}>
              <button
                className={`peer bg-object-hero-dark radius-circle px-(--gap-lg) py-(--gap-2xs)`}
              >
                Button
              </button>
            </Interaction>
          </div>
        </div>
      </div>
    );
  },
};

export const ExpandInteraction: Story = {
  name: 'Expand Interaction',
  render: () => {
    return (
      <Interaction
        variant='default'
        density='bold'
        isInversed={false}
        scale='scale-x-118 scale-y-129'
      >
        <button
          className={`peer radius-circle border-border-hero-dark text-object-hero-dark h-[44px] border-1 px-(--gap-lg) py-(--gap-2xs)`}
        >
          Button
        </button>
      </Interaction>
    );
  },
};

//
