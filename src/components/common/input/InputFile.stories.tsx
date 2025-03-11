import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import InputFile from './InputFile';
import File from '../file/File';

import { FileUrl } from '@/types/ui/file';

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  parameters: {
    docs: {
      description: {
        component: `InputFile 컴포넌트는 File 컴포넌트와 Uploader 컴포넌트를 조합한 컴포넌트 입니다. <br/> 파일의 추가, 삭제 기능이 가능합니다. (아직 파일 용량 제한 기능은 없습니다) `,
      },
    },
  },
  argTypes: {
    children: {
      description: `File 컴포넌트를 위한 위치입니다.`,
    },
    fileExtensions: {
      control: 'object',
      description: '업로드 가능한 파일 확장자를 담은 배열입니다.',
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

export const InputFilePdfStory: Story = {
  name: 'Only PDF File Story',
  render: function Render() {
    const [fileList, setFileList] = useState<FileUrl[]>([]);

    const addFile = (files: FileList | null) => {
      // 개별 file을 CDN URL로 변환 후 fileUrl 형태로 가공하여 setFileList에 담기

      const tempData = [
        {
          id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          name: '임시 파일입니다.',
          url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          size: 10902,
        },
        {
          id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f3',
          name: '임시 파일입니다.',
          url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          size: 10902,
        },
      ];

      if (files) setFileList(prev => [...prev, ...tempData]);
    };

    const deleteFile = (id: number | string) => {
      setFileList(fileList.filter(file => file.id !== id));
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
          {fileList.length > 0 && (
            <div className='gap-2xs flex flex-col'>
              {fileList.map(file => {
                return <File key={file.id} file={file} onDelete={deleteFile} feedback='error' />;
              })}
            </div>
          )}
        </InputFile>
      </div>
    );
  },
};

export const InputFileOtherFileExtensionStory: Story = {
  name: 'Other extension File Story',
  render: function Render() {
    const [fileList, setFileList] = useState<FileUrl[]>([]);

    const addFile = (files: FileList | null) => {
      // 개별 file을 CDN URL로 변환 후 fileUrl 형태로 가공

      const tempData = [
        {
          id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          name: '임시 파일입니다.',
          url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          size: 10902,
        },
        {
          id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f3',
          name: '임시 파일입니다.',
          url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
          size: 10902,
        },
      ];

      if (files) setFileList(prev => [...prev, ...tempData]);
    };

    const deleteFile = (id: number | string) => {
      setFileList(fileList.filter(file => file.id !== id));
    };

    return (
      <div className='gap-2xl flex flex-col'>
        <InputFile
          fileExtensions={['pdf', 'jpeg', 'png']}
          currentSize={0}
          maxSize={100}
          isDisabled={false}
          onAddFile={addFile}
          labelText='첨부파일'
          isRequired={true}
        >
          {fileList.length > 0 && (
            <div className='gap-2xs flex flex-col'>
              {fileList.map(file => {
                return <File key={file.id} file={file} onDelete={deleteFile} />;
              })}
            </div>
          )}
        </InputFile>
      </div>
    );
  },
};
