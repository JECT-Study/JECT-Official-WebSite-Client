import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import File from './File';

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  argTypes: {
    file: {
      control: 'file',
      description: 'File 타입의 파일 객체입니다.',
    },
    onClick: {
      action: 'clicked',
      description: '파일의 X 버튼을 클릭했을 때 호출되는 함수로, 파일 삭제를 위한 함수입니다. ',
    },
  },
};

export default meta;

type Story = StoryObj<typeof File>;

export const FileStory: Story = {
  name: 'FileStory',
  render: () => {
    const file = { lastModified: 1, name: '파일 더미.pdf', size: 4607, type: 'application/pdf' };
    return (
      <div className='gap-2xl flex flex-col'>
        <File file={file} onClick={action('delete')} />
      </div>
    );
  },
};
