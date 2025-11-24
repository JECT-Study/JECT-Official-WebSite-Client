import type { Meta, StoryObj } from "@storybook/react-vite";

import BlockButton from "./BlockButton";

import Icon from "@/components/common/icon/Icon";

const meta: Meta<typeof BlockButton> = {
  title: "Components/BlockButton",
  component: BlockButton,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "버튼의 크기를 담당하는 요소입니다.",
    },
    style: {
      control: { type: "select" },
      options: ["solid", "outlined"],
      description: "BlockButton에서 분기가 되는 테두리가 있는 버튼, 꽉 찬 버튼입니다.",
    },
    hierarchy: {
      control: { type: "select" },
      options: ["accent", "primary", "secondary", "tertiary"],
      description: "버튼의 색상이 분기되는 위계 요소입니다.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 여부입니다.",
    },
  },
  args: {
    size: "lg",
    style: "solid",
    hierarchy: "accent",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof BlockButton>;

export const DefaultStory: Story = {
  name: "Default BlockButton",
  render: args => (
    <div className="story-container">
      <div className="story-inner-container">
        <div className="story-inner-row-container">
          <BlockButton {...args}>레이블</BlockButton>
        </div>
      </div>
    </div>
  ),
};

export const ButtonStory: Story = {
  name: "BlockButton",
  render: () => (
    <div className="story-container">
      <div className="story-inner-container">
        <div className="story-inner-row-container">
          <BlockButton size="lg" style="solid" hierarchy="accent">
            레이블
          </BlockButton>
          <BlockButton size="lg" style="solid" hierarchy="primary">
            레이블
          </BlockButton>
          <BlockButton size="lg" style="solid" hierarchy="secondary">
            레이블
          </BlockButton>
          <BlockButton size="lg" style="solid" hierarchy="tertiary">
            레이블
          </BlockButton>
          <BlockButton size="lg" style="solid" hierarchy="accent" disabled={true}>
            레이블
          </BlockButton>
        </div>
      </div>
    </div>
  ),
};

export const IconButtonStory: Story = {
  name: "Icon BlockButton",
  render: () => (
    <div className="story-container">
      <div className="story-inner-container">
        <div className="story-inner-row-container">
          <BlockButton
            size="lg"
            style="solid"
            hierarchy="accent"
            leftIcon={
              <Icon name="check" size="md" fillColor="fill-object-static-inverse-hero-dark" />
            }
            rightIcon={
              <Icon name="check" size="md" fillColor="fill-object-static-inverse-hero-dark" />
            }
          >
            레이블
          </BlockButton>
          <BlockButton
            size="lg"
            style="solid"
            hierarchy="primary"
            leftIcon={<Icon name="check" size="md" fillColor="fill-object-inverse-hero-dark" />}
            rightIcon={<Icon name="check" size="md" fillColor="fill-object-inverse-hero-dark" />}
          >
            레이블
          </BlockButton>
          <BlockButton
            size="lg"
            style="solid"
            hierarchy="secondary"
            leftIcon={
              <Icon name="check" size="md" fillColor="fill-object-static-inverse-hero-dark" />
            }
            rightIcon={
              <Icon name="check" size="md" fillColor="fill-object-static-inverse-hero-dark" />
            }
          >
            레이블
          </BlockButton>
          <BlockButton
            size="lg"
            style="solid"
            hierarchy="tertiary"
            leftIcon={<Icon name="check" size="md" fillColor="fill-object-neutral-dark" />}
            rightIcon={<Icon name="check" size="md" fillColor="fill-object-neutral-dark" />}
          >
            레이블
          </BlockButton>
          <BlockButton
            size="lg"
            style="solid"
            hierarchy="accent"
            leftIcon={<Icon name="check" size="md" fillColor="fill-accent-trans-hero-dark" />}
            rightIcon={<Icon name="check" size="md" fillColor="fill-accent-trans-hero-dark" />}
            disabled={true}
          >
            레이블
          </BlockButton>
        </div>
      </div>
    </div>
  ),
};
