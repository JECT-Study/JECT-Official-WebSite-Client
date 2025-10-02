import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioContent } from './RadioContent';

const meta: Meta<typeof RadioContent> = {
  title: 'Components/RadioContent',
  component: RadioContent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    radioSize: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm', 'xs'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioContent>;

export const Default: Story = {
  args: {
    radioSize: 'lg',
    radioStyle: 'empty',
    align: 'left',
    isChecked: false,
    isDisabled: false,
    subLabelVisible: false,
    subLabel: '',
    children: '레이블',
  },
};
