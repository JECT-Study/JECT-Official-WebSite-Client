import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    items: {
      control: "object",
      description:
        "선택 옵션 객체 배열입니다. 각 객체는 label과 선택적으로 disabled 속성을 가집니다.",
    },
    onChange: {
      action: "changed",
      description: "아이템 선택 시 호출되는 콜백입니다.",
    },
  },
  args: {
    items: [
      { label: "프론트엔드 개발자" },
      { label: "백엔드 개발자" },
      { label: "프로덕트 매니저" },
      { label: "프로덕트 디자이너" },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const DefaultStory: Story = {
  name: "Default Select",
};

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <div className="w-[26.25rem]">
      <Select
        items={[
          { label: "프론트엔드 개발자" },
          { label: "백엔드 개발자" },
          { label: "프로덕트 매니저", disabled: true },
          { label: "프로덕트 디자이너" },
        ]}
      />
    </div>
  ),
};

export const SelectWithDefaultValueStory: Story = {
  name: "Select with Default Value",
  render: () => (
    <div className="w-[26.25rem]">
      <Select
        items={[
          { label: "프론트엔드 개발자" },
          { label: "백엔드 개발자" },
          { label: "프로덕트 매니저" },
          { label: "프로덕트 디자이너" },
        ]}
        defaultValue="백엔드 개발자"
      />
    </div>
  ),
};
