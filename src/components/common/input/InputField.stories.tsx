import { Meta, StoryObj } from '@storybook/react';

import InputField from './InputField';
import LabelButton from '../button/LabelButton';
import Icon from '../icon/Icon';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    isNegative: {
      control: { type: 'boolean' },
      description: '사용자가 잘못입력했을 경우 true값을 가집니다.',
    },
    children: {
      description:
        'input의 제일 오른쪽에 위치하는 ReactNode로, LabelButton 혹은 아이콘이 들어올 수 있습니다',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    isNegative: false,
    children: <Icon name='dropDown' size='md' fillColor='fill-object-static-inverse-hero-dark' />,
  },
};

export const InputFieldStory: Story = {
  name: 'InputFieldStory',
  render: () => {
    return (
      <InputField isNegative={false}>
        <LabelButton size='lg' hierarchy='accent'>
          인증하기
        </LabelButton>
      </InputField>
    );
  },
};
