import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { action } from "storybook/actions";

import FileItem from "./FileItem";

const queryClient = new QueryClient();

const meta: Meta<typeof FileItem> = {
  title: "Components/FileItem",
  component: FileItem,
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
        component:
          "FileItem 컴포넌트는 선택한 파일을 삭제할 수 있으며, 클릭했을 때 새로운 창으로 파일을 열람할 수 있습니다.",
      },
    },
  },
  argTypes: {
    file: {
      control: "file",
      description: "FileItem 타입 혹은 NewPortfolio 타입의 파일을 받습니다.",
    },
    isDisabled: {
      control: "boolean",
      description: "기본값을 false이며 true일 경우 FileItem 컴포넌트가 비활성화됩니다.",
    },
    onDelete: {
      action: "clicked",
      description:
        "파일의 X 버튼을 클릭했을 때 호출되는 함수로, 파일 삭제를 위한 함수입니다. onDelete를 생략할 경우 X 버튼은 나타나지 않습니다.",
    },
    feedback: {
      control: "radio",
      options: ["error", "unknown"],
      description:
        "네트워크 오류일 경우 error 타입의 FileItem, 알 수 없는 형식일 때 unknown 타입의 FileItem을 사용합니다. ",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileItem>;

const fileItem = new File(["foo"], "foo.txt", {
  type: "text/plain",
});

export const FileItemStory: Story = {
  name: "FileItemStory",
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <FileItem file={fileItem} />
      </div>
    );
  },
};

export const RemovableFileItemStory: Story = {
  name: "Removable FileItemStory",
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <FileItem file={fileItem} onDelete={action("delete")} />
      </div>
    );
  },
};

export const DisabledFileItemStory: Story = {
  name: "Disabled FileItemStory",
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <FileItem file={fileItem} onDelete={action("delete")} isDisabled={true} />
      </div>
    );
  },
};

export const FeedbackFileItemStory: Story = {
  name: "Feedback FileItemStory",
  render: () => {
    return (
      <div className='gap-2xl flex flex-col'>
        <FileItem file={fileItem} onDelete={action("delete")} isDisabled={true} feedback='error' />
        <FileItem
          file={fileItem}
          onDelete={action("delete")}
          isDisabled={true}
          feedback='unknown'
        />
      </div>
    );
  },
};
