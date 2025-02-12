import { Meta, StoryObj } from '@storybook/react';

import AnswerBox from './AnswerBox';

const meta: Meta<typeof AnswerBox> = {
  title: 'Components/AnswerBox',
  component: AnswerBox,
  argTypes: {
    labelText: {
      control: { type: 'text' },
      description: 'AnswerBox의 레이블입니다.',
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
  },
};

export default meta;

type Story = StoryObj<typeof AnswerBox>;

export const Default: Story = {
  args: {
    labelText: '레이블',
    placeholder: '플레이스홀더',
    maxLength: 500,
    disabled: false,
  },
};

export const AnswerBoxStory: Story = {
  name: 'AnswerBoxStory',
  render: () => {
    return (
      <AnswerBox
        labelText='답변'
        required
        placeholder='어떤 공부를 하셨고, 어떤 일을 하시나요? 자유롭게 작성해 주세요.'
        maxLength={20}
      />
    );
  },
};
