import { Meta, StoryObj } from '@storybook/react';

import ExpandIcon from '../ExpandIcon';

const meta: Meta<typeof ExpandIcon> = {
  title: 'Components/Icons/ExpandIcon',
  component: ExpandIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'ExpandIcon 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'ExpandIcon 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExpandIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'ExpandIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <ExpandIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <ExpandIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
