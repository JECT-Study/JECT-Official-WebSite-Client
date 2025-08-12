import { Meta, StoryObj } from '@storybook/react';

import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    height: {
      control: 'number',
      description:
        '로고의 height 크기입니다. height 크기에 맞추어 width 크기가 결정됩니다. 단위를 제거한 number 타입을 기입합니다.',
    },
    fillColor: {
      control: 'text',
      description: '로고의 색상입니다. 색상 토큰을 사용해 fill-* 형식으로 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    height: 24,
    fillColor: 'fill-object-hero-dark',
  },
};

export const LogoStory: Story = {
  name: 'LogoStory',
  render: () => {
    return (
      <div className='story-inner-row-container'>
        <Logo height={32} fillColor='fill-object-hero-dark' />
        <Logo height={24} fillColor='fill-object-hero-dark' />
        <Logo height={20} fillColor='fill-object-hero-dark' />
      </div>
    );
  },
};
