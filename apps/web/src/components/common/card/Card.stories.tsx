import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import { Card } from "./Card.tsx";

import cardSampleImage from "@/assets/CardSample.png";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: {
      control: "text",
      description: "카드의 제목입니다.",
    },
    label: {
      control: "text",
      description: "카드에 표시될 레이블입니다.",
    },
    imgUrl: {
      control: "text",
      description: "카드에 표시될 이미지의 URL입니다.",
    },
    children: {
      control: "text",
      description: "카드의 내용을 나타냅니다.",
    },
    isDescriptionVisible: {
      control: "boolean",
      description: "설명 부분(children) 표시 여부입니다. (기본값: true)",
    },
  },
  args: {
    title: "카드 타이틀",
    label: "카드 레이블",
    imgUrl: cardSampleImage,
    children: "카드 내용",
    isDescriptionVisible: true,
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const DefaultCardStory: Story = {
  name: "Default Card",
  render: args => (
    <MemoryRouter>
      <div className='story-container'>
        <div className='h-[21.25rem] w-[18.6875rem]'>
          <Card {...args} to='#' />
        </div>
        <div className='h-[21.25rem] w-[18.6875rem]'>
          <Card {...args} disabled={true} to='#' />
        </div>
      </div>
    </MemoryRouter>
  ),
};

export const WithoutDescriptionCardStory: Story = {
  name: "WithoutDescription Card",
  render: () => (
    <MemoryRouter>
      <div className='story-container'>
        <div className='h-[21.25rem] w-[18.6875rem]'>
          <Card
            title='카드 타이틀'
            label='카드 레이블'
            imgUrl={cardSampleImage}
            isDescriptionVisible={false}
            to='#'
          >
            카드 내용
          </Card>
        </div>
        <div className='h-[21.25rem] w-[18.6875rem]'>
          <Card
            title='카드 타이틀'
            label='카드 레이블'
            imgUrl={cardSampleImage}
            isDescriptionVisible={false}
            disabled={true}
            to='#'
          >
            카드 내용
          </Card>
        </div>
      </div>
    </MemoryRouter>
  ),
};
