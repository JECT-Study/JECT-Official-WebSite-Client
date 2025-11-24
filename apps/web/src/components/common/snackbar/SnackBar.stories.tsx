import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import SnackBar from "./SnackBar";

const meta: Meta<typeof SnackBar> = {
  title: "Components/SnackBar",
  component: SnackBar,
  argTypes: {
    message: {
      control: "text",
      description: "SnackBar에 표시할 메시지입니다.",
    },
    buttonLabel: {
      control: "text",
      description: "버튼에 표시될 텍스트입니다.",
    },
    onAction: {
      action: "clicked",
      description: "버튼 클릭 시 실행되는 함수입니다.",
    },
  },
  args: {
    message: "스낵바 타이틀",
    buttonLabel: "젝트 3기 지원하기",
    onAction: action("clicked"),
  },
};

export default meta;

type Story = StoryObj<typeof SnackBar>;

export const DefaultSnackBar: Story = {
  name: "Default SnackBar",
  render: args => <SnackBar {...args} />,
};

export const SnackBarStory: Story = {
  name: "SnackBar",
  render: () => (
    <div className="w-[31.25rem]">
      <SnackBar
        message="지금은 젝트 3기 모집 기간이에요!"
        buttonLabel="젝트 3기 지원하기"
        onAction={action("clicked")}
      />
    </div>
  ),
};
