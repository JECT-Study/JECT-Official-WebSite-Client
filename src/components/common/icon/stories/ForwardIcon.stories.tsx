import { Meta, StoryObj } from '@storybook/react';

import ForwardIcon from '../ForwardIcon';

const meta: Meta<typeof ForwardIcon> = {
  title: 'Components/Icons/ForwardIcon',
  component: ForwardIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'CheckIcon의 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'CheckIcon의 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ForwardIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'ForwardIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <ForwardIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <ForwardIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
