import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Navigation from "./Navigation";
import NavigationItem from "./NavigationItem";

const meta: Meta<typeof Navigation> = {
  title: "Components/Navigation",
  component: Navigation,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    children: {
      description: "NavigationItem 컴포넌트들을 children으로 배치합니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

export const NavigationStory: Story = {
  name: "NavigationStory",
  render: () => {
    return (
      <>
        <Navigation>
          <NavigationItem pathName="/project">아이템 레이블</NavigationItem>
          <NavigationItem pathName="/activity">아이템 레이블</NavigationItem>
          <NavigationItem pathName="/apply">아이템 레이블</NavigationItem>
          <NavigationItem pathName="/faq" disabled>
            비활성화된 아이템 레이블
          </NavigationItem>
        </Navigation>
      </>
    );
  },
};
