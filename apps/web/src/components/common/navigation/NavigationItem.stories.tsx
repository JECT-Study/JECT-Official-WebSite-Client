import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import NavigationItem from "./NavigationItem";

const meta: Meta<typeof NavigationItem> = {
  title: "Components/NavigationItem",
  component: NavigationItem,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    children: {
      description: "네비게이션 아이템의 레이블로 올 텍스트입니다.",
    },
    pathName: {
      control: "text",
      options: ["/project", "/activity", "/apply", "/faq"],
      description: '네비게이션 아이템이 가질 url path 입니다. "/"로 시작해야합니다.',
    },
    disabled: {
      control: "boolean",
      description:
        "네비게이션 아이템의 disable 상태를 설정할 수 있습니다. 선택 사항이며 기본값은 false입니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  args: {
    children: "아이템 레이블",
    pathName: "/project",
    disabled: false,
  },
};

export const NavigationItemStory: Story = {
  name: "NavigationItemStory",
  render: () => {
    return (
      <div className="story-inner-row-container">
        <NavigationItem pathName="/project">아이템 레이블1</NavigationItem>
        <NavigationItem pathName="/activity">아이템 레이블2</NavigationItem>
        <NavigationItem pathName="/apply">아이템 레이블3</NavigationItem>
      </div>
    );
  },
};

export const NavigationItemDisabledStory: Story = {
  name: "NavigationItem Disabled Story",
  render: () => {
    return (
      <div className="story-inner-row-container">
        <NavigationItem pathName="/project" disabled>
          아이템 레이블1
        </NavigationItem>
        <NavigationItem pathName="/activity" disabled={true}>
          아이템 레이블2
        </NavigationItem>
      </div>
    );
  },
};
