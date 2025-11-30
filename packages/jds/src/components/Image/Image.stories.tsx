import type { Meta, StoryObj } from "@storybook/react-vite";

import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  argTypes: {
    ratio: {
      control: "select",
      options: ["1:1", "4:5", "3:4", "2:3", "9:16", "1:2", "9:21"],
      description: "이미지 비율을 설정합니다.",
    },
    orientation: {
      control: "radio",
      options: ["portrait", "landscape"],
      description: "이미지 방향을 설정합니다.",
    },
    isReadonly: {
      control: "boolean",
      description: "읽기 전용 모드 여부를 설정합니다.",
    },
    badgeVisible: {
      control: "boolean",
      description: "뱃지 표시 여부를 설정합니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    ratio: "1:1",
    orientation: "portrait",
    isReadonly: false,
    badgeVisible: false,
  },
  render: args => <Image {...args} />,
};

export const Readonly: Story = {
  render: () => <Image alt="읽기 전용 이미지" isReadonly={true} />,
};

export const Clickable: Story = {
  args: {
    isReadonly: false,
  },
  render: args => {
    const clickHandler = () => {
      alert("클릭");
    };
    return <Image alt="이미지" isReadonly={args.isReadonly} onClick={clickHandler} />;
  },
};

export const FixedWidth: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Image ratio="2:3" orientation="landscape" alt="이미지" />
    </div>
  ),
};

export const FixedHeight: Story = {
  render: () => (
    <div style={{ height: "200px" }}>
      <Image ratio="2:3" orientation="landscape" alt="이미지" />
    </div>
  ),
};

export const HaveBorderRadius: Story = {
  render: () => (
    <div style={{ height: "200px", borderRadius: "30px 30px 0 0" }}>
      <Image ratio="2:3" orientation="landscape" alt="이미지" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div>
      <Image alt="이미지" badgeVisible={true} badgeLabel="1" />
    </div>
  ),
};
