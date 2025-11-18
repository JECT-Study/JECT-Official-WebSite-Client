import type { Meta, StoryObj } from '@storybook/react';
import { Uploader } from './Uploader';
import { UploadError } from './uploader.types';
import { FlexColumn } from '@storybook-utils/layout';
import { useState } from 'react';

const meta = {
  title: 'Components/Uploader/File',
  component: Uploader.File,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    accept: {
      control: 'object',
      description: '업로드할 파일 형식 배열',
    },
    multiple: {
      control: 'boolean',
      description: '파일선택기에서 단일/다수 파일 선택 여부',
    },
    maxFileSize: {
      control: 'number',
      description: '파일 하나의 최대 용량',
    },
    maxTotalSize: {
      control: 'number',
      description: '허용하는 총 파일 용량',
    },
    existingFilesSize: {
      control: 'number',
      description: '이미 업로드 된 파일의 총 용량',
    },
    files: {
      control: 'object',
      description: 'controlled 방식을 위한 files',
    },
    onUpload: {
      description: '파일 업로드 시, 실행할 함수',
    },
    onError: {
      description: '에러가 났을 경우, 실행할 함수',
    },
    onCancel: {
      description: '업로드 중 취소할 경우 실행할 함수',
    },
    onIssue: {
      description: '"업로드에 문제가 있나요" 문구에 클릭 시 실행할 함수',
    },
    isLoading: {
      control: 'boolean',
      description: '업로드 로딩 여부',
    },
    isDisabled: {
      control: 'boolean',
      description: '업로더 비활성화 여부',
    },
    messages: {
      control: 'object',
      description: 'rest, loading, disabled 메시지 커스텀',
    },
  },
} satisfies Meta<typeof Uploader.File>;

export default meta;

export const File: StoryObj<typeof Uploader.File> = {
  name: 'File',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => <Uploader.File isLoading={args.isLoading} isDisabled={args.isDisabled} />,
};

export const UncontrolledFileUploader: StoryObj<typeof Uploader.File> = {
  parameters: {
    docs: {
      description: {
        story:
          'uncontrolled 업로더로, Uploader 내부에서 useReducer를 통해 files 상태를 관리합니다. 파일을 드래그앤드롭, 버튼 클릭으로 업로드 시 alert창이 나타납니다',
      },
    },
  },
  name: 'Uncontrolled File Uploader',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => {
    const onUpload = (files: File[]) => {
      const filesName = files.map(file => file.name);
      alert(`선택한 ${filesName.join(',')}파일을 업로드합니다.`);
    };

    return (
      <FlexColumn>
        <Uploader.File
          onUpload={onUpload}
          isLoading={args.isLoading}
          isDisabled={args.isDisabled}
        />
      </FlexColumn>
    );
  },
};

export const ControlledFileUploader: StoryObj<typeof Uploader.File> = {
  parameters: {
    docs: {
      description: {
        story:
          'controlled 업로더로, Uploader 컴포넌트 외부에서 useState를 통해 files 상태를 관리합니다.',
      },
    },
  },
  name: 'Controlled File Uploader',
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleUpload = (newFiles: File[]) => {
      setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div>
        <Uploader.File files={files} maxFileSize={5 * 1024 * 1024} onUpload={handleUpload} />
        <div style={{ marginTop: '1rem' }}>
          <h4>Selected Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={file.name + index}>
                {file.name} <button onClick={() => handleRemoveFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

export const FileOnError: StoryObj<typeof Uploader.File> = {
  parameters: {
    docs: {
      description: {
        story: '파일 업로드 시 에러가 발생합니다. (총 파일 용량 제한: 0bytes로 설정)',
      },
    },
  },
  name: 'FileOnError',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => {
    const onError = (error: UploadError) => {
      alert(`${error.type} 에러가 발생했습니다.`);
    };

    return (
      <FlexColumn>
        <Uploader.File
          onError={onError}
          maxFileSize={1}
          isLoading={args.isLoading}
          isDisabled={args.isDisabled}
        />
      </FlexColumn>
    );
  },
};

export const FileOnCancel: StoryObj<typeof Uploader.File> = {
  parameters: {
    docs: {
      description: {
        story: '파일 업로드 취소 및 문구 클릭 시 alert창이 나타납니다.',
      },
    },
  },
  name: 'FileOnCancel',
  args: {
    isLoading: true,
    isDisabled: false,
  },
  render: args => {
    const onCancel = () => {
      alert('파일 업로드를 취소합니다.');
    };

    const onIssue = () => {
      alert('관리자에게 문의해주세요.');
    };

    return (
      <FlexColumn>
        <Uploader.File
          onIssue={onIssue}
          onCancel={onCancel}
          isLoading={args.isLoading}
          isDisabled={args.isDisabled}
        />
      </FlexColumn>
    );
  },
};

export const FileOnlyPdf: StoryObj<typeof Uploader.File> = {
  parameters: {
    docs: {
      description: {
        story: 'pdf 형식의 파일만 업로드 가능합니다',
      },
    },
  },
  name: 'FileOnlyPdf',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => {
    const onError = (error: UploadError) => {
      alert(`${error.type} 에러가 발생했습니다. .pdf 형식 파일만 가능합니다.`);
    };

    const onUpload = (files: File[]) => {
      const filesName = files.map(file => file.name);
      alert(`선택한 ${filesName.join(',')}파일을 업로드합니다.`);
    };

    return (
      <FlexColumn>
        <Uploader.File
          accept={['.pdf']}
          onError={onError}
          onUpload={onUpload}
          isLoading={args.isLoading}
          isDisabled={args.isDisabled}
        />
      </FlexColumn>
    );
  },
};

export const CustomMessages: StoryObj<typeof Uploader.File> = {
  name: 'Custom Messages',
  args: {
    isLoading: false,
    isDisabled: false,
    messages: {
      rest: <>custom rest message</>,
      loading: <>custom loading message</>,
      disabled: <>custom disabled message</>,
    },
  },
  render: args => {
    return (
      <Uploader.File
        isLoading={args.isLoading}
        isDisabled={args.isDisabled}
        messages={args.messages}
      />
    );
  },
};
