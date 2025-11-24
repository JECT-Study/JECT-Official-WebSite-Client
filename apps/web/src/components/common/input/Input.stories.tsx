import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";
import LabelButton from "../button/LabelButton";
import Icon from "../icon/Icon";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    isError: {
      control: "boolean",
      description: "사용자가 잘못입력했을 경우 true값을 가집니다.",
    },
    children: {
      description:
        "(선택) input의 제일 오른쪽에 위치하는 ReactNode로, LabelButton 혹은 아이콘 등이 들어올 수 있습니다",
    },
    className: {
      control: "text",
      description: "(선택) input 요소의 className을 수정해야할 때 사용합니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    isError: false,
    children: "",
  },
};

export const InputButtonStory: Story = {
  name: "Input with Button",
  render: () => {
    return (
      <Input isError={false}>
        <LabelButton size="lg" hierarchy="accent">
          인증하기
        </LabelButton>
      </Input>
    );
  },
};

export const InputIconStory: Story = {
  name: "Input with Icon",
  render: () => {
    return (
      <Input isError={false}>
        <Icon name="dropDown" size="md" fillColor="fill-object-static-inverse-hero-dark" />
      </Input>
    );
  },
};
