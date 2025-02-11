import { Meta, StoryObj } from '@storybook/react';

import YoutubeIcon from '../YoutubeIcon';

const meta: Meta<typeof YoutubeIcon> = {
  title: 'Components/Icons/YoutubeIcon',
  component: YoutubeIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'YoutubeIcon 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'YoutubeIcon 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof YoutubeIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'YoutubeIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <YoutubeIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <YoutubeIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
