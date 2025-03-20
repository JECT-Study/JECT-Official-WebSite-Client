import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import InputFile from './InputFile';
import FileItem from '../file/FileItem';

const queryClient = new QueryClient();

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `InputFile 컴포넌트는 Upload, FileItem의 조합으로 구성하며 레이블, 선택된 파일, 총 용량을 표기합니다.`,
      },
    },
  },
  argTypes: {
    children: {
      description: `children으로 FileItem컴포넌트를받습니다.`,
    },
    fileExtensions: {
      control: 'object',
      description: '가능한 파일 타입을 명시하기 위한 prop 입니다.',
    },
    currentSize: {
      control: 'number',
      description: '사용자가 담은 파일의 총 용량값을 나타냅니다.',
    },
    maxSize: {
      control: 'number',
      description: '총 파일의 최대 용량값을 나타냅니다. 단위는 MB입니다.',
    },
    isDisabled: {
      control: 'boolean',
      description: '파일 업로드 가능/불가능을 결정하는 prop 입니다.',
    },
    onAddFile: {
      description:
        '사용자가 드래그 혹은 버튼을 통해 선택된 파일을 업로드할 때마다 호출되는 함수입니다.',
    },
    labelText: {
      control: 'text',
      description: 'InputFile의 레이블입니다.',
    },
    isRequired: {
      control: 'boolean',
      description: 'true일 경우 레이블에 *이 표시됩니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputFile>;

export const InputFileStory: Story = {
  name: 'InputFile Story',
  render: function Render() {
    const [fileList, setFileList] = useState<File[]>([
      new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
    ]);

    const addFile = (file: FileList | null) => {
      if (file) setFileList([...fileList, ...Array.from(file)]);
    };

    const deleteFile = (id: number | string) => {
      setFileList(fileList.filter(file => file.lastModified !== id));
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile
          fileExtensions={['pdf']}
          currentSize={0}
          maxSize={100}
          isDisabled={false}
          onAddFile={addFile}
          labelText='첨부파일'
          isRequired={true}
        >
          {fileList.length === 0
            ? null
            : fileList.map(file => <FileItem file={file} onDelete={deleteFile} />)}
        </InputFile>
      </div>
    );
  },
};
