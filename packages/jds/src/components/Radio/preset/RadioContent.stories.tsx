import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import type { FormEvent } from "react";
import { useState } from "react";

import { Radio } from "../Radio";
import { RadioContent } from "./RadioContent";

const meta: Meta<typeof RadioContent.Left> = {
  title: "Components/RadioContent",
  component: RadioContent.Left,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    radioSize: {
      control: { type: "radio" },
      options: ["lg", "md", "sm", "xs"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioContent.Left>;

export const RadioContentLeftStyles: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <RadioContent.Left radioSize='lg' radioStyle='empty'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='md' radioStyle='empty'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='sm' radioStyle='empty'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='xs' radioStyle='empty'>
          레이블
        </RadioContent.Left>
      </FlexRow>
      <FlexRow>
        <RadioContent.Left radioSize='lg' radioStyle='outline'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='md' radioStyle='outline'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='sm' radioStyle='outline'>
          레이블
        </RadioContent.Left>
        <RadioContent.Left radioSize='xs' radioStyle='outline'>
          레이블
        </RadioContent.Left>
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioContentLeftSubLabel: Story = {
  render: () => (
    <FlexRow>
      <RadioContent.Left radioSize='lg' radioStyle='empty' subLabel='레이블' subLabelVisible>
        레이블
      </RadioContent.Left>
      <RadioContent.Left radioSize='lg' radioStyle='outline' subLabel='레이블' subLabelVisible>
        레이블
      </RadioContent.Left>
    </FlexRow>
  ),
};

export const RadioContentRightStyles: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <RadioContent.Right radioSize='lg' radioStyle='empty'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='md' radioStyle='empty'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='sm' radioStyle='empty'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='xs' radioStyle='empty'>
          레이블
        </RadioContent.Right>
      </FlexRow>
      <FlexRow>
        <RadioContent.Right radioSize='lg' radioStyle='outline'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='md' radioStyle='outline'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='sm' radioStyle='outline'>
          레이블
        </RadioContent.Right>
        <RadioContent.Right radioSize='xs' radioStyle='outline'>
          레이블
        </RadioContent.Right>
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioContentRightSubLabel: Story = {
  render: () => (
    <FlexRow>
      <RadioContent.Right radioSize='lg' radioStyle='empty' subLabel='레이블' subLabelVisible>
        레이블
      </RadioContent.Right>
      <RadioContent.Right radioSize='lg' radioStyle='outline' subLabel='레이블' subLabelVisible>
        레이블
      </RadioContent.Right>
    </FlexRow>
  ),
};

export const SubLabelWithHyperlink: Story = {
  render: () => (
    <RadioContent.Left
      radioSize='md'
      radioStyle='outline'
      subLabelVisible={true}
      subLabel={
        <>
          하이퍼링크&nbsp;
          <a href='https://www.naver.com/' style={{ textDecoration: "underline" }}>
            (네이버 바로가기)
          </a>
        </>
      }
    >
      레이블
    </RadioContent.Left>
  ),
};

export const ControlledRadio: Story = {
  render: () => {
    const [selected, setSelected] = useState("korea");

    const items = ["korea", "japan", "us", "uk"];

    return (
      <div style={{ display: "flex", gap: 20 }}>
        <Radio.Group value={selected} onChange={setSelected} name='country'>
          {items.map(item => (
            <RadioContent.Left key={item} radioSize='md' value={item}>
              {item}
            </RadioContent.Left>
          ))}
        </Radio.Group>
        <p>결과: {selected}</p>
      </div>
    );
  },
};

export const UncontrolledRadio: Story = {
  render: () => (
    <div>
      <form
        style={{ display: "flex", gap: 20 }}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const value = formData.get("groupName") as string;
          alert(`${value} 확인!`);
        }}
      >
        <RadioContent.Left radioSize='md' name='groupName' value='apple' defaultChecked>
          apple
        </RadioContent.Left>
        <RadioContent.Left radioSize='md' name='groupName' value='banana'>
          banana
        </RadioContent.Left>
        <RadioContent.Left radioSize='md' name='groupName' value='orange' disabled>
          orange
        </RadioContent.Left>
        <button type='submit'>제출 버튼</button>
      </form>
    </div>
  ),
};
