import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileItem } from "./FileItem";
import { IconButton } from "../Button/IconButton";

const meta: Meta<typeof FileItem> = {
  title: "Components/FileItem",
  component: FileItem,
  tags: ["autodocs"],
  argTypes: {
    fileName: {
      control: "text",
      description: "파일 이름",
    },
    fileSize: {
      control: "text",
      description: "파일 용량",
    },
    readonly: {
      control: "boolean",
      description: "읽기 전용 모드인지 여부",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태 여부",
      defaultValue: false,
    },
    hasError: {
      control: "boolean",
      description: "에러 여부",
      defaultValue: false,
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    suffixButton: {
      description: "removable 파일에 대한 버튼 아이콘 컴포넌트",
    },
  },
};
export default meta;

type Story = StoryObj<typeof FileItem>;

export const Default: Story = {
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: false,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
      />
    </div>
  ),
};

export const NonRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story: "삭제 불가능한 파일 아이템입니다. suffixButton의 여부로 판단합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: false,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
      />
    </div>
  ),
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: "삭제 불가능한 파일 아이템입니다. suffixButton의 여부로 판단합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: false,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
          />
        }
      />
    </div>
  ),
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "해당 파일이 읽기 전용인 경우입니다. readonly 속성이 true일 경우, 삭제는 불가능하여 X 아이콘 버튼은 나타나지 않습니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: true,
    disabled: false,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
          />
        }
      />
    </div>
  ),
};

export const DisabledAndRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "해당 파일 아이템이 비활성화된 경우로 파일 다운로드가 불가합니다. 삭제 여부는 suffixButton의 disabled로 조정합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: true,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
          />
        }
      />
    </div>
  ),
};

export const DisabledAndNonRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "해당 파일 아이템이 비활성화된 경우로 파일 다운로드가 불가합니다. 삭제 여부는 suffixButton의 disabled로 조정합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: true,
    hasError: false,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
            disabled
          />
        }
      />
    </div>
  ),
};

export const ErrorFile: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "해당 파일의 상태나 맥락에 오류가 있는 경우입니다. hasError의 boolean 값에 따라 상태를 조정합니다",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: false,
    hasError: true,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다.",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
          />
        }
      />
    </div>
  ),
};

export const OverflowTwoLines: Story = {
  parameters: {
    docs: {
      description: {
        story: "에러 메시지가 2줄 이상 넘어갈 경우 말줄임 표시를 합니다.",
      },
    },
  },
  args: {
    fileName: "파일명.txt",
    fileSize: "1.2MB",
    readonly: false,
    disabled: false,
    hasError: true,
    errorMessage:
      "파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다. 파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시 말줄임(...) 표시합니다. ",
  },
  render: args => (
    <div style={{ width: "404px" }}>
      <FileItem
        fileName={args.fileName}
        fileSize={args.fileSize}
        readonly={args.readonly}
        disabled={args.disabled}
        hasError={args.hasError}
        errorMessage={args.errorMessage}
        suffixButton={
          <IconButton.Basic
            hierarchy='tertiary'
            size='lg'
            icon='close-line'
            onClick={() => alert("클릭")}
          />
        }
      />
    </div>
  ),
};
