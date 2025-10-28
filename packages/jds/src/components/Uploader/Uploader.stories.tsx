import type { Meta, StoryObj } from '@storybook/react';
import { Uploader } from './Uploader';
import { UploadError } from './uploader.types';

const meta = {
  title: 'Components/Uploader',
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

export const FileUpload: StoryObj<typeof Uploader.File> = {
  name: 'FileOnUpload',
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
      <Uploader.File onUpload={onUpload} isLoading={args.isLoading} isDisabled={args.isDisabled} />
    );
  },
};

export const FileOnError: StoryObj<typeof Uploader.File> = {
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
      <Uploader.File
        onError={onError}
        maxFileSize={1}
        isLoading={args.isLoading}
        isDisabled={args.isDisabled}
      />
    );
  },
};

export const FileOnCancel: StoryObj<typeof Uploader.File> = {
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
      <Uploader.File
        onIssue={onIssue}
        onCancel={onCancel}
        isLoading={args.isLoading}
        isDisabled={args.isDisabled}
      />
    );
  },
};

export const Image: StoryObj<typeof Uploader.Image> = {
  name: 'Image',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => <Uploader.Image isLoading={args.isLoading} isDisabled={args.isDisabled} />,
};
