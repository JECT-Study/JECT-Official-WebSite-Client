import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import File from './File';

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  argTypes: {
    id: {
      description:
        '각 file의 고유한 번호입니다. 고유한 id 값 혹은 배열의 index 값 혹은 File 객체의 lastModified값 등이 사용될 수 있습니다.  ',
    },
    file: {
      control: 'file',
      description: 'File 타입의 파일 객체 혹은 CDN URL입니다.',
    },
    isDisabled: {
      control: 'boolean',
      description: '기본값을 false이며 true일 경우 file 컴포넌트가 비활성화됩니다.',
    },
    onDelete: {
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
        <File id={1} file={file} />
      </div>
    );
  },
};

export const RemovableFileStory: Story = {
  name: 'Removable FileStory',
  render: () => {
    const file = { lastModified: 1, name: '파일 더미.pdf', size: 4607, type: 'application/pdf' };
    return (
      <div className='gap-2xl flex flex-col'>
        <File file={file} onDelete={action('delete')} />
      </div>
    );
  },
};

export const DisabledFileStory: Story = {
  name: 'Disabled FileStory',
  render: () => {
    const file = { lastModified: 1, name: '파일 더미.pdf', size: 4607, type: 'application/pdf' };
    return (
      <div className='gap-2xl flex flex-col'>
        <File file={file} onDelete={action('delete')} isDisabled={true} />
      </div>
    );
  },
};
