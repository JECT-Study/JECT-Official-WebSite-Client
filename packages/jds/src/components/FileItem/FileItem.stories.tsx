import type { Meta, StoryObj } from '@storybook/react';
import { FileItem } from './FileItem';

const meta: Meta<typeof FileItem> = {
  title: 'Components/FileItem',
  component: FileItem,
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: 'text',
      description: '파일 이름',
    },
    fileSize: {
      control: 'text',
      description: '파일 용량',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 모드인지 여부',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 여부',
      defaultValue: false,
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    buttonProps: {
      control: false,
      description: 'removable 파일에 대한 버튼 아이콘 props',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FileItem>;

export const Default: Story = {
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: false,
    errorMessage: '',
    buttonProps: {
      onClick: () => alert('클릭'),
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const NonRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story: '삭제 불가능한 파일 아이템입니다. buttonProps의 여부로 판단합니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: false,
    errorMessage: '',
    buttonProps: undefined,
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: '삭제 불가능한 파일 아이템입니다. buttonProps의 여부로 판단합니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: false,
    errorMessage: '',
    buttonProps: {
      onClick: () => alert('클릭'),
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '해당 파일이 읽기 전용인 경우입니다. readonly 속성이 true일 경우, 삭제는 불가능하여 X 아이콘 버튼은 나타나지 않습니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: true,
    disabled: false,
    errorMessage: '',
    buttonProps: {
      onClick: () => alert('클릭'),
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const disabledAndRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '해당 파일 아이템이 비활성화된 경우로 파일 다운로드가 불가합니다. 삭제 여부는 buttonProps의 disabled로 조정합니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: true,
    errorMessage: '',
    buttonProps: {
      onClick: () => alert('클릭'),
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const disabledAndNonRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '해당 파일 아이템이 비활성화된 경우로 파일 다운로드가 불가합니다. 삭제 여부는 buttonProps의 disabled로 조정합니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: true,
    errorMessage: '',
    buttonProps: {
      onClick: () => alert('클릭'),
      disabled: true,
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};

export const ErrorFile: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '해당 파일의 상태나 맥락에 오류가 있는 경우입니다. errorMessage가 빈값이면 false, 내용이 있다면 true로 작용합니다.',
      },
    },
  },
  args: {
    fileName: '파일명.txt',
    fileSize: '1.2MB',
    readonly: false,
    disabled: false,
    errorMessage:
      '파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.',
    buttonProps: {
      onClick: () => alert('클릭'),
    },
  },
  render: args => (
    <FileItem
      fileName={args.fileName}
      fileSize={args.fileSize}
      readonly={args.readonly}
      disabled={args.disabled}
      errorMessage={args.errorMessage}
      buttonProps={args.buttonProps}
    />
  ),
};
