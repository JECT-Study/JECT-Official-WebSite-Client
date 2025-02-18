import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import InputFile from './InputFile';

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  argTypes: {
    setAnswers: {
      description: '지원자 답변 상태를 업데이트하는 setter 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputFile>;

export const InputFileStory: Story = {
  name: 'InputFileStory',
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile setAnswers={action('setAnswers')} />
      </div>
    );
  },
};
