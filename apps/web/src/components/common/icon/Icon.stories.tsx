import type { Meta, StoryObj } from "@storybook/react-vite";

import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
        "check",
        "clear",
        "dropDown",
        "error",
        "expand",
        "file",
        "forward",
        "github",
        "less",
        "northEast",
        "question",
        "upload",
        "youtube",
        "download",
        "edit",
        "invisible",
        "minus",
        "rightChevron",
        "visible",
      ],
      description: "아이콘의 종류를 선택합니다. IconNames 타입에 정의되어있는 아이콘 이름입니다.",
    },
    size: {
      control: { type: "select" },
      options: ["4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs", "2xs"],
      description: "Icon 사이즈입니다.",
    },
    fillColor: {
      control: { type: "text" },
      options: [
        "fill-object-static-inverse-hero-dark",
        "fill-object-assistive-dark",
        "fill-accent-trans-hero-dark",
      ],
      description: 'Icon 색상입니다. tailwind의 "fill-*" 유틸리티를 사용하여 작성합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "dropDown",
    size: "4xl",
    fillColor: "fill-object-static-inverse-hero-dark",
  },
};

export const All: Story = {
  name: "Icon",
  render: () => {
    return (
      <div className="flex flex-wrap items-center gap-1">
        <Icon name="dropDown" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="northEast" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="forward" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="less" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="expand" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="file" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="upload" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="clear" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="error" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="question" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="check" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="youtube" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="github" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="download" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="edit" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="invisible" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="minus" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="rightChevron" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="visible" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
      </div>
    );
  },
};

export const AllSize: Story = {
  name: "IconSize",
  render: () => {
    return (
      <div className="flex items-center gap-1">
        <Icon name="dropDown" size="4xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="3xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="2xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="xl" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="lg" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="md" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="sm" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="xs" fillColor="fill-object-static-inverse-hero-dark" />
        <Icon name="dropDown" size="2xs" fillColor="fill-object-static-inverse-hero-dark" />
      </div>
    );
  },
};
