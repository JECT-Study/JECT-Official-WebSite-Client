import { Meta, StoryObj } from '@storybook/react';

import NorthEastIcon from '../NorthEastIcon';

const meta: Meta<typeof NorthEastIcon> = {
  title: 'Components/Icons/NorthEastIcon',
  component: NorthEastIcon,
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

type Story = StoryObj<typeof NorthEastIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'NorthEastIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <NorthEastIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <NorthEastIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
