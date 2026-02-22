import type { Meta, StoryObj } from "@storybook/react";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio.Item> = {
  title: "Components/Radio",
  component: Radio.Item,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    radioSize: {
      control: { type: "radio" },
      options: ["lg", "md", "sm", "xs"],
    },
  },
} satisfies Meta<typeof Radio.Item>;

export default meta;

type Story = StoryObj<typeof Radio.Item>;

export const RadioBasicChecked: Story = {
  render: () => (
    <FlexRow>
      <Radio.Basic name='basicItem' value='1' />
      <Radio.Basic name='basicItem' value='2' checked />
    </FlexRow>
  ),
};

export const RadioBasicDisabled: Story = {
  render: () => (
    <FlexColumn>
      <span>RadioBasic을 비활성화합니다.</span>
      <FlexRow>
        <Radio.Basic name='disabledItem' value='1' disabled />
        <Radio.Basic name='disabledItem' value='2' checked disabled />
      </FlexRow>
      <span>Radio.Root를 통해 그룹 전체를 비활성화합니다.</span>
      <FlexRow>
        <Radio.Root disabled name='rootControl'>
          <Radio.Item>
            <Radio.Basic value='1' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='2' checked />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
      <span>Radio.Item을 통해 아이템을 개별적으로 비활성화합니다.</span>
      <FlexRow>
        <Radio.Root name='itemControl'>
          <Radio.Item disabled>
            <Radio.Basic value='1' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item disabled>
            <Radio.Basic value='2' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='3' />
            <Radio.Label>비활성화X</Radio.Label>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioBasicSizes: Story = {
  render: () => {
    return (
      <FlexRow>
        <Radio.Basic name='size' value='1' radioSize='lg' />
        <Radio.Basic name='size' value='2' radioSize='md' />
        <Radio.Basic name='size' value='3' radioSize='sm' />
        <Radio.Basic name='size' value='4' radioSize='xs' />
      </FlexRow>
    );
  },
};

export const RadioStyle: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioStyle='empty' radioSize='lg' radioAlign='left' name='emptyStyle'>
          <Radio.Item>
            <Radio.Basic value='1' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='2' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='3' />
            <Radio.Label>레이블</Radio.Label>
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='4' />
            <Radio.Label>레이블</Radio.Label>
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioStyle='outline' radioSize='lg' radioAlign='left' name='outlineStyle'>
          <Radio.Item>
            <Radio.Basic value='1' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='2' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='3' />
            <Radio.Label>레이블</Radio.Label>
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='4' />
            <Radio.Label>레이블</Radio.Label>
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioAlign: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioStyle='empty' radioSize='lg' radioAlign='right' name='emptyStyle'>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='1' />
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='2' />
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='3' />
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='4' />
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioStyle='outline' radioSize='lg' radioAlign='right' name='outlineStyle'>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='1' />
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='2' />
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='3' />
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
          <Radio.Item>
            <Radio.Label>레이블</Radio.Label>
            <Radio.Basic value='4' />
            <Radio.SubLabel>서브레이블</Radio.SubLabel>
          </Radio.Item>
        </Radio.Root>
      </FlexRow>
    </FlexColumn>
  ),
};
