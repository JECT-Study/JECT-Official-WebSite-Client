import type { Meta, StoryObj } from "@storybook/react-vite";

import InputArea from "./InputArea";

const meta: Meta<typeof InputArea> = {
  title: "Components/InputArea",
  component: InputArea,
  argTypes: {
    labelText: {
      control: { type: "text" },
      description: "InputArea의 레이블입니다.",
    },
    errorHelper: {
      control: { type: "text" },
      description: "에러 헬퍼메시지로, truthy 값이 올 경우 표시됩니다.",
    },
    placeholder: {
      control: { type: "text" },
      description: "textarea의 placeholder를 지정합니다.",
    },
    maxLength: {
      control: { type: "number" },
      description:
        "최대 글자수를 지정합니다. <br/> 실제로 maxLength까지 작성을 제한하진 않으며 왼쪽 하단의 최대글자수를 표기하기 위함입니다 ",
    },
    disabled: {
      control: { type: "boolean" },
      description: "true일 경우, InputArea가 disabled됩니다.",
    },
    required: {
      control: { type: "boolean" },
      description: "true일 경우 레이블에 별(*)이 표기되며 필수로 작성해야함을 알립니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputArea>;

export const Default: Story = {
  args: {
    labelText: "레이블",
    errorHelper: "",
    placeholder: "플레이스홀더",
    maxLength: 500,
    disabled: false,
    required: false,
  },
};

export const InputAreaStory: Story = {
  name: "InputAreaStory",
  render: () => {
    return (
      <InputArea
        labelText="답변"
        required
        placeholder="어떤 공부를 하셨고, 어떤 일을 하시나요? 자유롭게 작성해 주세요."
        maxLength={20}
      />
    );
  },
};
