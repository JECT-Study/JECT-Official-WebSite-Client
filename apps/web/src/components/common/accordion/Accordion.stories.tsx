import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    items: {
      description: "아코디언 항목 데이터의 배열입니다.",
    },
    defaultOpenId: {
      control: "text",
      description: "기본적으로 열려있는 아코디언의 아이디입니다. 아이디는 string 타입입니다.",
    },
    onChange: {
      description: "아코디언 상태 변경 시 호출되는 콜백 함수입니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const sampleAccordionItems = [
  {
    id: "accordion-1",
    title: "아코디언 헤더 타이틀1",
    label: "아코디언 레이블",
    content: "아코디언 바디 내용",
    caption: "아코디언 캡션 내용",
  },
  {
    id: "accordion-2",
    title: "아코디언 헤더 타이틀2",
    label: "아코디언 레이블",
    content: "아코디언 바디 내용",
    caption: "아코디언 캡션 내용",
  },
];

export const Default: Story = {
  name: "Default Accordion",
  args: {
    items: sampleAccordionItems,
    defaultOpenId: null,
  },
};

export const WithDefaultOpenStory: Story = {
  name: "Opened Accordion",
  args: {
    items: sampleAccordionItems,
    defaultOpenId: "accordion-1",
  },
};

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => {
    return <Accordion items={sampleAccordionItems} defaultOpenId={null} />;
  },
};
