import { Meta, StoryObj } from '@storybook/react';

import UploadIcon from '../UploadIcon';

const meta: Meta<typeof UploadIcon> = {
  title: 'Components/Icons/UploadIcon',
  component: UploadIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'UploadIcon 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'UploadIcon 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'UploadIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <UploadIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <UploadIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
