import { Meta, StoryObj } from '@storybook/react';

import Input from './Input';
import LabelButton from '../button/LabelButton';
import Icon from '../icon/Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    isNegative: {
      control: { type: 'boolean' },
      description: '사용자가 잘못입력했을 경우 true값을 가집니다.',
    },
    children: {
      description:
        'input의 제일 오른쪽에 위치하는 ReactNode로, LabelButton 혹은 아이콘 등이 들어올 수 있습니다',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    isNegative: false,
    children: '',
  },
};

export const InputButtonStory: Story = {
  name: 'Input with Button',
  render: () => {
    return (
      <Input isNegative={false}>
        <LabelButton size='lg' hierarchy='accent'>
          인증하기
        </LabelButton>
      </Input>
    );
  },
};


export const InputIconStory:  Story = {
  name: 'Input with Icon',
  render: () => {
    return (
      <Input isNegative={false}>
        <Icon name='dropDown' size='md' fillColor='fill-object-static-inverse-hero-dark' />
      </Input>
    );
  },
};