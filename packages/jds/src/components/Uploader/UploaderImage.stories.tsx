import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";
import { useState } from "react";

import { Uploader } from "./Uploader";
import { LabelButton } from "../Button/LabelButton";

const meta = {
  title: "Components/Uploader/Image",
  component: Uploader.Image,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    accept: {
      control: "object",
      description: "업로드할 파일 형식 배열",
    },
    multiple: {
      control: "boolean",
      description: "파일선택기에서 단일/다수 파일 선택 여부",
    },
    maxFileSize: {
      control: "number",
      description: "파일 하나의 최대 용량",
    },
    maxTotalSize: {
      control: "number",
      description: "허용하는 총 파일 용량",
    },
    existingFilesSize: {
      control: "number",
      description: "이미 업로드 된 파일의 총 용량",
    },
    files: {
      control: "object",
      description: "controlled 방식을 위한 files",
    },
    onUpload: {
      description: "파일 업로드 시, 실행할 함수",
    },
    onError: {
      description: "에러가 났을 경우, 실행할 함수",
    },
    isLoading: {
      control: "boolean",
      description: "업로드 로딩 여부",
    },
    isDisabled: {
      control: "boolean",
      description: "업로더 비활성화 여부",
    },
  },
  args: {
    isLoading: false,
    isDisabled: false,
    maxFileSize: 5 * 1024 * 1024,
  },
} satisfies Meta<typeof Uploader.Image>;

export default meta;

export const Default: StoryObj<typeof Uploader.Image> = {
  render: args => {
    const onCancel = () => {
      alert("파일 업로드를 취소합니다.");
    };

    return (
      <Uploader.Image
        isLoading={args.isLoading}
        isDisabled={args.isDisabled}
        cancelButton={
          <LabelButton.Basic
            hierarchy='tertiary'
            size='xs'
            suffixIcon='arrow-go-back-line'
            onClick={onCancel}
          >
            취소
          </LabelButton.Basic>
        }
      />
    );
  },
};

export const UncontrolledImageUploader: StoryObj<typeof Uploader.Image> = {
  parameters: {
    docs: {
      description: {
        story:
          "uncontrolled 업로더로, Uploader 내부에서 useReducer를 통해 files 상태를 관리합니다. png, jpg, jpeg 형식의 이미지 파일만 업로드 가능합니다. ",
      },
    },
  },
  render: function Render(args) {
    const onUpload = (files: File[]) => {
      const filesName = files.map(file => file.name);
      alert(`선택한 ${filesName.join(",")} 이미지를 업로드합니다. `);
    };

    return (
      <FlexColumn>
        <Uploader.Image accept={[".png", ".jpg", ".jpeg"]} onUpload={onUpload} {...args} />
      </FlexColumn>
    );
  },
};

export const ControlledImageUploader: StoryObj<typeof Uploader.Image> = {
  parameters: {
    docs: {
      description: {
        story:
          "controlled 업로더로, Uploader 컴포넌트 외부에서 useState를 통해 files 상태를 관리합니다. png, jpg, jpeg 형식의 이미지 파일만 업로드 가능합니다.",
      },
    },
  },
  render: function Render(args) {
    const [files, setFiles] = useState<File[]>([]);

    const handleUpload = (newFiles: File[]) => {
      setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div>
        <Uploader.Image
          files={files}
          accept={[".png", ".jpg", ".jpeg"]}
          onUpload={handleUpload}
          {...args}
        />
        <div style={{ marginTop: "1rem" }}>
          <h4>Selected Images:</h4>
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
