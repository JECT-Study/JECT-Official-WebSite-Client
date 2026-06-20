import type { Meta, StoryObj } from "@storybook/react-vite";

import { File } from "./File";

const meta: Meta<typeof File> = {
  title: "Components/File",
  component: File,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    fileName: {
      control: "text",
      description: "파일 이름",
    },
    fileSize: {
      control: "text",
      description: "파일 크기",
    },
    removable: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    readonly: {
      control: "boolean",
      description: "읽기 전용 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
  },
};

export default meta;

interface FileStoryArgs {
  fileName: string;
  fileSize: string;
  readonly?: boolean;
  disabled?: boolean;
  removable?: boolean;
}

type Story = StoryObj<FileStoryArgs>;

const renderFile = (args: FileStoryArgs) => (
  <div style={{ width: "280px" }}>
    <File
      fileName={args.fileName}
      fileSize={args.fileSize}
      onClick={() => {
        alert("file clicked");
      }}
      {...(args.removable && !args.readonly && !args.disabled
        ? {
            readonly: false,
            disabled: false,
            removable: true,
            onRemove: () => alert("icon clicked"),
          }
        : { readonly: args.readonly, disabled: args.disabled, removable: false })}
    />
  </div>
);

export const Default: Story = {
  args: {
    fileName: "파일명.pdf",
    fileSize: "2.6MB",
    readonly: false,
    disabled: false,
    removable: false,
  },
  render: renderFile,
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "파일을 사용자가 직접 삭제할 수 있도록 해야 하는 경우에는 removable 속성을 사용합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.pdf",
    fileSize: "2.6MB",
    readonly: false,
    disabled: false,
    removable: true,
  },
  render: renderFile,
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "readonly는 파일의 정보를 읽을 수는 있지만 다운로드나 삭제 같은 조작이 제한되는 상태를 나타냅니다.",
      },
    },
  },
  args: {
    fileName: "파일명.pdf",
    fileSize: "2.6MB",
    readonly: true,
    disabled: false,
    removable: false,
  },
  render: renderFile,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "disabled는 파일 항목이 비활성화되어 접근하거나 조작할 수 없는 상태인지 나타냅니다.",
      },
    },
  },
  args: {
    fileName: "파일명.pdf",
    fileSize: "2.6MB",
    readonly: false,
    disabled: true,
    removable: false,
  },
  render: renderFile,
};
