import { Meta, StoryObj } from '@storybook/react';

import LessIcon from '../LessIcon';

const meta: Meta<typeof LessIcon> = {
  title: 'Components/Icons/LessIcon',
  component: LessIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'LessIcon 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'LessIcon 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LessIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'LessIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <LessIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <LessIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
