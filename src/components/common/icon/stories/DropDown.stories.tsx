import { Meta, StoryObj } from '@storybook/react';

import DropDownIcon from '../DropDownIcon';

const meta: Meta<typeof DropDownIcon> = {
  title: 'Components/Icons/DropDownIcon',
  component: DropDownIcon,
  argTypes: {
    size: {
      control: { type: 'text' },
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'DropDownIcon의 사이즈입니다.',
    },
    fillColor: {
      control: { type: 'text' },
      options: [
        'fill-object-static-inverse-hero-dark',
        'fill-object-assistive-dark',
        'fill-accent-trans-hero-dark',
      ],
      description: 'DropDownIcon의 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropDownIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'DropDownIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <DropDownIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <DropDownIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
