import { Meta, StoryObj } from '@storybook/react';

import Label from './Label';

import { Hierarchy, Weight } from '@/styles/labelStyle';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    weight: {
      control: 'radio',
      options: ['normal', 'bold'],
    },
    hierarchy: {
      control: 'radio',
      options: ['stronger', 'strong', 'normal', 'weak'],
    },
    text: {
      control: 'text',
    },
    textColor: {
      control: 'color',
    },
    isRequired: {
      description:
        '사용자에게 필수라는 의미를 전달하기 위해 붙이는 표시로 이 파라미터는 생략가능합니다. 생략했을 경우 false로 동작합니다.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<{
  hierarchy: Hierarchy;
  weight: Weight;
  text: string;
  textColor: string;
  isRequired?: boolean;
}>;

export const Primary: Story = {
  args: {
    weight: 'normal',
    hierarchy: 'weak',
    textColor: '#000',
    text: '레이블',
    isRequired: true,
  },
};
