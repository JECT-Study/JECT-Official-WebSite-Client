import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import InputFile from './InputFile';

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  parameters: {
    docs: {
      description: {
        component: `InputFile 컴포넌트는 File 컴포넌트와 Uploader 컴포넌트를 조합한 컴포넌트 입니다. <br/> 파일의 추가, 삭제 기능이 가능합니다. (아직 파일 용량 제한 기능은 없습니다) <br/> 직접 파일을 추가해 보세요!`,
      },
    },
  },
  argTypes: {
    fileList: {
      description: `사용자가 업로드한 파일의 배열입니다. <br/> 이때 배열의 file 요소들은 File 타입의 객체이거나 CDN URL 입니다.`,
    },
    deleteFile: {
      description: '사용자가 File 컴포넌트의 X 버튼 클릭 시 호출되는 함수입니다. ',
    },
    addFile: {
      description:
        '사용자가 드래그 혹은 버튼을 통해 선택된 파일을 업로드할 때마다 호출되는 함수입니다.',
    },
    isDisabled: {
      control: 'boolean',
      description: '파일 업로드 가능/불가능을 결정하는 prop 입니다.',
    },
    fileExtensions: {
      control: 'object',
      description: '업로드 가능한 파일 확장자를 담은 배열입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputFile>;

export const InputFilePdfStory: Story = {
  name: 'Only PDF File Story',
  render: function Render() {
    const [fileList, setFileList] = useState<File[]>([]);

    const addFile = (file: FileList | null) => {
      if (file) setFileList(prev => [...prev, ...Array.from(file)]);
    };

    const deleteFile = (lastModified: number) => {
      setFileList(fileList.filter(file => file.lastModified !== lastModified));
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile
          fileList={fileList}
          addFile={addFile}
          deleteFile={deleteFile}
          isDisabled={false}
          fileExtensions={['pdf']}
        />
      </div>
    );
  },
};

export const InputFileOtherFileExtensionStory: Story = {
  name: 'Other extension File Story',
  render: function Render() {
    const [fileList, setFileList] = useState<File[]>([]);

    const addFile = (file: FileList | null) => {
      if (file) setFileList(prev => [...prev, ...Array.from(file)]);
    };

    const deleteFile = (lastModified: number) => {
      setFileList(fileList.filter(file => file.lastModified !== lastModified));
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile
          fileList={fileList}
          addFile={addFile}
          deleteFile={deleteFile}
          isDisabled={false}
          fileExtensions={['pdf', 'jpeg', 'png']}
        />
      </div>
    );
  },
};
