import { Meta, StoryObj } from '@storybook/react';

import QuestionIcon from '../QuestionIcon';

const meta: Meta<typeof QuestionIcon> = {
  title: 'Components/Icons/QuestionIcon',
  component: QuestionIcon,
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

type Story = StoryObj<typeof QuestionIcon>;

export const Default: Story = {
  args: {
    size: '4xl',
    fillColor: 'fill-object-static-inverse-hero-dark',
  },
};

export const All: Story = {
  name: 'QuestionIcon',
  render: () => {
    return (
      <div className='flex items-center gap-1'>
        <QuestionIcon size='4xl' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='3xl' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='2xl' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='xl' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='lg' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='md' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='xs' fillColor='fill-object-static-inverse-hero-dark' />
        <QuestionIcon size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
      </div>
    );
  },
};
