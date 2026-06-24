import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio.Item> = {
  title: "Components/Radio",
  component: Radio.Item,
  parameters: {
    layout: "centered",
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
        <Radio.Root disabled defaultValue='2' name='rootControl'>
          <Radio.Item>
            <Radio.Basic value='1' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
          <Radio.Item>
            <Radio.Basic value='2' />
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
        <Radio.Basic name='size' value='1' size='lg' />
        <Radio.Basic name='size' value='2' size='md' />
        <Radio.Basic name='size' value='3' size='sm' />
        <Radio.Basic name='size' value='4' size='xs' />
      </FlexRow>
    );
  },
};

export const RadioVariant: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root variant='hollow' size='lg' name='hollowVariant'>
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
        <Radio.Root variant='outlined' size='lg' name='outlinedVariant'>
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
