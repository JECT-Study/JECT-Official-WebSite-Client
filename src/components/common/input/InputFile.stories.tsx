import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import InputFile from './InputFile';

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  parameters: {
    docs: {
      description: {
        component: `InputFile 컴포넌트는 File 컴포넌트와 Uploader 컴포넌트를 조합한 컴포넌트 입니다. <br/> 파일의 추가, 삭제 기능이 가능합니다. 
          직접 파일을 추가해 보세요!`,
      },
    },
  },
  argTypes: {
    setAnswers: {
      description: '지원자 답변 상태를 업데이트하는 setter 함수입니다.',
    },
    fileExtensions: {
      control: 'object',
      description: '업로드 가능한 파일 확장자를 담은 배열입니다. ',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputFile>;

export const Default: Story = {
  args: {
    setAnswers: () => {},
    fileExtensions: ['.pdf'],
  },
};

export const InputFilePdfStory: Story = {
  name: 'Only PDF File Story',
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile setAnswers={action('setAnswers')} fileExtensions={['.pdf']} />
      </div>
    );
  },
};

export const InputFilePdfPngStory: Story = {
  name: 'Pdf/Png File Story',
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile setAnswers={action('setAnswers')} fileExtensions={['.pdf', '.png']} />
      </div>
    );
  },
};
