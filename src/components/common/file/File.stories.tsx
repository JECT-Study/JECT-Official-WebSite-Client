import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import File from './File';

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  parameters: {
    docs: {
      description: {
        component:
          'File 컴포넌트는 선택한 파일을 삭제할 수 있으며, 클릭했을 때 새로운 창으로 파일을 열람할 수 있습니다. 아래 스토리들은 임시의 ject 파일(url)을 사용했습니다.',
      },
    },
  },
  argTypes: {
    file: {
      control: 'file',
      description: 'FileUrl타입으로 id, name, cdn url, size 값이 들어간 객체입니다.',
    },
    isDisabled: {
      control: 'boolean',
      description: '기본값을 false이며 true일 경우 file 컴포넌트가 비활성화됩니다.',
    },
    onDelete: {
      action: 'clicked',
      description:
        '파일의 X 버튼을 클릭했을 때 호출되는 함수로, 파일 삭제를 위한 함수입니다. onDelete를 생략할 경우 X 버튼은 나타나지 않습니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof File>;

export const FileStory: Story = {
  name: 'FileStory',
  render: () => {
    const file = {
      id: 1,
      name: '파일명.pdf',
      url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
      size: 4607,
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <File file={file} />
      </div>
    );
  },
};

export const RemovableFileStory: Story = {
  name: 'Removable FileStory',
  render: () => {
    const file = {
      id: 1,
      name: '파일명.pdf',
      url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
      size: 4607,
    };

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
    const file = {
      id: 1,
      name: '파일명.pdf',
      url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
      size: 4607,
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <File file={file} onDelete={action('delete')} isDisabled={true} />
      </div>
    );
  },
};
