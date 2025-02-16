import { Meta, StoryObj } from '@storybook/react';

import InputArea from './InputArea';

const meta: Meta<typeof InputArea> = {
  title: 'Components/InputArea',
  component: InputArea,
  argTypes: {
    labelText: {
      control: { type: 'text' },
      description: 'InputArea의 레이블입니다.',
    },
    placeholder: {
      control: { type: 'text' },
    },
    maxLength: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: {type: 'boolean'}
    }
  },
};

export default meta;

type Story = StoryObj<typeof InputArea>;

export const Default: Story = {
  args: {
    labelText: '레이블',
    placeholder: '플레이스홀더',
    maxLength: 500,
    disabled: false,
    required: false
  },
};

export const InputAreaStory: Story = {
  name: 'InputAreaStory',
  render: () => {
    return (
      <InputArea
        labelText='답변'
        required
        placeholder='어떤 공부를 하셨고, 어떤 일을 하시나요? 자유롭게 작성해 주세요.'
        maxLength={20}
      />
    );
  },
};
