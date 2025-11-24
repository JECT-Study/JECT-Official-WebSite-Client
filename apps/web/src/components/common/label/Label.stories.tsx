import type { Meta, StoryObj } from "@storybook/react";

import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Label에 들어갈 텍스트입니다.",
    },
    hierarchy: {
      control: "radio",
      options: ["stronger", "strong", "normal", "weak"],
    },
    weight: {
      control: "radio",
      options: ["normal", "bold"],
    },
    textColor: {
      control: "color",
    },
    isRequired: {
      description:
        "사용자에게 필수라는 의미를 전달하기 위해 붙이는 표시로 이 파라미터는 생략가능합니다. 생략했을 경우 false로 동작합니다.",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "레이블",
    hierarchy: "stronger",
    weight: "normal",
    textColor: "text-object-neutral-dark",
    isRequired: true,
  },
};

export const Labels: Story = {
  render: () => {
    return (
      <div className="gap-lg flex">
        <div>
          <Label
            hierarchy="stronger"
            weight="normal"
            textColor="text-object-neutral-dark"
            isRequired={true}
          >
            레이블
          </Label>
          <Label
            hierarchy="strong"
            weight="normal"
            textColor="text-object-neutral-dark"
            isRequired={false}
          >
            레이블
          </Label>
          <Label
            hierarchy="normal"
            weight="normal"
            textColor="text-object-neutral-dark"
            isRequired={true}
          >
            레이블
          </Label>
          <Label
            hierarchy="weak"
            weight="normal"
            textColor="text-object-neutral-dark"
            isRequired={false}
          >
            레이블
          </Label>
        </div>
      </div>
    );
  },
};
